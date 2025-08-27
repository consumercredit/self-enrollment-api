import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/Allocations', async (req, res) => {
    try{
      const data = await db.raw(`EXEC get_Allocations @ProfileID = ?`, [1]);
      res.status(201).json(data[0]);
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/TotalUnsecuredBalance', async (req, res) => {
    try{
      const data = await db.raw(`EXEC get_TotalUnsecuredBalance @ProfileID = ?`, [1]);
      res.status(201).json(data[0].TotalUnsecuredBalance);
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/SurplusOrDeficit', async (req, res) => {
  try{
    const result = await db.raw(`EXEC get_Surplus_or_Deficit @ProfileID = ?`, [1]);
    res.status(201).json(result[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

export default router;