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

app.get('/refAccountDebtType', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refAccountDebtType');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refCreditorWebDisplay', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refCreditorWebDisplay');
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

app.get('/refRevenue', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refRevenue');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refTypeOfBusiness', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refTypeOfBusiness');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refEducation', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refEducation');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refRace', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refRace');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refHousingStatus', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refHousingStatus');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refPayPeriod', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refPayPeriod');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refHowLongUseSavingsPeriod', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refHowLongUseSavingsPeriod');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refSecuredDebtStatus', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refSecuredDebtStatus');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refSecuredDebtAccountHolder', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refSecuredDebtAccountHolder');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refSecuredDebtType', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refSecuredDebtType');
    res.json(result || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/refSecuredDebtType/TypeName', async (req, res) => {
  const { TypeID } = req.body;
  try {
    const result = await db.raw('EXEC get_refSecuredDebtType_TypeName_By_ID @TypeID = ?', [TypeID]);
    res.json(result[0] || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/refCreditorWebDisplay/DisplayName', async (req, res) => {
  const { CreditorID } = req.body;
  try {
    const result = await db.raw('EXEC get_refCreditorWebDisplay_DisplayName_By_CreditorID @CreditorID = ?', [CreditorID]);
    res.json(result[0] || []);
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/refLivingArrangement', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_refLivingArrangement');
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
      [1, demoInfo.genderID, demoInfo.maritalID, demoInfo.headOfHousehold, demoInfo.adults, demoInfo.children, demoInfo.adults + demoInfo.children]
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

app.post('/concerns-03-02', async (req, res) => {
  const { demoInfo } = req.body;
  try {
    await db.raw(
      `EXEC update_Employment 
        @ProfileID = ?, 
        @EmploymentID = ?, 
        @TypeOfWork = ?, 
        @DoesSideWork = ?, 
        @MilitaryID = ?, 
        @PlanToLeaveMilitary = ?`,
      [
        1,
        demoInfo.employment,
        demoInfo.work,
        demoInfo.sideWork,
        demoInfo.military,
        demoInfo.planToLeaveMilitary
      ]
    );

    if (demoInfo.sideWork) {
      await db.raw(
        `EXEC update_SideWork 
          @ProfileID = ?, 
          @Zip = ?, 
          @Employees = ?, 
          @YearsEmployed = ?, 
          @TypeOfBusinessID = ?, 
          @RevenueID = ?,
          @TypeOfBusinessOther = ?`,
        [
          1,
          demoInfo.sideWorkDetails.zip,
          demoInfo.sideWorkDetails.employees,
          demoInfo.sideWorkDetails.yearsEmployed,
          demoInfo.sideWorkDetails.typeOfBusiness,
          demoInfo.sideWorkDetails.revenueID,
          demoInfo.sideWorkDetails.typeOfBusinessOther
        ]
      );
    }

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-03-02', async (req, res) => {
  try {
    const employment = await db.raw('EXEC get_Employment @ProfileID = ?', [1]);
    const sidework = await db.raw('EXEC get_SideWork @ProfileID = ?', [1]);
    res.json({ employment: employment[0], sidework: sidework[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-03-03', async (req, res) => {
  const { EducationID, OtherEducation, RaceID, IsHispanic, DateOfBirth } = req.body;
  try {
    await db.raw(
      `EXEC update_Demographics 
        @ProfileID = ?, 
        @EducationID = ?, 
        @OtherEducation = ?, 
        @RaceID = ?, 
        @IsHispanic = ?`,
      [1, EducationID, OtherEducation, RaceID, IsHispanic]
    );
    await db.raw('EXEC update_Profile @ProfileID = ?, @DateOfBirth = ?', [1, DateOfBirth]);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-03-03', async (req, res) => {
  try {
    const demographics = await db.raw('EXEC get_Demographics @ProfileID = ?', [1]);
    const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
    res.json({ demographics: demographics[0], profile: profile[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-03-04', async (req, res) => {
  const { HousingID, OtherHousing, IsProficientInEnglish, LivesInRuralArea, HasFiledForBankruptcy, YearsUntilRetirement } = req.body;
  try {
    await db.raw(
      `EXEC update_Demographics 
        @ProfileID = ?, 
        @HousingID = ?, 
        @OtherHousing = ?, 
        @IsProficientInEnglish = ?, 
        @LivesInRuralArea = ?,
        @HasFiledForBankruptcy = ?,
        @YearsUntilRetirement = ?`,
      [1, HousingID, OtherHousing, IsProficientInEnglish, LivesInRuralArea, HasFiledForBankruptcy, YearsUntilRetirement]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-03-04', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_Demographics @ProfileID = ?', [1]);
    res.json(result[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-03-05', async (req, res) => {
  const { ConsentToTexts, CanShareInfo, Phone } = req.body;
  try {
    await db.raw(
      `EXEC update_Demographics 
        @ProfileID = ?,
        @CanShareInfo = ?`,
      [1, CanShareInfo]
    );
    await db.raw('EXEC update_Profile @ProfileID = ?, @ConsentToTexts = ?, @Phone = ?', [1, ConsentToTexts, Phone]);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-03-05', async (req, res) => {
  try {
    const demographics = await db.raw('EXEC get_Demographics @ProfileID = ?', [1]);
    const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
    res.json({ demographics: demographics[0], profile: profile[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-04-01', async (req, res) => {
  const { budgetItems } = req.body;
  try {
    await db.raw(
      `EXEC update_Goals 
        @ProfileID = ?,
        @PurchaseHome = ?,
        @SaveForRetirement = ?,
        @ContinueEducation = ?,
        @HaveEmergencySavings = ?,
        @FinanceChildsEducation = ?,
        @PayOffCollegeLoans = ?,
        @MakeHomeImprovements = ?,
        @BuyVacationHome = ?,
        @PurchaseNewVehicle = ?,
        @SavingForFuneral = ?,
        @HaveLifeInsurance = ?,
        @PayOffMortgage = ?,
        @Other = ?`,
      [
        1,
        budgetItems.PurchaseHome,
        budgetItems.SaveForRetirement,
        budgetItems.ContinueEducation,
        budgetItems.HaveEmergencySavings,
        budgetItems.FinanceChildsEducation,
        budgetItems.PayOffCollegeLoans,
        budgetItems.MakeHomeImprovements,
        budgetItems.BuyVacationHome,
        budgetItems.PurchaseNewVehicle,
        budgetItems.SavingForFuneral,
        budgetItems.HaveLifeInsurance,
        budgetItems.PayOffMortgage,
        budgetItems.Other
      ]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-04-01', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_Goals @ProfileID = ?', [1]);
    res.json(result[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-05-01', async (req, res) => {
  const { spendingHabits } = req.body;
  try {
    await db.raw(
      `EXEC update_Habits 
        @ProfileID = ?,
        @OnlyWorryAboutToday = ?,
        @KeepUpWithJoneses = ?,
        @BuyBasedOnNeeds = ?,
        @InfluencedBySuggestions = ?,
        @ShoppingMakesMeFeelBetter = ?,
        @BuyOnImpulse = ?,
        @SpendToRetaliate = ?,
        @CreditCardsToSupplementIncome = ?,
        @Other = ?`,
      [
        1,
        spendingHabits.OnlyWorryAboutToday,
        spendingHabits.KeepUpWithJoneses,
        spendingHabits.BuyBasedOnNeeds,
        spendingHabits.InfluencedBySuggestions,
        spendingHabits.ShoppingMakesMeFeelBetter,
        spendingHabits.BuyOnImpulse,
        spendingHabits.SpendToRetaliate,
        spendingHabits.CreditCardsToSupplementIncome,
        spendingHabits.Other
      ]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-05-01', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_Habits @ProfileID = ?', [1]);
    res.json(result[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/income-01-01', async (req, res) => {
  try {
    const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
    const yourIncome = await db.raw('EXEC get_YourIncome @ProfileID = ?', [1]);
    const yourPartnersIncome = await db.raw('EXEC get_YourPartnersIncome @ProfileID = ?', [1]);
    const yourSavingsIncome = await db.raw('EXEC get_YourSavingsIncome @ProfileID = ?', [1]);
    res.json({ profile: profile[0], yourIncome: yourIncome[0], yourPartnersIncome: yourPartnersIncome[0], yourSavingsIncome: yourSavingsIncome[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/income-01-01', async (req, res) => {
  const {
    DoYouHaveIncome,
    DoYouHaveSavings,
    HasPartner,
    yourIncome,
    yourPartnersIncome,
    yourSavingsIncome
  } = req.body;

  try {
    await db.raw(
      `EXEC update_Profile
        @ProfileID = ?,
        @DoYouHaveIncome = ?,
        @DoYouHaveSavings = ?`,
      [
        1,
        DoYouHaveIncome,
        DoYouHaveSavings
      ]
    );

    if (DoYouHaveIncome) {
      await db.raw(
        `EXEC update_YourIncome 
          @ProfileID = ?, 
          @PayPeriodID = ?, 
          @GrossIncome = ?, 
          @NetIncome = ?, 
          @OtherDeductions = ?, 
          @WagesGarnished = ?,
          @PayrollDeductions = ?`,
        [
          1,
          yourIncome.PayPeriodID,
          yourIncome.GrossIncome,
          yourIncome.NetIncome,
          yourIncome.OtherDeductions,
          yourIncome.WagesGarnished,
          yourIncome.PayrollDeductions
        ]
      );
    }

    if (HasPartner) {
      await db.raw(
        `EXEC update_YourPartnersIncome 
        @ProfileID = ?,
        @PayPeriodID = ?,
        @GrossIncome = ?,
        @NetIncome = ?,
        @PayrollDeductions = ?`,
        [
          1,
          yourPartnersIncome.PayPeriodID,
          yourPartnersIncome.GrossIncome,
          yourPartnersIncome.NetIncome,
          yourPartnersIncome.PayrollDeductions
        ]
      );
    }

    if (DoYouHaveSavings) {
      await db.raw(
        `EXEC update_YourSavingsIncome 
          @ProfileID = ?,
          @HowLongUseSavings = ?,
          @HowLongUseSavingsPeriodID = ?,
          @SavingsAmount = ?,
          @GrossMonthlySavingsIncome = ?`,
        [
          1,
          yourSavingsIncome.HowLongUseSavings,
          yourSavingsIncome.HowLongUseSavingsPeriodID,
          yourSavingsIncome.SavingsAmount,
          yourSavingsIncome.GrossMonthlySavingsIncome
        ]
      );
    }

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/income-02-01/incomes', async (req, res) => {
  try {
    const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
    const yourIncome = await db.raw('EXEC get_YourIncome @ProfileID = ?', [1]);
    const yourPartnersIncome = await db.raw('EXEC get_YourPartnersIncome @ProfileID = ?', [1]);
    const yourSavingsIncome = await db.raw('EXEC get_YourSavingsIncome @ProfileID = ?', [1]);
    res.json({ profile: profile[0], yourIncome: yourIncome[0], yourPartnersIncome: yourPartnersIncome[0], yourSavingsIncome: yourSavingsIncome[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/income-02-01', async (req, res) => {
  try {
    const result = await db.raw('EXEC get_OtherIncome @ProfileID = ?', [1]);
    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/income-02-01', async (req, res) => {
  const { incomeItems } = req.body;

  if (!Array.isArray(incomeItems)) {
    return res.status(400).json({ error: 'incomeItems must be an array' });
  }

  try {
    for (const item of incomeItems) {
      await db.raw(
        `EXEC insert_OtherIncome 
          @ProfileID = ?,
          @Section = ?, 
          @PayPeriodID = ?, 
          @Amount = ?`,
        [
          1,
          item.Section,
          item.PayPeriodID,
          item.Amount
        ]
      );
    }

    res.status(201).json({
      success: true,
      insertedCount: incomeItems.length
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/expenses-01-01/insert', async (req, res) => {
  const { TypeID, MonthlyPayment, AccountHolderID, StatusID, CurrentValue, BalanceOwed } = req.body;
  try {
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
        1,
        TypeID,
        MonthlyPayment,
        AccountHolderID,
        StatusID,
        CurrentValue,
        BalanceOwed
      ]
    );
    const RowID = await db.raw('select MAX(RowID) as NewRowID from SecuredDebt where ProfileID = ?', [1]);
    res.status(201).json(RowID[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.delete('/expenses-01-01/delete', async (req, res) => {
  const { RowID } = req.body;
  try{
    await db.raw(`EXEC delete_SecuredDebt @RowID = ?`, [RowID]);
    res.status(201).json({ success: true });
  } catch(err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.put('/expenses-01-01/update', async (req, res) => {
  const { RowID, TypeID, MonthlyPayment, AccountHolderID, StatusID, CurrentValue, BalanceOwed } = req.body;
  try{
    await db.raw(
      `EXEC update_SecuredDebt 
      @RowID = ?,
      @TypeID = ?,
      @MonthlyPayment = ?,
      @AccountHolderID = ?,
      @StatusID = ?,
      @CurrentValue = ?,
      @BalanceOwed = ?`, 
      [
        RowID,
        TypeID,
        MonthlyPayment,
        AccountHolderID,
        StatusID,
        CurrentValue,
        BalanceOwed
      ]
    );
    res.status(201).json({ success: true });
  } catch(err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/expenses-01-01', async (req, res) => {
  try{
    const data = await db.raw(`EXEC get_SecuredDebt @ProfileID = ?`, [1]);
    res.status(201).json(data);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/expenses-02-01', async (req, res) => {
  const { expenses, LivingArrangementID } = req.body;
  try{
    await db.raw(`EXEC update_Demographics @ProfileID = ?, @LivingArrangementID = ?`, [1, LivingArrangementID]);
    for (const exp of expenses) {
      await db.raw(
        `EXEC insert_Expenses 
          @ProfileID = ?,
          @Section = ?, 
          @PayPeriodID = ?, 
          @Amount = ?,
          @Comment = ?`,
        [
          1,
          exp.Section,
          exp.PayPeriodID,
          exp.Amount,
          exp.Comment
        ]
      );
    }
    res.status(201).json({ success: true });
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/expenses-02-01', async (req, res) => {
  try{
    const expenses = await db.raw(`EXEC get_Expenses @ProfileID = ?`, [1]);
    const demographics = await db.raw(`EXEC get_Demographics @ProfileID = ?`, [1]);
    res.status(201).json({ expenses: expenses, demographics: demographics[0] });
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/expenses-03-01', async (req, res) => {
  try{
    const demographics = await db.raw(`SELECT TotalPeopleInHousehold from Demographics where ProfileID = ?`, [1]);
    const expenses = await db.raw(`EXEC get_Expenses @ProfileID = ?`, [1]);
    res.status(201).json({demographics: demographics[0], expenses: expenses});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/expenses-03-01', async (req, res) => {
  const { expenses } = req.body;
  try{
    for (const exp of expenses) {
      await db.raw(
        `EXEC insert_Expenses 
          @ProfileID = ?,
          @Section = ?, 
          @PayPeriodID = ?, 
          @Amount = ?,
          @Comment = ?`,
        [
          1,
          exp.Section,
          exp.PayPeriodID,
          exp.Amount,
          exp.Comment
        ]
      );
    }
    res.status(201).json({ success: true });
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/expenses-04-01', async (req, res) => {
  try{
    const demographics = await db.raw(`EXEC get_Demographics @ProfileID = ?`, [1]);
    const expenses = await db.raw(`EXEC get_Expenses @ProfileID = ?`, [1]);
    res.status(201).json({demographics: demographics[0], expenses: expenses});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/expenses-04-01', async (req, res) => {
  const { expenses, adults, children } = req.body;
  try{
    for (const exp of expenses) {
      await db.raw(
        `EXEC insert_Expenses 
          @ProfileID = ?,
          @Section = ?, 
          @PayPeriodID = ?, 
          @Amount = ?,
          @Comment = ?`,
        [
          1,
          exp.Section,
          exp.PayPeriodID,
          exp.Amount,
          exp.Comment
        ]
      );
    }
    await db.raw(`EXEC update_Demographics @ProfileID = ?, @Adults = ?, @Children = ?`, [1, adults, children]);
    res.status(201).json({ success: true });
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/expenses-05-01/insert', async (req, res) => {
  const { CreditorID, DebtTypeID, AccountNumber, Balance, CreditLimit, MonthlyPayment, OtherCreditor, InterestRate } = req.body;
  try {
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
        1,
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
    const RowID = await db.raw('select MAX(RowID) as NewRowID from UnsecuredDebt where ProfileID = ?', [1]);
    res.status(201).json(RowID[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.delete('/expenses-05-01/delete', async (req, res) => {
  const { RowID } = req.body;
  try{
    await db.raw(`EXEC delete_UnsecuredDebt @RowID = ?`, [RowID]);
    res.status(201).json({ success: true });
  } catch(err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.put('/expenses-05-01/update', async (req, res) => {
  const { RowID, CreditorID, DebtTypeID, AccountNumber, Balance, CreditLimit, MonthlyPayment, OtherCreditor, InterestRate } = req.body;
  try{
    await db.raw(
      `EXEC update_UnsecuredDebt 
      @RowID = ?,
      @CreditorID = ?,
      @DebtTypeID = ?,
      @AccountNumber = ?,
      @Balance = ?,
      @CreditLimit = ?,
      @MonthlyPayment = ?,
      @OtherCreditor = ?,
      @InterestRate = ?`, 
      [
        RowID,
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
    res.status(201).json({ success: true });
  }catch(err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/expenses-05-01', async (req, res) => {
  try{
    const data = await db.raw(`EXEC get_UnsecuredDebt @ProfileID = ?`, [1]);
    res.status(201).json(data);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/expenses-06-01', async (req, res) => {
  try{
    const expenses = await db.raw(`EXEC get_Expenses @ProfileID = ?`, [1]);
    const securedDebt = await db.raw(`EXEC get_SecuredDebt @ProfileID = ?`, [1]);
    const unsecuredDebt = await db.raw(`EXEC get_UnsecuredDebt @ProfileID = ?`, [1]);
    const income = await db.raw(`EXEC get_TotalHouseholdNetIncome @ProfileID = ?`, [1]);
    res.status(201).json({expenses, securedDebt, unsecuredDebt, totalHouseholdNetIncome: income[0].TotalHouseholdNetIncome});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.patch('/analysis-01-01', async (req, res) => {
  const { DoYouFeelConfident, Email, DateOfBirth, EmailBudgetWorksheet, MailBudgetWorksheet } = req.body; 
  try{
    await db.raw(
      `EXEC update_Profile 
        @ProfileID = ?,
        @DoYouFeelConfident = ?,
        @Email = ?,
        @DateOfBirth = ?,
        @EmailBudgetWorksheet = ?,
        @MailBudgetWorksheet = ?`,
      [
        1,
        DoYouFeelConfident,
        Email,
        DateOfBirth,
        EmailBudgetWorksheet,
        MailBudgetWorksheet
      ]
    );
    res.status(201).json({ success: true });
  }catch(err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/analysis-01-01', async (req, res) => {
  try{
    const data = await db.raw(`EXEC get_Profile @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.patch('/analysis-02-01', async (req, res) => {
  const { Savings, Cash, RetirementAccounts, Stocks, Cryptocurrency, Bonds, LifeInsurance } = req.body;
  try{
    await db.raw(
      `EXEC update_Savings 
        @ProfileID = ?,
        @Savings = ?,
        @Cash = ?,
        @RetirementAccounts = ?,
        @Stocks = ?,
        @Cryptocurrency = ?,
        @Bonds = ?,
        @LifeInsurance = ?`, 
      [
        1,
        Savings,
        Cash,
        RetirementAccounts,
        Stocks,
        Cryptocurrency,
        Bonds,
        LifeInsurance
      ]
    );
    res.status(201).json({ success: true });
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/analysis-02-01', async (req, res) => {
  try{
    const data = await db.raw(`EXEC get_Savings @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/analysis-03-01/allocations', async (req, res) => {
  try{
    const data = await db.raw(`EXEC get_UserAllocations @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/analysis-03-01/expenses', async (req, res) => {
  try{
    const data = await db.raw(`EXEC get_UserTotalExpenses @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/TotalHouseholdNetIncome', async (req, res) => {
  try{
    const data = await db.raw(`EXEC get_TotalHouseholdNetIncome @ProfileID = ?`, [1]);
    res.status(201).json(data[0].TotalHouseholdNetIncome);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Self Enrollment API listening on port ${port}`);
});