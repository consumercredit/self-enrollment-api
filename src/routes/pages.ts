import { Router } from 'express';
import { db } from '../app';
import type { NetWorthItem, ExpenseItem, IncomeItem } from '../types';
import { updateNetWorthItem, updateExpense, updateOtherIncome } from '../functions';
import { getProfileId } from '../middleware/profile-middleware';

const router = Router();

router.post('/profile', async (req, res) => {
  const { firstName, lastName, zipCode, phone, consentToTexts } = req.body;
  try {
    const profileId = getProfileId(req);
    
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
    const profileId = getProfileId(req);
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
        profileId,
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
    const profileId = getProfileId(req);
    const data = await db('Issues')
      .select('*')
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-01-03', async (req, res) => {
  const { waysToOvercome } = req.body;
  try {
    const profileId = getProfileId(req);
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
        profileId,
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
    const profileId = getProfileId(req);
    const data = await db('WaysToOvercome')
      .select('*')
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-02-01', async (req, res) => {
  const { NumberOfPeopleResponsibleFor, HasPartner, JointBudget } = req.body;
  try {
    const profileId = getProfileId(req);
    await db.raw(
      'EXEC update_Profile @ProfileID = ?, @NumberOfPeopleResponsibleFor = ?, @HasPartner = ?, @JointBudget = ?',
      [profileId, NumberOfPeopleResponsibleFor, HasPartner, JointBudget]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-02-01', async (req, res) => {
  try {
    const profileId = getProfileId(req);
    const data = await db('Profile')
      .select('NumberOfPeopleResponsibleFor', 'HasPartner', 'JointBudget')
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-03-01', async (req, res) => {
  const { demoInfo } = req.body;
  try {
    const profileId = getProfileId(req);
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
        profileId,
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
    const profileId = getProfileId(req);
    const data = await db('Demographics')
      .select('GenderID', 'MaritalID', 'HeadOfHousehold', 'Adults', 'Children', 'TotalPeopleInHousehold')
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-03-02', async (req, res) => {
  const { demoInfo } = req.body;
  try {
    const profileId = getProfileId(req);
    await db.raw(
      `EXEC update_Employment 
        @ProfileID = ?, 
        @EmploymentID = ?, 
        @TypeOfWork = ?, 
        @DoesSideWork = ?, 
        @MilitaryID = ?, 
        @PlanToLeaveMilitary = ?`,
      [
        profileId,
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
          profileId,
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
    const profileId = getProfileId(req);
    const employment = await db('Employment')
      .select('EmploymentID', 'TypeOfWork', 'DoesSideWork', 'MilitaryID', 'PlanToLeaveMilitary')
      .where({ ProfileID: profileId });
    const sidework = await db('SideWork')
      .select('Zip', 'Employees', 'YearsEmployed', 'TypeOfBusinessID', 'RevenueID', 'TypeOfBusinessOther')
      .where({ ProfileID: profileId });
    res.status(200).json({ employment: employment[0], sidework: sidework[0] });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-03-03', async (req, res) => {
  const { EducationID, OtherEducation, RaceID, IsHispanic, DateOfBirth } = req.body;
  try {
    const profileId = getProfileId(req);
    await db.raw(
      `EXEC update_Demographics 
        @ProfileID = ?, 
        @EducationID = ?, 
        @OtherEducation = ?, 
        @RaceID = ?, 
        @IsHispanic = ?`,
      [profileId, EducationID, OtherEducation, RaceID, IsHispanic]
    );
    await db.raw('EXEC update_Profile @ProfileID = ?, @DateOfBirth = ?', [profileId, DateOfBirth]);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-03-03', async (req, res) => {
  try {
    const profileId = getProfileId(req);
    const demographics = await db('Demographics')
      .select('EducationID', 'OtherEducation', 'RaceID', 'IsHispanic')
      .where({ ProfileID: profileId });
    const profile = await db('Profile')
      .select('DateOfBirth')
      .where({ ProfileID: profileId });
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
    const profileId = getProfileId(req);
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
        profileId, 
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
    const profileId = getProfileId(req);
    const data = await db('Demographics')
      .select(
        'HousingID',
        'OtherHousing', 
        'IsProficientInEnglish', 
        'LivesInRuralArea', 
        'HasFiledForBankruptcy', 
        'YearsUntilRetirement'
      )
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-03-05', async (req, res) => {
  const { CanShareInfo } = req.body;
  try {
    const profileId = getProfileId(req);
    await db.raw(
      `EXEC update_Demographics 
        @ProfileID = ?,
        @CanShareInfo = ?`,
      [profileId, CanShareInfo]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-03-05', async (req, res) => {
  try {
    const profileId = getProfileId(req);
    const demographics = await db('Demographics')
      .select('CanShareInfo')
      .where({ ProfileID: profileId });
    res.status(200).json({ demographics: demographics[0] || {} });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-04-01', async (req, res) => {
  const { budgetItems, otherGoalDescription } = req.body;
  try {
    const profileId = getProfileId(req);
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
        @Other = ?,
        @OtherDescription = ?`,
      [
        profileId,
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
        budgetItems.Other,
        otherGoalDescription || null
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
    const profileId = getProfileId(req);
    const data = await db('Goals')
      .select('PurchaseHome', 'SaveForRetirement', 'ContinueEducation', 'HaveEmergencySavings', 'FinanceChildsEducation', 'PayOffCollegeLoans', 'MakeHomeImprovements', 'BuyVacationHome', 'PurchaseNewVehicle', 'SavingForFuneral', 'HaveLifeInsurance', 'PayOffMortgage', 'Other', 'OtherDescription')
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/concerns-05-01', async (req, res) => {
  const { spendingHabits } = req.body;
  try {
    const profileId = getProfileId(req);
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
        profileId,
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
    const profileId = getProfileId(req);
    const data = await db('Habits')
      .select('*')
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/income-01-01', async (req, res) => {
  try {
    const profileId = getProfileId(req);
    const profile = await db('Profile')
      .select('DoYouHaveIncome', 'DoYouHaveSavings', 'JointBudget')
      .where({ ProfileID: profileId });
    const yourIncome = await db('YourIncome')
      .select('*')
      .where({ ProfileID: profileId });
    const yourPartnersIncome = await db('YourPartnersIncome')
      .select('*')
      .where({ ProfileID: profileId });
    const yourSavingsIncome = await db('YourSavingsIncome')
      .select('*')
      .where({ ProfileID: profileId });
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
    JointBudget,
    yourIncome,
    yourPartnersIncome,
    yourSavingsIncome
  } = req.body;

  try {
    const profileId = getProfileId(req);

    await db.raw(
      `EXEC update_Profile
        @ProfileID = ?,
        @DoYouHaveIncome = ?,
        @DoYouHaveSavings = ?`,
      [
        profileId,
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
          profileId,
          yourIncome.PayPeriodID,
          yourIncome.GrossIncome,
          yourIncome.NetIncome,
          yourIncome.OtherDeductions,
          yourIncome.WagesGarnished,
          yourIncome.PayrollDeductions
        ]
      );
    }

    if (JointBudget) {
      await db.raw(
        `EXEC update_YourPartnersIncome 
        @ProfileID = ?,
        @PayPeriodID = ?,
        @GrossIncome = ?,
        @NetIncome = ?,
        @PayrollDeductions = ?`,
        [
          profileId,
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
          profileId,
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
    const profileId = getProfileId(req);
    const otherincome = await db('OtherIncome')
      .select('*')
      .where({ ProfileID: profileId });
    const totalgrossincome_monthly = await db.raw('EXEC get_TotalGrossMonthlyIncome_Monthly @ProfileID = ?', [profileId]);
    const totalgrossincome_yearly = await db.raw('EXEC get_TotalGrossMonthlyIncome_Yearly @ProfileID = ?', [profileId]);

    const totalnetincome_monthly = await db.raw('EXEC get_TotalHouseholdNetIncome_NoOtherIncome_Monthly @ProfileID = ?', [profileId]);
    const totalnetincome_yearly = await db.raw('EXEC get_TotalHouseholdNetIncome_NoOtherIncome_Yearly @ProfileID = ?', [profileId]);
    res.status(200).json({ 
      otherincome: otherincome,
      totalgrossincome_monthly: totalgrossincome_monthly[0].TotalGrossMonthlyIncome,
      totalgrossincome_yearly: totalgrossincome_yearly[0].TotalGrossYearlyIncome,
      totalnetincome_monthly: totalnetincome_monthly[0].TotalHouseholdNetIncome,
      totalnetincome_yearly: totalnetincome_yearly[0].TotalHouseholdNetIncome
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
    const profileId = getProfileId(req);
    for (const item of incomeItems) {
      await db.raw(
        `EXEC insert_OtherIncome 
          @ProfileID = ?,
          @Section = ?, 
          @PayPeriodID = ?, 
          @Amount = ?`,
        [
          profileId,
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
    const profileId = getProfileId(req);
    await db.raw(`EXEC update_Demographics @ProfileID = ?, @LivingArrangementID = ?`, [profileId, LivingArrangementID]);
    for (const exp of expenses) {
      await db.raw(
        `EXEC insert_Expenses 
          @ProfileID = ?,
          @Section = ?, 
          @PayPeriodID = ?, 
          @Amount = ?,
          @Comment = ?,
          @IncludedInMortgage = ?`,
        [
          profileId,
          exp.Section,
          exp.PayPeriodID,
          exp.Amount,
          exp.Comment,
          exp?.IncludedInMortgage ?? null
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
    const profileId = getProfileId(req);
    const expenses = await db('Expenses')
      .select('*')
      .where({ ProfileID: profileId });
    const demographics = await db('Demographics')
      .select('LivingArrangementID')
      .where({ ProfileID: profileId });
    res.status(200).json({ expenses: expenses, demographics: demographics[0] });
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/expenses-03-01', async (req, res) => {
  try{
    const profileId = getProfileId(req);
    const demographics = await db('Demographics')
      .select('TotalPeopleInHousehold')
      .where({ ProfileID: profileId });
    const expenses = await db('Expenses')
      .select('*')
      .where({ ProfileID: profileId });
    res.status(200).json({demographics: demographics[0], expenses: expenses});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/expenses-03-01', async (req, res) => {
  const { expenses } = req.body;
  try{
    const profileId = getProfileId(req);
    for (const exp of expenses) {
      await db.raw(
        `EXEC insert_Expenses 
          @ProfileID = ?,
          @Section = ?, 
          @PayPeriodID = ?, 
          @Amount = ?,
          @Comment = ?`,
        [
          profileId,
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
    const profileId = getProfileId(req);
    const demographics = await db('Demographics')
      .select('Adults', 'Children')
      .where({ ProfileID: profileId });
    const expenses = await db('Expenses')
      .select('*')
      .where({ ProfileID: profileId });
    res.status(200).json({demographics: demographics[0], expenses: expenses});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/expenses-04-01', async (req, res) => {
  const { expenses, adults, children } = req.body;
  try{
    const profileId = getProfileId(req);
    for (const exp of expenses) {
      await db.raw(
        `EXEC insert_Expenses 
          @ProfileID = ?,
          @Section = ?, 
          @PayPeriodID = ?, 
          @Amount = ?,
          @Comment = ?`,
        [
          profileId,
          exp.Section,
          exp.PayPeriodID,
          exp.Amount,
          exp.Comment
        ]
      );
    }
    await db.raw(`EXEC update_Demographics @ProfileID = ?, @Adults = ?, @Children = ?`, [profileId, adults, children]);
    res.status(201).json({ success: true });
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/expenses-06-01', async (req, res) => {
  try{
    const profileId = getProfileId(req);
    
    const expenses = await db('Expenses').select('*').where({ ProfileID: profileId });
    const securedDebt = await db('SecuredDebt').select('*').where({ ProfileID: profileId });
    const unsecuredDebt = await db('UnsecuredDebt').select('*').where({ ProfileID: profileId });
    const income = await db.raw(`EXEC get_TotalHouseholdNetIncome_Monthly @ProfileID = ?`, [profileId]);
    
    const yourIncome = await db('YourIncome').select('*').where({ ProfileID: profileId });
    const partnerIncome = await db('YourPartnersIncome').select('*').where({ ProfileID: profileId });
    const savingsIncome = await db('YourSavingsIncome').select('*').where({ ProfileID: profileId });
    const otherIncome = await db('OtherIncome').select('*').where({ ProfileID: profileId });
    
    res.status(200).json({
      expenses, 
      securedDebt, 
      unsecuredDebt, 
      totalHouseholdNetIncome: income[0]?.TotalHouseholdNetIncome,
      debug: {
        profileId,
        incomeResult: income[0],
        hasYourIncome: yourIncome.length > 0,
        hasPartnerIncome: partnerIncome.length > 0,
        hasSavingsIncome: savingsIncome.length > 0,
        hasOtherIncome: otherIncome.length > 0
      }
    });
  }catch(err: any){
    console.error('❌ expenses-06-01 error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/analysis-01-01', async (req, res) => {
  const { DoYouFeelConfident, Email, DateOfBirth, EmailBudgetWorksheet, MailBudgetWorksheet } = req.body;
  try{
    const profileId = getProfileId(req);
    await db.raw(
      `EXEC update_Profile 
        @ProfileID = ?,
        @DoYouFeelConfident = ?,
        @Email = ?,
        @DateOfBirth = ?,
        @EmailBudgetWorksheet = ?,
        @MailBudgetWorksheet = ?`,
      [
        profileId,
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
    const profileId = getProfileId(req);
    const data = await db('Profile')
      .select('DoYouFeelConfident', 'Email', 'DateOfBirth', 'EmailBudgetWorksheet', 'MailBudgetWorksheet')
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/analysis-02-01', async (req, res) => {
  const { CashSavings, RetirementAccounts, Stocks, Cryptocurrency, Bonds, LifeInsurance, MonthlySavingsContribution } = req.body;
  try{
    const profileId = getProfileId(req);
    await db.raw(`
      EXEC update_Savings 
      @ProfileID = ?,
      @CashSavings = ?,
      @RetirementAccounts = ?,
      @Stocks = ?,
      @Cryptocurrency = ?,
      @Bonds = ?,
      @LifeInsurance = ?,
      @MonthlySavingsContribution = ?`, 
      [
        profileId,
        CashSavings,
        RetirementAccounts,
        Stocks,
        Cryptocurrency,
        Bonds,
        LifeInsurance,
        MonthlySavingsContribution
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
    const profileId = getProfileId(req);
    const data = await db('Savings')
      .select('*')
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/analysis-04-01', async (req, res) => {
  try{
    const profileId = getProfileId(req);
    const GrossMonthlyIncome = await db.raw(`EXEC get_TotalGrossMonthlyIncome_Monthly @ProfileID = ?`, [profileId]);
    const RecurringMonthlyDebt = await db.raw(`EXEC get_RecurringMonthlyDebt @ProfileID = ?`, [profileId]);
    const TotalCreditLimit = await db.raw(`EXEC get_TotalCreditLimit @ProfileID = ?`, [profileId]);
    const TotalUnsecuredBalance = await db.raw(`EXEC get_TotalUnsecuredBalance @ProfileID = ?`, [profileId]);
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
    const profileId = getProfileId(req);
    await db.raw(`EXEC update_Profile @ProfileID = ?, @DebtToIncomeRatio = ?, @CreditUtilization = ?`, [profileId, DebtToIncomeRatio, CreditUtilization]);
    res.status(201).json({success: true});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/analysis-05-01', async (req, res) => {
  try{
    const profileId = getProfileId(req);
    const assets = await db.raw(`EXEC get_Assets @ProfileID = ?`, [profileId]);
    const liabilities = await db.raw(`EXEC get_Liabilities @ProfileID = ?`, [profileId]);
    res.status(200).json({assets: assets, liabilities: liabilities});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.post('/analysis-05-01', async (req, res) => {
  const { assets, liabilities, NetWorth } = req.body;
  try{
    const profileId = getProfileId(req);
    assets.forEach((asset: NetWorthItem) => {
      updateNetWorthItem(asset, profileId, "asset");
  });
    liabilities.forEach((liability: NetWorthItem) => {
      updateNetWorthItem(liability, profileId, "liability");
  });
    await db.raw('EXEC update_Profile @ProfileID = ?, @NetWorth = ?', [profileId, NetWorth]);
    res.status(201).json({success: true});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/budget-shortfall', async (req, res) => {
  try{
    const profileId = getProfileId(req);
    const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [profileId]);
    const securedDebt = await db.raw('EXEC get_TotalSecuredMonthlyPayment @ProfileID = ?', [profileId]);
    const unsecuredDebt = await db.raw('EXEC get_TotalUnsecuredMonthlyPayment @ProfileID = ?', [profileId]);
    const expenses = await db.raw('EXEC get_Expenses @ProfileID = ?', [profileId]);
    const yourIncome = await db.raw('EXEC get_YourIncome @ProfileID = ?', [profileId]);
    const yourPartnersIncome = await db.raw('EXEC get_YourPartnersIncome @ProfileID = ?', [profileId]);
    const yourSavingsIncome = await db.raw('EXEC get_YourSavingsIncome @ProfileID = ?', [profileId]);
    const otherIncome = await db.raw('EXEC get_OtherIncome @ProfileID = ?', [profileId]);
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
    const profileId = getProfileId(req);
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
        profileId,
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
        profileId,
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
        profileId,
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
    const profileId = getProfileId(req);
    const data = await db('Goals')
      .select('*')
      .where({ ProfileID: profileId });
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
    const profileId = getProfileId(req);
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
      profileId,
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
    const profileId = getProfileId(req);
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
      .where({ ProfileID: profileId });
    res.status(200).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/analysis-07-02', async (req, res) => {
  try{
    const profileId = getProfileId(req);
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
      .where({ ProfileID: profileId });
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
    const profileId = getProfileId(req);
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
      profileId,
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
    const profileId = getProfileId(req);
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
      .where({ ProfileID: profileId });
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
    const profileId = getProfileId(req);
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
        profileId,
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
    const profileId = getProfileId(req);
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
      .where({ ProfileID: profileId });
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
    const profileId = getProfileId(req);
    await db.raw(`EXEC update_WaysToTrimBudget 
      @ProfileID = ?, 
      @GenericMedications = ?,
      @LowCostClinics = ?,
      @UseUrgentCare = ?,
      @AskForCashDiscounts = ?,
      @ReviewHospitalBills = ?,
      @TrackInsuranceClaims = ?`,
      [
        profileId,
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
    const profileId = getProfileId(req);
    const profile = await db('Profile')
      .select('DebtToIncomeRatio', 'CreditUtilization')
      .where({ ProfileID: profileId });
    res.status(200).json({DebtToIncomeRatio: profile[0].DebtToIncomeRatio, CreditUtilization: profile[0].CreditUtilization});
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

export default router;