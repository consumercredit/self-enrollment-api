import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/FurthestPage', async (req, res) => {
    try{
      const data = await db('Profile')
        .select('FurthestPage')
        .where({ ProfileID: 1 });
      res.status(200).json(data[0]);
    }catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.post('/FurthestPage', async (req, res) => {
    const { pathName } = req.body;
    try{
        await db.raw('EXEC update_Profile @ProfileID = ?, @FurthestPage = ?', [1, pathName]);
        res.status(201).json({ success: true });
    }catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

export default router;