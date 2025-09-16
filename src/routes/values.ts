import { Router } from 'express';
import { db } from '../app';
import { getProfileId } from '../middleware/profile-middleware';

const router = Router();

router.get('/TotalExpenses', async (req, res) => {
  try{
    const profileId = getProfileId(req);
    const data = await db.raw(`EXEC get_TotalExpenses_ByCategory @ProfileID = ?`, [profileId]);
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/Allocations', async (req, res) => {
    try{
      const profileId = getProfileId(req);
      console.log('🔍 /values/Allocations: Getting allocations for ProfileID:', profileId);
      const data = await db.raw(`EXEC get_Allocations @ProfileID = ?`, [profileId]);
      console.log('📊 get_Allocations stored procedure result:', data);
      console.log('📊 Returning data[0]:', data[0]);
      res.status(200).json(data[0]);
    }catch(err: any){
      console.error('❌ /values/Allocations error:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/TotalUnsecuredBalance', async (req, res) => {
    try{
      const profileId = getProfileId(req);
      const data = await db.raw(`EXEC get_TotalUnsecuredBalance @ProfileID = ?`, [profileId]);
      res.status(200).json(data[0].TotalUnsecuredBalance);
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/SurplusOrDeficit', async (req, res) => {
  try{
    const profileId = getProfileId(req);
    const data = await db.raw(`EXEC get_Surplus_or_Deficit @ProfileID = ?`, [profileId]);
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/TotalHouseholdNetIncome', async (req, res) => {
  try{
    const profileId = getProfileId(req);
    const data = await db.raw(`EXEC get_TotalHouseholdNetIncome @ProfileID = ?`, [profileId]);
    res.status(200).json(data[0].TotalHouseholdNetIncome);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/TrueSavingsAllocation', async (req, res) => {
  try{
    const profileId = getProfileId(req);
    const data = await db.raw(`EXEC get_TrueSavingsAllocation @ProfileID = ?`, [profileId]);
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

export default router;