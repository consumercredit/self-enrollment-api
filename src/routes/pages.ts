import { Router } from 'express';
import { db } from '../app';
import type { NetWorthItem, ExpenseItem, IncomeItem } from '../types';
import { updateNetWorthItem, updateExpense, updateOtherIncome } from '../functions';

const router = Router();

router.post('/concerns-01-01', async (req, res) => {
  const { HowDidYouHearAboutUsID, TypeOfDebtID, creditCardDebtDetails } = req.body;
  try {
    await db.raw(
      `EXEC update_Concerns 
        @ProfileID = ?,
        @TypeOfDebtID = ?, 
        @AmountOwedID = ?, 
        @PaymentStatusID = ?, 
        @PrimaryHardshipID = ?,
        @QualityOfLifeImpact = ?`,
      [
        1, 
        TypeOfDebtID, 
        creditCardDebtDetails.AmountOwedID, 
        creditCardDebtDetails.PaymentStatusID, 
        creditCardDebtDetails.PrimaryHardshipID, 
        creditCardDebtDetails.QualityOfLifeImpact
      ]
    );
    await db.raw('EXEC update_Profile @ProfileID = ?, @HowDidYouHearAboutUsID = ?', [1, HowDidYouHearAboutUsID]);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});
  
router.get('/concerns-01-01', async (req, res) => {
    try {
      const concerns = await db.raw('EXEC get_Concerns @ProfileID = ?', [1]);
      const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
  
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
  
router.get('/concerns-01-02', async (req, res) => {
    try {
      const result = await db.raw('EXEC get_Issues @ProfileID = ?', [1]);
  
      res.status(200).json(result[0]);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.post('/concerns-01-03', async (req, res) => {
    const {
      CallingACCC,
      ContactedCreditors,
      ContactedAttorney,
      WorkingNightsWeekends,
      FoundBetterJob,
      SpendingLess,
      SecondJob,
      SellProperty,
      SoldOtherAssets,
      Other,
      OtherDescription
    } = req.body;
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
          CallingACCC,
          ContactedCreditors,
          ContactedAttorney,
          WorkingNightsWeekends,
          FoundBetterJob,
          SpendingLess,
          SecondJob,
          SellProperty,
          SoldOtherAssets,
          Other,
          OtherDescription
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
      const result = await db.raw('EXEC get_WaysToOvercome @ProfileID = ?', [1]);
      res.status(200).json(result[0]);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.post('/concerns-02-01', async (req, res) => {
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
  
router.get('/concerns-02-01', async (req, res) => {
    try {
      const result = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
      res.status(200).json(result[0]);
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
        [1, demoInfo.genderID, demoInfo.maritalID, demoInfo.headOfHousehold, demoInfo.adults, demoInfo.children, demoInfo.adults + demoInfo.children]
      );
  
      res.status(201).json({ success: true });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/concerns-03-01', async (req, res) => {
    try {
      const result = await db.raw('EXEC get_Demographics @ProfileID = ?', [1]);
      res.status(200).json(result[0]);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.post('/concerns-03-02', async (req, res) => {
    const {
      EmploymentID,
      TypeOfWork,
      DoesSideWork,
      MilitaryID,
      PlanToLeaveMilitary,
      SideWorkDetails
    } = req.body;
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
          EmploymentID,
          TypeOfWork,
          DoesSideWork,
          MilitaryID,
          PlanToLeaveMilitary
        ]
      );
  
      if (DoesSideWork) {
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
            SideWorkDetails.zip,
            SideWorkDetails.employees,
            SideWorkDetails.yearsEmployed,
            SideWorkDetails.typeOfBusiness,
            SideWorkDetails.revenueID,
            SideWorkDetails.typeOfBusinessOther
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
      const employment = await db.raw('EXEC get_Employment @ProfileID = ?', [1]);
      const sidework = await db.raw('EXEC get_SideWork @ProfileID = ?', [1]);
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
      const demographics = await db.raw('EXEC get_Demographics @ProfileID = ?', [1]);
      const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
      res.status(200).json({ demographics: demographics[0], profile: profile[0] });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.post('/concerns-03-04', async (req, res) => {
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
  
router.get('/concerns-03-04', async (req, res) => {
    try {
      const result = await db.raw('EXEC get_Demographics @ProfileID = ?', [1]);
      res.status(200).json(result[0]);
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
      const demographics = await db.raw('EXEC get_Demographics @ProfileID = ?', [1]);
      const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
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
      const result = await db.raw('EXEC get_Goals @ProfileID = ?', [1]);
      res.status(200).json(result[0]);
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
      const result = await db.raw('EXEC get_Habits @ProfileID = ?', [1]);
      res.status(200).json(result[0]);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/income-01-01', async (req, res) => {
    try {
      const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
      const yourIncome = await db.raw('EXEC get_YourIncome @ProfileID = ?', [1]);
      const yourPartnersIncome = await db.raw('EXEC get_YourPartnersIncome @ProfileID = ?', [1]);
      const yourSavingsIncome = await db.raw('EXEC get_YourSavingsIncome @ProfileID = ?', [1]);
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
  
router.get('/income-02-01/incomes', async (req, res) => {
    try {
      const profile = await db.raw('EXEC get_Profile @ProfileID = ?', [1]);
      const yourIncome = await db.raw('EXEC get_YourIncome @ProfileID = ?', [1]);
      const yourPartnersIncome = await db.raw('EXEC get_YourPartnersIncome @ProfileID = ?', [1]);
      const yourSavingsIncome = await db.raw('EXEC get_YourSavingsIncome @ProfileID = ?', [1]);
      res.status(200).json({ profile: profile[0], yourIncome: yourIncome[0], yourPartnersIncome: yourPartnersIncome[0], yourSavingsIncome: yourSavingsIncome[0] });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/income-02-01', async (req, res) => {
    try {
      const result = await db.raw('EXEC get_OtherIncome @ProfileID = ?', [1]);
      res.status(200).json(result);
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
  
router.get('/expenses-01-01', async (req, res) => {
    try{
      const data = await db.raw(`EXEC get_SecuredDebt @ProfileID = ?`, [1]);
      res.status(201).json(data);
    }catch(err: any){
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
      const expenses = await db.raw(`EXEC get_Expenses @ProfileID = ?`, [1]);
      const demographics = await db.raw(`EXEC get_Demographics @ProfileID = ?`, [1]);
      res.status(201).json({ expenses: expenses, demographics: demographics[0] });
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/expenses-03-01', async (req, res) => {
    try{
      const demographics = await db.raw(`SELECT TotalPeopleInHousehold from Demographics where ProfileID = ?`, [1]);
      const expenses = await db.raw(`EXEC get_Expenses @ProfileID = ?`, [1]);
      res.status(201).json({demographics: demographics[0], expenses: expenses});
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
      const demographics = await db.raw(`EXEC get_Demographics @ProfileID = ?`, [1]);
      const expenses = await db.raw(`EXEC get_Expenses @ProfileID = ?`, [1]);
      res.status(201).json({demographics: demographics[0], expenses: expenses});
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
  
router.get('/expenses-05-01', async (req, res) => {
    try{
      const data = await db.raw(`EXEC get_UnsecuredDebt @ProfileID = ?`, [1]);
      res.status(201).json(data);
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/expenses-06-01', async (req, res) => {
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
  
router.patch('/analysis-01-01', async (req, res) => {
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
      const data = await db.raw(`EXEC get_Profile @ProfileID = ?`, [1]);
      res.status(201).json(data[0]);
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.patch('/analysis-02-01', async (req, res) => {
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
      const data = await db.raw(`EXEC get_Savings @ProfileID = ?`, [1]);
      res.status(201).json(data[0]);
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.get('/analysis-04-01', async (req, res) => {
    try{
      const grossMonthlyIncome = await db.raw(`EXEC get_TotalGrossMonthlyIncome @ProfileID = ?`, [1]);
      const recurringMonthlyDebt = await db.raw(`EXEC get_RecurringMonthlyDebt @ProfileID = ?`, [1]);
      const totalCreditLimit = await db.raw(`EXEC get_TotalCreditLimit @ProfileID = ?`, [1]);
      const totalUnsecuredBalance = await db.raw(`EXEC get_TotalUnsecuredBalance @ProfileID = ?`, [1]);
      res.status(201).json(
        {
          grossMonthlyIncome: grossMonthlyIncome[0].TotalGrossMonthlyIncome,
          recurringMonthlyDebt: recurringMonthlyDebt[0].RecurringMonthlyDebt,
          totalCreditLimit: totalCreditLimit[0].TotalCreditLimit,
          totalUnsecuredBalance: totalUnsecuredBalance[0].TotalUnsecuredBalance
        }
      );
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.patch('/analysis-04-01', async (req, res) => {
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
      res.status(201).json({assets: assets, liabilities: liabilities});
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.patch('/analysis-05-01', async (req, res) => {
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
      res.status(201).json(
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
  
router.patch('/budget-shortfall', async (req, res) => {
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
      const result = await db.raw(`EXEC get_Goals @ProfileID = ?`, [1]);
      res.status(201).json(result[0]);
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});
  
router.patch('/analysis-07-01', async (req, res) => {
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
      `, [
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
  
router.patch('/analysis-07-02', async (req, res) => {
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
  
router.get('/analysis-08-01', async (req, res) => {
    try{
      const profile = await db.raw(`EXEC get_Profile @ProfileID = ?`, [1]);
      res.status(201).json({DebtToIncomeRatio: profile[0].DebtToIncomeRatio, CreditUtilization: profile[0].CreditUtilization});
    }catch(err: any){
      console.error(err);
      res.status(500).json({ error: 'Database error', details: err.message });
    }
});

export default router;