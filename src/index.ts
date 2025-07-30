import { TYPES } from 'tedious';
import dotenv from 'dotenv';
import knex from 'knex';
import express from 'express';
import cors from 'cors';

dotenv.config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
const db_server = process.env.DB_SERVER;
const db_name = process.env.DB_NAME;

const db = knex({
  client: 'mssql',
  connection: {
    user: db_user,
    password: db_pass,
    server: db_server,
    database: db_name,
    options: {
      encrypt: true,
      trustServerCertificate: true,
      mapBinding: (value) => {
        // Bind all strings to varchar instead of nvarchar
        if (typeof value === 'string') {
          return {
            type: TYPES.VarChar,
            value,
          };
        }
        // Allow devs to pass tedious type at query time
        if (value != null && value.type) {
          return {
            type: value.type,
            value: value.value,
          };
        }
        // Undefined is returned; falling back to default mapping function
      },
    },
  },
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Optional: only if you're sending cookies or auth headers
}));

app.get('/refHowDidYouHearAboutUs', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refHowDidYouHearAboutUs');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refTypeOfDebt', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refTypeOfDebt');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refAmountOwed', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refAmountOwed');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refPaymentStatus', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refPaymentStatus');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refPrimaryHardship', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refPrimaryHardship');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refGender', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refGender');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refMarital', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refMarital');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refEmployment', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refEmployment');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refMilitary', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refMilitary');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-01-01', async (req, res) => {
  const { HowDidYouHearAboutUsID, TypeOfDebtID, AmountOwedID, PaymentStatusID, PrimaryHardshipID, QualityOfLifeImpact } = req.body;
  try {
    await db.raw(
      `EXEC update_Concerns 
        @ProfileID = ?,
        @TypeOfDebtID = ?, 
        @AmountOwedID = ?, 
        @PaymentStatusID = ?, 
        @PrimaryHardshipID = ?,
        @QualityOfLifeImpact = ?`,
      [1, TypeOfDebtID, AmountOwedID, PaymentStatusID, PrimaryHardshipID, QualityOfLifeImpact]
    );
    await db.raw('EXEC update_Profile @ProfileID = ?, @HowDidYouHearAboutUsID = ?', [1, HowDidYouHearAboutUsID]);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-01-01', async (req, res) => {
  try {
    const concerns = await db.raw('EXEC get_Concerns @ProfileID = ?', [1]);
    const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);

    res.json({ concerns: concerns[0], profile: profile[0] });
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-01-02', async (req, res) => {
  const { financialIssues } = req.body;
  try {
    await db.raw(
      `EXEC update_Issues 
        @ProfileID = ?,
        @JobLoss = ?,
        @IncomeReduction = ?,
        @Medical = ?,
        @MedicalDescription = ?,
        @StudentLoan = ?,
        @StudentLoanDescription = ?,
        @Accidents = ?,
        @SubstanceAbuse = ?,
        @Incarceration = ?,
        @LossOfLovedOnes = ?,
        @UnexpectedExpenses = ?,
        @Divorce = ?,
        @Separation = ?,
        @Pregnancy = ?,
        @CollectionProblems = ?,
        @TaxIssues = ?,
        @Lawsuits = ?,
        @HousingIssues = ?,
        @FinancialMismanagement = ?,
        @FinancialMismanagementDescription = ?,
        @MilitaryService = ?,
        @MilitaryServiceDescription = ?`,
      [
        1,
        financialIssues.jobLoss,
        financialIssues.incomeReduction,
        financialIssues.medical,
        financialIssues.medicalDescription,
        financialIssues.studentLoan,
        financialIssues.studentLoanDescription,
        financialIssues.accidents,
        financialIssues.substanceAbuse,
        financialIssues.incarceration,
        financialIssues.lossOfLovedOnes,
        financialIssues.unexpectedExpenses,
        financialIssues.divorce,
        financialIssues.separation,
        financialIssues.pregnancy,
        financialIssues.collectionProblems,
        financialIssues.taxIssues,
        financialIssues.lawsuits,
        financialIssues.housingIssues,
        financialIssues.financialMismanagement,
        financialIssues.financialMismanagementDescription,
        financialIssues.militaryService,
        financialIssues.militaryServiceDescription
      ]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-01-02', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_Issues @ProfileID = ?', [1]);

    res.json(result[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-01-03', async (req, res) => {
  const { waysToOvercome } = req.body;
  try {
    await db.raw(
      `EXEC update_WaysToOvercome
        @ProfileID = ?,
        @CallingACCC = ?,
        @ContactedCreditors = ?,
        @ContactedAttorney = ?,
        @WorkingNightsWeekends = ?,
        @FoundBetterJob = ?,
        @SpendingLess = ?,
        @SecondJob = ?,
        @SellProperty = ?,
        @SoldOtherAssets = ?,
        @Other = ?,
        @OtherDescription = ?`,
      [
        1,
        waysToOvercome.callingACCC,
        waysToOvercome.contactedCreditors,
        waysToOvercome.contactedAttorney,
        waysToOvercome.workingNightsWeekends,
        waysToOvercome.foundBetterJob,
        waysToOvercome.spendingLess,
        waysToOvercome.secondJob,
        waysToOvercome.sellProperty,
        waysToOvercome.soldOtherAssets,
        waysToOvercome.other,
        waysToOvercome.otherDescription
      ]
    );    
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-01-03', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_WaysToOvercome @ProfileID = ?', [1]);
    res.json(result[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-02-01', async (req, res) => {
  const { peopleCount, financialPartner } = req.body;
  try {
    await db.raw(
      'EXEC update_Profile @ProfileID = ?, @NumberOfPeopleResponsibleFor = ?, @HasPartner = ?',
      [1, peopleCount, financialPartner]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-02-01', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
    res.json(result[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-03-01', async (req, res) => {
  const { demoInfo } = req.body;
  try {
    await db.raw(
      `EXEC update_Demographics 
        @ProfileID = ?, 
        @GenderID = ?, 
        @MaritalID = ?, 
        @HeadOfHousehold = ?, 
        @Adults = ?, 
        @Children = ?,
        @TotalPeopleInHousehold = ?`,
      [1, demoInfo.genderID, demoInfo.maritalID, demoInfo.headOfHousehold, demoInfo.adults, demoInfo.children, demoInfo.adults + demoInfo.children + 1]
    );
    
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-03-01', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_Demographics @ProfileID = ?', [1]);
    res.json(result[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Self Enrollment API listening on port ${port}`);
});