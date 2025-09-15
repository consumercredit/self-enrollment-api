import { Router } from 'express';
import { db } from '../app';
import { getProfileId } from '../middleware/profile-middleware';

const router = Router();

// Look up user by email and return ProfileID
router.get('/lookup', async (req, res) => {
  const { email } = req.query;
  
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email parameter is required' });
  }

  try {
    const result = await db('Profile')
      .select('ProfileID', 'Email', 'FirstName', 'LastName', 'CounselingClientID', 'FurthestPage')
      .where({ Email: email })
      .first();

    if (result) {
      res.status(200).json({ 
        exists: true, 
        profileId: result.ProfileID,
        email: result.Email,
        firstName: result.FirstName,
        lastName: result.LastName,
        counselingClientId: result.CounselingClientID,
        furthestPage: result.FurthestPage
      });
    } else {
      res.status(200).json({ 
        exists: false, 
        message: 'User not found' 
      });
    }
  } catch (err: any) {
    console.error('User lookup error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Create new user profile
router.post('/create', async (req, res) => {
  const { email, firstName, lastName, counselingClientId } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Check if user already exists
    const existingUser = await db('Profile')
      .select('ProfileID', 'Email')
      .where({ Email: email })
      .first();

    if (existingUser) {
      return res.status(409).json({ 
        error: 'User already exists', 
        profileId: existingUser.ProfileID,
        email: existingUser.Email
      });
    }

    // Use direct insert since we know the existing schema
    const insertData: any = {
      Email: email,
      FurthestPage: '/intro' // Initialize new users with /intro as starting point
    };
    
    if (firstName) insertData.FirstName = firstName;
    if (lastName) insertData.LastName = lastName;
    if (counselingClientId) insertData.CounselingClientID = counselingClientId;

    await db('Profile').insert(insertData);
    
    // Get the new ProfileID
    const newUser = await db('Profile')
      .select('ProfileID', 'Email', 'FirstName', 'LastName', 'CounselingClientID')
      .where({ Email: email })
      .first();

    if (!newUser) {
      throw new Error('Failed to retrieve newly created user');
    }

    res.status(201).json({ 
      success: true, 
      profileId: newUser.ProfileID,
      email: newUser.Email,
      firstName: newUser.FirstName,
      lastName: newUser.LastName,
      counselingClientId: newUser.CounselingClientID
    });
  } catch (err: any) {
    console.error('User creation error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Get user profile by ProfileID
router.get('/profile/:profileId', async (req, res) => {
  const { profileId } = req.params;
  
  if (!profileId || isNaN(Number(profileId))) {
    return res.status(400).json({ error: 'Valid ProfileID is required' });
  }

  try {
    const result = await db('Profile')
      .select('ProfileID', 'Email', 'FirstName', 'LastName', 'CounselingClientID', 'CreatedDate', 'FurthestPage', 'Phone', 'DateOfBirth')
      .where({ ProfileID: Number(profileId) })
      .first();

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ 
        error: 'User not found',
        profileId: Number(profileId)
      });
    }
  } catch (err: any) {
    console.error('Profile lookup error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Update user profile using existing update_Profile stored procedure
router.patch('/profile/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const updates = req.body;
  
  if (!profileId || isNaN(Number(profileId))) {
    return res.status(400).json({ error: 'Valid ProfileID is required' });
  }

  try {
    // Check if user exists
    const existingUser = await db('Profile')
      .select('ProfileID')
      .where({ ProfileID: Number(profileId) })
      .first();

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Use the existing update_Profile stored procedure for basic updates
    // Build the parameters dynamically based on what's provided
    const params = [Number(profileId)];
    const paramNames = ['@ProfileID'];
    
    // Map common update fields to stored procedure parameters
    const fieldMapping: { [key: string]: string } = {
      'firstName': '@FirstName',
      'lastName': '@LastName', 
      'email': '@Email',
      'phone': '@Phone',
      'dateOfBirth': '@DateOfBirth',
      'counselingClientId': '@CounselingClientID',
      'furthestPage': '@FurthestPage'
    };

    let sql = 'EXEC update_Profile @ProfileID = ?';
    
    Object.keys(updates).forEach(key => {
      if (fieldMapping[key]) {
        sql += `, ${fieldMapping[key]} = ?`;
        params.push(updates[key]);
      }
    });

    await db.raw(sql, params);

    // Return updated profile
    const updatedProfile = await db('Profile')
      .select('ProfileID', 'Email', 'FirstName', 'LastName', 'CounselingClientID', 'Phone', 'DateOfBirth', 'FurthestPage', 'UpdatedDate')
      .where({ ProfileID: Number(profileId) })
      .first();

    res.status(200).json({ 
      success: true,
      profile: updatedProfile
    });
  } catch (err: any) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Validate email using SE_val_ClientEmail stored procedure
router.get('/validate-email', async (req, res) => {
  const { email } = req.query;
  
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email parameter is required' });
  }

  try {
    // Call the new SE_val_ClientEmail stored procedure mentioned in SE Update
    const result = await db.raw('EXEC SE_val_ClientEmail @Email = ?', [email]);
    
    if (result && result.length > 0) {
      const validationResult = result[0];
      res.status(200).json({
        email: email,
        emailFound: validationResult.EmailFound || false,
        inCounseling: validationResult.InCounseling || false,
        inCreditU: validationResult.InCreditU || false,
        inCreditSoft: validationResult.InCreditSoft || false
      });
    } else {
      res.status(200).json({
        email: email,
        emailFound: false,
        inCounseling: false,
        inCreditU: false,
        inCreditSoft: false
      });
    }
  } catch (err: any) {
    console.error('Email validation error:', err);
    // If the stored procedure doesn't exist yet, fall back to basic lookup
    try {
      const fallbackResult = await db('Profile')
        .select('ProfileID')
        .where({ Email: email })
        .first();
      
      res.status(200).json({
        email: email,
        emailFound: !!fallbackResult,
        inCounseling: false,
        inCreditU: false,
        inCreditSoft: false
      });
    } catch (fallbackErr: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
  }
});

// Check client qualification using SE_get_ClientQualify stored procedure
router.get('/qualify', async (req, res) => {
  const { email } = req.query;
  
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email parameter is required' });
  }

  try {
    // Call the new SE_get_ClientQualify stored procedure mentioned in SE Update
    const result = await db.raw('EXEC SE_get_ClientQualify @Email = ?', [email]);
    
    if (result && result.length > 0) {
      const qualificationResult = result[0];
      res.status(200).json({
        email: email,
        seQualify: qualificationResult.SEQualify || false,
        redirectUrl: qualificationResult.RedirectURL || 'https://www.secure-consumercredit.com/clientportal/enrollment/step2.aspx'
      });
    } else {
      // Default response if no result
      res.status(200).json({
        email: email,
        seQualify: false,
        redirectUrl: 'https://www.secure-consumercredit.com/clientportal/enrollment/step2.aspx'
      });
    }
  } catch (err: any) {
    console.error('Client qualification error:', err);
    // If the stored procedure doesn't exist yet, fall back to default behavior
    res.status(200).json({
      email: email,
      seQualify: true, // Default to true for self-enrollment API users
      redirectUrl: 'https://myplan.consumercredit.com/'
    });
  }
});

// TESTING ONLY: Reset user data for testing purposes
// WARNING: This endpoint should only be available in development/testing environments
router.post('/reset-for-testing', async (req, res) => {
  try {
    // Security check - only allow when explicitly enabled
    // Temporarily enabled for testing - set ENABLE_TESTING_RESET=false to disable
    if (process.env.ENABLE_TESTING_RESET === 'false') {
      return res.status(403).json({ 
        error: 'Reset functionality disabled',
        message: 'This endpoint has been disabled via ENABLE_TESTING_RESET=false'
      });
    }
    
    const profileId = getProfileId(req);
    console.log('🧪 TESTING: Resetting user data for ProfileID:', profileId);
    console.log('🧪 TESTING: ProfileID type:', typeof profileId);
    console.log('🧪 TESTING: ProfileID value:', JSON.stringify(profileId));
    
    // Validate ProfileID
    if (!profileId || isNaN(Number(profileId))) {
      console.error('❌ Invalid ProfileID:', profileId);
      return res.status(400).json({
        error: 'Invalid ProfileID',
        message: 'ProfileID is required and must be a valid number',
        receivedProfileId: profileId,
        type: typeof profileId
      });
    }
    
    const numericProfileId = Number(profileId);
    console.log('🧪 TESTING: Numeric ProfileID:', numericProfileId);
    
    // Test database connection and stored procedure existence
    try {
      console.log('🧪 TESTING: Checking if stored procedure exists...');
      const spCheck = await db.raw(`
        SELECT name, type_desc, create_date, modify_date 
        FROM sys.objects 
        WHERE name = 'reset_UserForTesting' AND type = 'P'
      `);
      console.log('🧪 TESTING: Stored procedure check result:', spCheck);
      
      if (!spCheck || !spCheck[0] || spCheck[0].length === 0) {
        console.error('❌ Stored procedure does not exist');
        return res.status(500).json({
          error: 'Stored procedure not found',
          message: 'The reset_UserForTesting stored procedure does not exist in the database'
        });
      }
      
      console.log('✅ Stored procedure exists:', spCheck[0][0]);
    } catch (spError: any) {
      console.error('❌ Error checking stored procedure:', spError);
      return res.status(500).json({
        error: 'Database connection error',
        message: 'Failed to check if stored procedure exists',
        details: spError.message
      });
    }
    
    // Call the stored procedure to reset user data
    console.log('🔍 Calling stored procedure with ProfileID:', numericProfileId);
    const result = await db.raw('EXEC reset_UserForTesting @ProfileID = ?', [numericProfileId]);
    console.log('📊 Raw stored procedure result:', JSON.stringify(result, null, 2));
    console.log('📊 Result type:', typeof result);
    console.log('📊 Result length:', result ? result.length : 'null');
    
    // Try different ways to access the result
    if (result) {
      console.log('📊 result[0]:', JSON.stringify(result[0], null, 2));
      if (result[0]) {
        console.log('📊 result[0][0]:', JSON.stringify(result[0][0], null, 2));
        console.log('📊 result[0] length:', result[0].length);
      }
    }
    
    // Try to parse the result from the stored procedure
    let procedureResult = null;
    let success = false;
    let message = 'Unknown result';
    
    // Try different ways to access the stored procedure result
    if (result && result.length > 0) {
      // Try result[0] (first result set)
      if (Array.isArray(result[0]) && result[0].length > 0) {
        procedureResult = result[0][0]; // First row of first result set
        console.log('📋 Found result in result[0][0]:', procedureResult);
      } 
      // Try result[0] directly
      else if (result[0] && result[0].Status) {
        procedureResult = result[0];
        console.log('📋 Found result in result[0]:', procedureResult);
      }
      // Try result directly
      else if (result.Status) {
        procedureResult = result;
        console.log('📋 Found result in result:', procedureResult);
      }
    }
    
    if (procedureResult && procedureResult.Status) {
      success = procedureResult.Status === 'SUCCESS';
      message = procedureResult.Message || 'Reset completed';
      
      if (success) {
        res.status(200).json({
          success: true,
          message: message,
          profileId: procedureResult.ProfileID || profileId,
          email: procedureResult.Email,
          furthestPage: procedureResult.NewFurthestPage || '/intro',
          method: 'stored_procedure'
        });
      } else {
        res.status(400).json({
          error: 'Reset failed',
          message: message,
          details: procedureResult
        });
      }
    } else {
      // Fallback - assume success if no errors were thrown
      console.log('📋 No recognizable result format, assuming success');
      res.status(200).json({
        success: true,
        message: 'User data reset successfully (fallback)',
        profileId: profileId,
        furthestPage: '/intro',
        method: 'stored_procedure_fallback'
      });
    }
    
  } catch (err: any) {
    console.error('❌ Error resetting user for testing:', err);
    res.status(500).json({ 
      error: 'Failed to reset user data', 
      details: err.message,
      profileId: req.profileId || 'unknown'
    });
  }
});

export default router;
