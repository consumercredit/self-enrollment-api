import { Router } from 'express';
import { db } from '../app';
import { getProfileId } from '../middleware/profile-middleware';

const router = Router();

router.get('/SecuredDebt', async (req, res) => {
    try {
        const profileId = getProfileId(req);
        const data = await db('SecuredDebt')
            .select('*')
            .where({ ProfileID: profileId });
        res.status(200).json(data);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.patch('/SecuredDebt', async (req, res) => {
    const { updatedItem } = req.body;
    try {
        await db.raw(
            `
            EXEC update_SecuredDebt 
                @RowID = ?,
                @TypeID = ?,
                @MonthlyPayment = ?,
                @AccountHolderID = ?,
                @StatusID = ?,
                @CurrentValue = ?,
                @BalanceOwed = ?
            `,
            [
                updatedItem.RowID,
                updatedItem.TypeID,
                updatedItem.MonthlyPayment,
                updatedItem.AccountHolderID,
                updatedItem.StatusID,
                updatedItem.CurrentValue,
                updatedItem.BalanceOwed
            ]
        );
        res.status(200).json({ success: true });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.post('/SecuredDebt', async (req, res) => {
    const { 
        TypeID, 
        MonthlyPayment, 
        AccountHolderID, 
        StatusID, 
        CurrentValue, 
        BalanceOwed 
    } = req.body;

    try {
        const profileId = getProfileId(req);
        await db.raw(
            `EXEC insert_SecuredDebt 
                @ProfileID = ?, 
                @TypeID = ?, 
                @MonthlyPayment = ?, 
                @AccountHolderID = ?, 
                @StatusID = ?, 
                @CurrentValue = ?, 
                @BalanceOwed = ?`,
            [
                profileId,
                TypeID,
                MonthlyPayment,
                AccountHolderID,
                StatusID,
                CurrentValue,
                BalanceOwed
            ]
        );
        const RowID = await db('SecuredDebt').where({ ProfileID: profileId }).max('RowID as NewRowID');
        res.status(201).json(RowID[0]);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.delete('/SecuredDebt', async (req, res) => {
    const { RowID } = req.body;
    
    try{
        await db('SecuredDebt')
            .where({ RowID })
            .del();
        res.status(200).json({ success: true });
    } catch(err: any) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.get('/UnsecuredDebt', async (req, res) => {
    try {
        const profileId = getProfileId(req);
        const data = await db('UnsecuredDebt')
            .select('*')
            .where({ ProfileID: profileId });
        res.status(200).json(data);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.patch('/UnsecuredDebt', async (req, res) => {
    const { updatedItem } = req.body;

    try {
        await db.raw(
            `
            EXEC update_UnsecuredDebt 
                @RowID = ?,
                @CreditorID = ?,
                @DebtTypeID = ?,
                @AccountNumber = ?,
                @Balance = ?,
                @CreditLimit = ?,
                @MonthlyPayment = ?,
                @OtherCreditor = ?,
                @InterestRate = ?
            `,
            [
                updatedItem.RowID,
                updatedItem.CreditorID,
                updatedItem.DebtTypeID,
                updatedItem.AccountNumber,
                updatedItem.Balance,
                updatedItem.CreditLimit,
                updatedItem.MonthlyPayment,
                updatedItem.OtherCreditor,
                updatedItem.InterestRate
            ]
        );

        res.status(200).json({ success: true });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.post('/UnsecuredDebt', async (req, res) => {
    const {
        CreditorID,
        DebtTypeID,
        AccountNumber,
        Balance,
        CreditLimit,
        MonthlyPayment,
        OtherCreditor = null,
        InterestRate
    } = req.body;

    try {
        const profileId = getProfileId(req);
        await db.raw(
            `EXEC insert_UnsecuredDebt 
                @ProfileID = ?, 
                @CreditorID = ?, 
                @DebtTypeID = ?,
                @AccountNumber = ?,
                @Balance = ?,
                @CreditLimit = ?,
                @MonthlyPayment = ?,
                @OtherCreditor = ?,
                @InterestRate = ?`,
            [
                profileId,
                CreditorID,
                DebtTypeID,
                AccountNumber,
                Balance,
                CreditLimit,
                MonthlyPayment,
                OtherCreditor,
                InterestRate
            ]
        );
        const RowID = await db('UnsecuredDebt').where({ ProfileID: profileId }).max('RowID as NewRowID');
        res.status(201).json(RowID[0]);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

router.delete('/UnsecuredDebt', async (req, res) => {
    const { RowID } = req.body;
    try{
        await db('UnsecuredDebt')
            .where({ RowID })
            .del();
        res.status(200).json({ success: true });
    } catch(err: any) {
        console.error(err);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

export default router;