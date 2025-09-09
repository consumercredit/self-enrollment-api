import { Router } from 'express';
import { db } from '../app';
import type { NetWorthItem, ExpenseItem, IncomeItem } from '../types';
import { updateNetWorthItem, updateExpense, updateOtherIncome } from '../functions';
import { getProfileId } from '../middleware/profile-middleware';

const router = Router();

// Profile page endpoints
router.post('/profile', async (req, res) => {
  const { firstName, lastName, zipCode, phone, consentToTexts } = req.body;
  try {
    const profileId = getProfileId(req);
    
    // Use update_Profile stored procedure with ZipCode parameter (after you update the procedure)
    await db.raw(
      `EXEC update_Profile 
        @ProfileID = ?,
        @FirstName = ?,
        @LastName = ?,
        @Phone = ?,
        @ConsentToTexts = ?,
        @ZipCode = ?`,
      [profileId, firstName, lastName, phone, consentToTexts, zipCode]
    );
    
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const profileId = getProfileId(req);
    
    const data = await db('Profile')
      .select('FirstName', 'LastName', 'Phone', 'ConsentToTexts', 'ZipCode')
      .where({ ProfileID: profileId })
      .first();
      
    res.status(200).json(data || {});
  } catch (err: any) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.post('/concerns-01-01', async (req, res) => {
  const { HowDidYouHearAboutUsID, TypeOfDebtID, creditCardDebtDetails } = req.body;
  try {
    const profileId = getProfileId(req);
    
    await db.raw(
      `EXEC update_Concerns 
        @ProfileID = ?,
        @TypeOfDebtID = ?, 
        @AmountOwedID = ?, 
        @PaymentStatusID = ?, 
        @PrimaryHardshipID = ?,
        @QualityOfLifeImpact = ?`,
      [
        profileId, 
        TypeOfDebtID, 
        creditCardDebtDetails.AmountOwedID, 
        creditCardDebtDetails.PaymentStatusID, 
        creditCardDebtDetails.PrimaryHardshipID, 
        creditCardDebtDetails.QualityOfLifeImpact
      ]
    );
    await db.raw('EXEC update_Profile @ProfileID = ?, @HowDidYouHearAboutUsID = ?', [profileId, HowDidYouHearAboutUsID]);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-01-01', async (req, res) => {
  try {
    const profileId = getProfileId(req);
    
    const concerns = await db('Concerns')
      .select('TypeOfDebtID', 'AmountOwedID', 'PaymentStatusID', 'PrimaryHardshipID', 'QualityOfLifeImpact')
      .where({ ProfileID: profileId });
    const profile = await db('Profile')
      .select('HowDidYouHearAboutUsID')
      .where({ ProfileID: profileId });
    res.status(200).json({ concerns: concerns[0], profile: profile[0] });
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-01-02', async (req, res) => {
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
        financialIssues.JobLoss,
        financialIssues.IncomeReduction,
        financialIssues.Medical,
        financialIssues.MedicalDescription,
        financialIssues.StudentLoan,
        financialIssues.StudentLoanDescription,
        financialIssues.Accidents,
        financialIssues.SubstanceAbuse,
        financialIssues.Incarceration,
        financialIssues.LossOfLovedOnes,
        financialIssues.UnexpectedExpenses,
        financialIssues.Divorce,
        financialIssues.Separation,
        financialIssues.Pregnancy,
        financialIssues.CollectionProblems,
        financialIssues.TaxIssues,
        financialIssues.Lawsuits,
        financialIssues.HousingIssues,
        financialIssues.FinancialMismanagement,
        financialIssues.FinancialMismanagementDescription,
        financialIssues.MilitaryService,
        financialIssues.MilitaryServiceDescription
      ]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-01-02', async (req, res) => {
  try {
    const data = await db('Issues')
      .select('*')
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-01-03', async (req, res) => {
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
        waysToOvercome.CallingACCC,
        waysToOvercome.ContactedCreditors,
        waysToOvercome.ContactedAttorney,
        waysToOvercome.WorkingNightsWeekends,
        waysToOvercome.FoundBetterJob,
        waysToOvercome.SpendingLess,
        waysToOvercome.SecondJob,
        waysToOvercome.SellProperty,
        waysToOvercome.SoldOtherAssets,
        waysToOvercome.Other,
        waysToOvercome.OtherDescription
      ]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-01-03', async (req, res) => {
  try {
    const data = await db('WaysToOvercome')
      .select('*')
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-02-01', async (req, res) => {
  const { NumberOfPeopleResponsibleFor, HasPartner } = req.body;
  try {
    await db.raw(
      'EXEC update_Profile @ProfileID = ?, @NumberOfPeopleResponsibleFor = ?, @HasPartner = ?',
      [1, NumberOfPeopleResponsibleFor, HasPartner]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-02-01', async (req, res) => {
  try {
    const data = await db('Profile')
      .select('NumberOfPeopleResponsibleFor', 'HasPartner')
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-03-01', async (req, res) => {
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
      [
        1,
        demoInfo.GenderID,
        demoInfo.MaritalID,
        demoInfo.HeadOfHousehold,
        demoInfo.Adults,
        demoInfo.Children,
        demoInfo.Adults + demoInfo.Children
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-03-01', async (req, res) => {
  try {
    const data = await db('Demographics')
      .select('GenderID', 'MaritalID', 'HeadOfHousehold', 'Adults', 'Children', 'TotalPeopleInHousehold')
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-03-02', async (req, res) => {
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
        demoInfo.EmploymentID,
        demoInfo.TypeOfWork,
        demoInfo.DoesSideWork,
        demoInfo.MilitaryID,
        demoInfo.PlanToLeaveMilitary
      ]
    );
    if (demoInfo.DoesSideWork) {
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
          demoInfo.SideWorkDetails.Zip,
          demoInfo.SideWorkDetails.Employees,
          demoInfo.SideWorkDetails.YearsEmployed,
          demoInfo.SideWorkDetails.TypeOfBusinessID,
          demoInfo.SideWorkDetails.RevenueID,
          demoInfo.SideWorkDetails.TypeOfBusinessOther
        ]
      );
    }
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-03-02', async (req, res) => {
  try {
    const employment = await db('Employment')
      .select('EmploymentID', 'TypeOfWork', 'DoesSideWork', 'MilitaryID', 'PlanToLeaveMilitary')
      .where({ ProfileID: 1 });
    const sidework = await db('SideWork')
      .select('Zip', 'Employees', 'YearsEmployed', 'TypeOfBusinessID', 'RevenueID', 'TypeOfBusinessOther')
      .where({ ProfileID: 1 });
    res.status(200).json({ employment: employment[0], sidework: sidework[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-03-03', async (req, res) => {
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
  
router.get('/concerns-03-03', async (req, res) => {
  try {
    const demographics = await db('Demographics')
      .select('EducationID', 'OtherEducation', 'RaceID', 'IsHispanic')
      .where({ ProfileID: 1 });
    const profile = await db('Profile')
      .select('DateOfBirth')
      .where({ ProfileID: 1 });
    res.status(200).json({ demographics: demographics[0], profile: profile[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-03-04', async (req, res) => {
  const { 
    HousingID, 
    OtherHousing, 
    IsProficientInEnglish, 
    LivesInRuralArea, 
    HasFiledForBankruptcy, 
    YearsUntilRetirement 
  } = req.body;
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
      [
        1, 
        HousingID, 
        OtherHousing, 
        IsProficientInEnglish, 
        LivesInRuralArea, 
        HasFiledForBankruptcy, 
        YearsUntilRetirement
      ]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-03-04', async (req, res) => {
  try {
    const data = await db('Demographics')
      .select(
        'HousingID',
        'OtherHousing', 
        'IsProficientInEnglish', 
        'LivesInRuralArea', 
        'HasFiledForBankruptcy', 
        'YearsUntilRetirement'
      )
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-03-05', async (req, res) => {
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
  
router.get('/concerns-03-05', async (req, res) => {
  try {
    const demographics = await db('Demographics')
      .select('CanShareInfo')
      .where({ ProfileID: 1 });
    const profile = await db('Profile')
      .select('ConsentToTexts', 'Phone')
      .where({ ProfileID: 1 });
    res.status(200).json({ demographics: demographics[0], profile: profile[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-04-01', async (req, res) => {
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
  
router.get('/concerns-04-01', async (req, res) => {
  try {
    const data = await db('Goals')
      .select('PurchaseHome', 'SaveForRetirement', 'ContinueEducation', 'HaveEmergencySavings', 'FinanceChildsEducation', 'PayOffCollegeLoans', 'MakeHomeImprovements', 'BuyVacationHome', 'PurchaseNewVehicle', 'SavingForFuneral', 'HaveLifeInsurance', 'PayOffMortgage', 'Other')
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-05-01', async (req, res) => {
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
  
router.get('/concerns-05-01', async (req, res) => {
  try {
    const data = await db('Habits')
      .select('*')
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/income-01-01', async (req, res) => {
  try {
    const profile = await db('Profile')
      .select('DoYouHaveIncome', 'DoYouHaveSavings', 'HasPartner')
      .where({ ProfileID: 1 });
    const yourIncome = await db('YourIncome')
      .select('*')
      .where({ ProfileID: 1 });
    const yourPartnersIncome = await db('YourPartnersIncome')
      .select('*')
      .where({ ProfileID: 1 });
    const yourSavingsIncome = await db('YourSavingsIncome')
      .select('*')
      .where({ ProfileID: 1 });
    res.status(200).json({ profile: profile[0], yourIncome: yourIncome[0], yourPartnersIncome: yourPartnersIncome[0], yourSavingsIncome: yourSavingsIncome[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/income-01-01', async (req, res) => {
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
  
router.get('/income-02-01', async (req, res) => {
  try {
    const otherincome = await db('OtherIncome')
      .select('*')
      .where({ ProfileID: 1 });
    const totalgrossincome = await db.raw('EXEC get_TotalGrossMonthlyIncome @ProfileID = ?', [1]);
    const totalnetincome = await db.raw('EXEC get_TotalHouseholdNetIncome @ProfileID = ?', [1]);
    res.status(200).json({ 
      otherincome: otherincome,
      totalgrossincome: totalgrossincome[0].TotalGrossMonthlyIncome,
      totalnetincome: totalnetincome[0].TotalHouseholdNetIncome
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/income-02-01', async (req, res) => {
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
  
router.post('/expenses-02-01', async (req, res) => {
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
  
router.get('/expenses-02-01', async (req, res) => {
  try{
    const expenses = await db('Expenses')
      .select('*')
      .where({ ProfileID: 1 });
    const demographics = await db('Demographics')
      .select('LivingArrangementID')
      .where({ ProfileID: 1 });
    res.status(200).json({ expenses: expenses, demographics: demographics[0] });
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/expenses-03-01', async (req, res) => {
  try{
    const demographics = await db('Demographics')
      .select('TotalPeopleInHousehold')
      .where({ ProfileID: 1 });
    const expenses = await db('Expenses')
      .select('*')
      .where({ ProfileID: 1 });
    res.status(200).json({demographics: demographics[0], expenses: expenses});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/expenses-03-01', async (req, res) => {
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
  
router.get('/expenses-04-01', async (req, res) => {
  try{
    const demographics = await db('Demographics')
      .select('Adults', 'Children')
      .where({ ProfileID: 1 });
    const expenses = await db('Expenses')
      .select('*')
      .where({ ProfileID: 1 });
    res.status(200).json({demographics: demographics[0], expenses: expenses});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/expenses-04-01', async (req, res) => {
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
  
router.get('/expenses-06-01', async (req, res) => {
  try{
    const expenses = await db('Expenses').select('*').where({ ProfileID: 1 });
    const securedDebt = await db('SecuredDebt').select('*').where({ ProfileID: 1 });
    const unsecuredDebt = await db('UnsecuredDebt').select('*').where({ ProfileID: 1 });
    const income = await db.raw(`EXEC get_TotalHouseholdNetIncome @ProfileID = ?`, [1]);
    res.status(200).json({expenses, securedDebt, unsecuredDebt, totalHouseholdNetIncome: income[0].TotalHouseholdNetIncome});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/analysis-01-01', async (req, res) => {
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
  
router.get('/analysis-01-01', async (req, res) => {
  try{
    const data = await db('Profile')
      .select('DoYouFeelConfident', 'Email', 'DateOfBirth', 'EmailBudgetWorksheet', 'MailBudgetWorksheet')
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/analysis-02-01', async (req, res) => {
  const { Savings, Cash, RetirementAccounts, Stocks, Cryptocurrency, Bonds, LifeInsurance } = req.body;
  try{
    await db.raw(`
      EXEC update_Savings 
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
  
router.get('/analysis-02-01', async (req, res) => {
  try{
    const data = await db('Savings')
      .select('*')
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/analysis-04-01', async (req, res) => {
  try{
    const GrossMonthlyIncome = await db.raw(`EXEC get_TotalGrossMonthlyIncome @ProfileID = ?`, [1]);
    const RecurringMonthlyDebt = await db.raw(`EXEC get_RecurringMonthlyDebt @ProfileID = ?`, [1]);
    const TotalCreditLimit = await db.raw(`EXEC get_TotalCreditLimit @ProfileID = ?`, [1]);
    const TotalUnsecuredBalance = await db.raw(`EXEC get_TotalUnsecuredBalance @ProfileID = ?`, [1]);
    res.status(200).json(
      {
        GrossMonthlyIncome: GrossMonthlyIncome[0].TotalGrossMonthlyIncome,
        RecurringMonthlyDebt: RecurringMonthlyDebt[0].RecurringMonthlyDebt,
        TotalCreditLimit: TotalCreditLimit[0].TotalCreditLimit,
        TotalUnsecuredBalance: TotalUnsecuredBalance[0].TotalUnsecuredBalance
      }
    );
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/analysis-04-01', async (req, res) => {
  const { DebtToIncomeRatio, CreditUtilization } = req.body;
  try{
    await db.raw(`EXEC update_Profile @ProfileID = ?, @DebtToIncomeRatio = ?, @CreditUtilization = ?`, [1, DebtToIncomeRatio, CreditUtilization]);
    res.status(201).json({success: true});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/analysis-05-01', async (req, res) => {
  try{
    const assets = await db.raw(`EXEC get_Assets @ProfileID = ?`, [1]);
    const liabilities = await db.raw(`EXEC get_Liabilities @ProfileID = ?`, [1]);
    res.status(200).json({assets: assets, liabilities: liabilities});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/analysis-05-01', async (req, res) => {
  const { assets, liabilities, NetWorth } = req.body;
  try{
    assets.forEach((asset: NetWorthItem) => {
      updateNetWorthItem(asset, 1, "asset");
  });
    liabilities.forEach((liability: NetWorthItem) => {
      updateNetWorthItem(liability, 1, "liability");
  });
    await db.raw('EXEC update_Profile @ProfileID = ?, @NetWorth = ?', [1, NetWorth]);
    res.status(201).json({success: true});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/budget-shortfall', async (req, res) => {
  try{
    const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
    const securedDebt = await db.raw('EXEC get_TotalSecuredMonthlyPayment @ProfileID = ?', [1]);
    const unsecuredDebt = await db.raw('EXEC get_TotalUnsecuredMonthlyPayment @ProfileID = ?', [1]);
    const expenses = await db.raw('EXEC get_Expenses @ProfileID = ?', [1]);
    const yourIncome = await db.raw('EXEC get_YourIncome @ProfileID = ?', [1]);
    const yourPartnersIncome = await db.raw('EXEC get_YourPartnersIncome @ProfileID = ?', [1]);
    const yourSavingsIncome = await db.raw('EXEC get_YourSavingsIncome @ProfileID = ?', [1]);
    const otherIncome = await db.raw('EXEC get_OtherIncome @ProfileID = ?', [1]);
    res.status(200).json(
      {
        profile: profile[0],
        securedDebt: securedDebt[0],
        unsecuredDebt: unsecuredDebt[0],
        expenses: expenses,
        yourIncome: yourIncome[0],
        yourPartnersIncome: yourPartnersIncome[0],
        yourSavingsIncome: yourSavingsIncome[0],
        otherIncome: otherIncome
      }
    );
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/budget-shortfall', async (req, res) => {
  const { 
    housingExpenses, 
    transportationExpenses, 
    livingExpenses, 
    yourIncome, 
    yourPartnersIncome, 
    yourSavingsIncome, 
    otherIncomes 
  } = req.body;
  try{
    housingExpenses.forEach((expense: ExpenseItem) => {
      updateExpense(expense);
  });
    transportationExpenses.forEach((expense: ExpenseItem) => {
      updateExpense(expense);
  });
    livingExpenses.forEach((expense: ExpenseItem) => {
      updateExpense(expense);
  });
    await db.raw(`EXEC update_YourIncome 
      @ProfileID = ?,
      @PayPeriodID = ?, 
      @GrossIncome = ?, 
      @NetIncome = ?, 
      @OtherDeductions = ?, 
      @PayrollDeductions = ?`,
      [
        1,
        yourIncome.PayPeriodID,
        yourIncome.GrossIncome,
        yourIncome.NetIncome,
        yourIncome.OtherDeductions,
        yourIncome.PayrollDeductions
      ]
    );
    await db.raw(`EXEC update_YourPartnersIncome 
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
    await db.raw(`EXEC update_YourSavingsIncome
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
    otherIncomes.forEach((income: IncomeItem) => {
      updateOtherIncome(income);
  });
    res.status(201).json({success: true});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/analysis-06-01', async (req, res) => {
  try{
    const data = await db('Goals')
      .select('*')
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/analysis-07-01', async (req, res) => {
  const {
    CookAtHome,
    PackLunch,
    BatchCook,
    BuySeasonalProduce,
    PlanMealsAroundSales,
    UseCoupons,
    ThinkBeforeBuy,
    MaximizeWardrobe,
    EasyCareClothing,
    SaveHaircuts,
    DitchGym,
    ShopSecondhand
  } = req.body;  
  try{
    await db.raw(`
      EXEC update_WaysToTrimBudget 
        @ProfileID = ?,
        @CookAtHome = ?,
        @PackLunch = ?,
        @BatchCook = ?,
        @BuySeasonalProduce = ?,
        @PlanMealsAroundSales = ?,
        @UseCoupons = ?,
        @ThinkBeforeBuy = ?,
        @MaximizeWardrobe = ?,
        @EasyCareClothing = ?,
        @SaveHaircuts = ?,
        @DitchGym = ?,
        @ShopSecondhand = ?
    `, 
    [
      1,
      CookAtHome,
      PackLunch,
      BatchCook,
      BuySeasonalProduce,
      PlanMealsAroundSales,
      UseCoupons,
      ThinkBeforeBuy,
      MaximizeWardrobe,
      EasyCareClothing,
      SaveHaircuts,
      DitchGym,
      ShopSecondhand
    ]);
    res.status(201).json({success: true});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/analysis-07-01', async (req, res) => {
  try{
    const data = await db('WaysToTrimBudget')
      .select([
        'CookAtHome',
        'PackLunch', 
        'BatchCook', 
        'BuySeasonalProduce', 
        'PlanMealsAroundSales', 
        'UseCoupons', 
        'ThinkBeforeBuy', 
        'MaximizeWardrobe', 
        'EasyCareClothing', 
        'SaveHaircuts', 
        'DitchGym', 
        'ShopSecondhand'
      ])
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/analysis-07-02', async (req, res) => {
  try{
    const data = await db('WaysToTrimBudget')
      .select([
        'RefinanceMortgage',
        'IncreaseDeductibles',
        'GetRoommate',
        'CutTV',
        'UpgradeAppliances',
        'UseSmartThermostat',
        'UnplugElectronics',
        'ConserveWater',
        'CompareHomeInsurance',
        'UseUtilityAssistance'
      ])
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.post('/analysis-07-02', async (req, res) => {
  const {
    RefinanceMortgage,
    IncreaseDeductibles,
    GetRoommate,
    CutTV,
    UpgradeAppliances,
    UseSmartThermostat,
    UnplugElectronics,
    ConserveWater,
    CompareHomeInsurance,
    UseUtilityAssistance
  } = req.body;

  try {
    await db.raw(`
      EXEC update_WaysToTrimBudget 
        @ProfileID = ?,
        @RefinanceMortgage = ?,
        @IncreaseDeductibles = ?,
        @GetRoommate = ?,
        @CutTV = ?,
        @UpgradeAppliances = ?,
        @UseSmartThermostat = ?,
        @UnplugElectronics = ?,
        @ConserveWater = ?,
        @CompareHomeInsurance = ?,
        @UseUtilityAssistance = ?
    `, [
      1,
      RefinanceMortgage,
      IncreaseDeductibles,
      GetRoommate,
      CutTV,
      UpgradeAppliances,
      UseSmartThermostat,
      UnplugElectronics,
      ConserveWater,
      CompareHomeInsurance,
      UseUtilityAssistance
    ]);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/analysis-07-03', async (req, res) => {
  try{
    const data = await db('WaysToTrimBudget')
      .select(
        [
          'UsePublicTransit', 
          'Carpool', 
          'DriveLess', 
          'MaintainVehicle', 
          'RefinanceCar', 
          'ShopForCarInsurance', 
          'UseFuelRewards', 
          'BikeOrWalk', 
          'SwitchToFuelEfficientVehicle', 
          'WorkFromHome'
        ]
      )
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  }catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.post('/analysis-07-03', async (req, res) => {
  const {
    UsePublicTransit,
    Carpool,
    DriveLess,
    MaintainVehicle,
    RefinanceCar,
    ShopForCarInsurance,
    UseFuelRewards,
    BikeOrWalk,
    SwitchToFuelEfficientVehicle,
    WorkFromHome
  } = req.body;
  try{
    await db.raw(`EXEC update_WaysToTrimBudget 
      @ProfileID = ?, 
      @UsePublicTransit = ?,
      @Carpool = ?,
      @DriveLess = ?,
      @MaintainVehicle = ?,
      @RefinanceCar = ?,
      @ShopForCarInsurance = ?,
      @UseFuelRewards = ?,
      @BikeOrWalk = ?,
      @SwitchToFuelEfficientVehicle = ?,
      @WorkFromHome = ?`,
      [
        1,
        UsePublicTransit,
        Carpool,
        DriveLess,
        MaintainVehicle,
        RefinanceCar,
        ShopForCarInsurance,
        UseFuelRewards,
        BikeOrWalk,
        SwitchToFuelEfficientVehicle,
        WorkFromHome
      ]
    );
    res.status(201).json({ success: true });
  }catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/analysis-07-04', async (req, res) => {
  try{
    const data = await db('WaysToTrimBudget')
      .select(
        [
          'GenericMedications', 
          'LowCostClinics', 
          'UseUrgentCare', 
          'AskForCashDiscounts', 
          'ReviewHospitalBills', 
          'TrackInsuranceClaims'
        ]
      )
      .where({ ProfileID: 1 });
    res.status(200).json(data[0]);
  }catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.post('/analysis-07-04', async (req, res) => {
  const {
    GenericMedications,
    LowCostClinics,
    UseUrgentCare,
    AskForCashDiscounts,
    ReviewHospitalBills,
    TrackInsuranceClaims
  } = req.body;
  try{
    await db.raw(`EXEC update_WaysToTrimBudget 
      @ProfileID = ?, 
      @GenericMedications = ?,
      @LowCostClinics = ?,
      @UseUrgentCare = ?,
      @AskForCashDiscounts = ?,
      @ReviewHospitalBills = ?,
      @TrackInsuranceClaims = ?`,
      [
        1,
        GenericMedications,
        LowCostClinics,
        UseUrgentCare,
        AskForCashDiscounts,
        ReviewHospitalBills,
        TrackInsuranceClaims
      ]
    );
    res.status(201).json({ success: true });
  }catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/analysis-08-01', async (req, res) => {
  try{
    const profile = await db('Profile')
      .select('DebtToIncomeRatio', 'CreditUtilization')
      .where({ ProfileID: 1 });
    res.status(200).json({DebtToIncomeRatio: profile[0].DebtToIncomeRatio, CreditUtilization: profile[0].CreditUtilization});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

export default router;