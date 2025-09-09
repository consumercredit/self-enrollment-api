import { Router } from 'express';
import { db } from '../app';

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
      Email: email
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

export default router;
