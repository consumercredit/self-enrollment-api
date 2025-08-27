import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/HowDidYouHearAboutUs', async (__req, res) => {
  try {
    const result = await db.raw('EXEC get_refHowDidYouHearAboutUs');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/AccountDebtType', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refAccountDebtType');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/CreditorWebDisplay', async (req, res) => {
  const { CreditorID } = req.query;
  try {
    let result;

    if (CreditorID) {
      result = await db('refCreditorWebDisplay')
        .select('DisplayName')
        .where({ CreditorID: Number(CreditorID) });

      res.json(result[0] || []);
    } else {
      result = await db.raw('EXEC get_refCreditorWebDisplay');
      res.json(result || []);
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/TypeOfDebt', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refTypeOfDebt');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/AmountOwed', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refAmountOwed');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/PaymentStatus', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refPaymentStatus');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/PrimaryHardship', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refPrimaryHardship');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/Gender', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refGender');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/Marital', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refMarital');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/Employment', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refEmployment');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/Military', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refMilitary');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/Revenue', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refRevenue');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/TypeOfBusiness', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refTypeOfBusiness');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/Education', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refEducation');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/Race', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refRace');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/HousingStatus', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refHousingStatus');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/PayPeriod', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refPayPeriod');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/HowLongUseSavingsPeriod', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refHowLongUseSavingsPeriod');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/SecuredDebtStatus', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refSecuredDebtStatus');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/SecuredDebtAccountHolder', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refSecuredDebtAccountHolder');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/SecuredDebtType', async (req, res) => {
  const { TypeID } = req.query;
  try {
    let result;

    if (TypeID) {
      result = await db('refSecuredDebtType')
        .select('Type')
        .where({ TypeID: Number(TypeID) });

      res.json(result[0] || []);
    } else {
      result = await db.raw('EXEC get_refSecuredDebtType');
      res.json(result || []);
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/LivingArrangement', async (_req, res) => {
    try {
      const result = await db.raw('EXEC get_refLivingArrangement');
      res.json(result || []);
    } catch (err: any) {
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});

export default router;