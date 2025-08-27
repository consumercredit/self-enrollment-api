import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/Concerns', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_Concerns @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/Concerns', async (req, res) => {
  const {
    TypeOfDebtID = null,
    AmountOwedID = null,
    PaymentStatusID = null,
    PrimaryHardshipID = null,
    QualityOfLifeImpact = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_Concerns 
        @ProfileID = ?,
        @TypeOfDebtID = ?,
        @AmountOwedID = ?,
        @PaymentStatusID = ?,
        @PrimaryHardshipID = ?,
        @QualityOfLifeImpact = ?
      `,
      [
        1,
        TypeOfDebtID,
        AmountOwedID,
        PaymentStatusID,
        PrimaryHardshipID,
        QualityOfLifeImpact
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/Demographics', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_Demographics @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/Demographics', async (req, res) => {
  const {
    GenderID = null,
    MaritalID = null,
    HeadOfHousehold = null,
    Adults = null,
    Children = null,
    TotalPeopleInHousehold = null,
    RaceID = null,
    EducationID = null,
    IsHispanic = null,
    OtherEducation = null,
    HousingID = null,
    OtherHousing = null,
    IsProficientInEnglish = null,
    LivesInRuralArea = null,
    HasFiledForBankruptcy = null,
    YearsUntilRetirement = null,
    CanShareInfo = null,
    LivingArrangementID = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_Demographics 
        @ProfileID = ?,
        @GenderID = ?,
        @MaritalID = ?,
        @HeadOfHousehold = ?,
        @Adults = ?,
        @Children = ?,
        @TotalPeopleInHousehold = ?,
        @RaceID = ?,
        @EducationID = ?,
        @IsHispanic = ?,
        @OtherEducation = ?,
        @HousingID = ?,
        @OtherHousing = ?,
        @IsProficientInEnglish = ?,
        @LivesInRuralArea = ?,
        @HasFiledForBankruptcy = ?,
        @YearsUntilRetirement = ?,
        @CanShareInfo = ?,
        @LivingArrangementID = ?
      `,
      [
        1,
        GenderID,
        MaritalID,
        HeadOfHousehold,
        Adults,
        Children,
        TotalPeopleInHousehold,
        RaceID,
        EducationID,
        IsHispanic,
        OtherEducation,
        HousingID,
        OtherHousing,
        IsProficientInEnglish,
        LivesInRuralArea,
        HasFiledForBankruptcy,
        YearsUntilRetirement,
        CanShareInfo,
        LivingArrangementID
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/Employment', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_Employment @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/Employment', async (req, res) => {
  const {
    EmploymentID = null,
    TypeOfWork = null,
    DoesSideWork = null,
    MilitaryID = null,
    PlanToLeaveMilitary = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_Employment 
        @ProfileID = ?,
        @EmploymentID = ?,
        @TypeOfWork = ?,
        @DoesSideWork = ?,
        @MilitaryID = ?,
        @PlanToLeaveMilitary = ?
      `,
      [
        1,
        EmploymentID,
        TypeOfWork,
        DoesSideWork,
        MilitaryID,
        PlanToLeaveMilitary
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/Expenses', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_Expenses @ProfileID = ?`, [1]);
    res.status(201).json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/Expenses', async (req, res) => {
  const {
    Section = null,
    PayPeriodID = null,
    Amount = null,
    Comment = null,
    Category = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_Expenses 
        @ProfileID = ?,
        @Section = ?,
        @PayPeriodID = ?,
        @Amount = ?,
        @Comment = ?,
        @Category = ?
      `,
      [
        1,
        Section,
        PayPeriodID,
        Amount,
        Comment,
        Category
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/Goals', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_Goals @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/Goals', async (req, res) => {
  const {
    PurchaseHome = null,
    SaveForRetirement = null,
    ContinueEducation = null,
    HaveEmergencySavings = null,
    FinanceChildsEducation = null,
    PayOffCollegeLoans = null,
    MakeHomeImprovements = null,
    BuyVacationHome = null,
    PurchaseNewVehicle = null,
    SavingForFuneral = null,
    HaveLifeInsurance = null,
    PayOffMortgage = null,
    Other = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_Goals 
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
        @Other = ?
      `,
      [
        1,
        PurchaseHome,
        SaveForRetirement,
        ContinueEducation,
        HaveEmergencySavings,
        FinanceChildsEducation,
        PayOffCollegeLoans,
        MakeHomeImprovements,
        BuyVacationHome,
        PurchaseNewVehicle,
        SavingForFuneral,
        HaveLifeInsurance,
        PayOffMortgage,
        Other
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/Habits', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_Habits @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/Habits', async (req, res) => {
  const {
    OnlyWorryAboutToday = null,
    KeepUpWithJoneses = null,
    BuyBasedOnNeeds = null,
    InfluencedBySuggestions = null,
    ShoppingMakesMeFeelBetter = null,
    BuyOnImpulse = null,
    SpendToRetaliate = null,
    CreditCardsToSupplementIncome = null,
    Other = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_Habits 
        @ProfileID = ?,
        @OnlyWorryAboutToday = ?,
        @KeepUpWithJoneses = ?,
        @BuyBasedOnNeeds = ?,
        @InfluencedBySuggestions = ?,
        @ShoppingMakesMeFeelBetter = ?,
        @BuyOnImpulse = ?,
        @SpendToRetaliate = ?,
        @CreditCardsToSupplementIncome = ?,
        @Other = ?
      `,
      [
        1,
        OnlyWorryAboutToday,
        KeepUpWithJoneses,
        BuyBasedOnNeeds,
        InfluencedBySuggestions,
        ShoppingMakesMeFeelBetter,
        BuyOnImpulse,
        SpendToRetaliate,
        CreditCardsToSupplementIncome,
        Other
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/Issues', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_Issues @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/Issues', async (req, res) => {
  const {
    JobLoss = null,
    IncomeReduction = null,
    Medical = null,
    MedicalDescription = null,
    StudentLoan = null,
    StudentLoanDescription = null,
    Accidents = null,
    SubstanceAbuse = null,
    Incarceration = null,
    LossOfLovedOnes = null,
    UnexpectedExpenses = null,
    Divorce = null,
    Separation = null,
    Pregnancy = null,
    CollectionProblems = null,
    TaxIssues = null,
    Lawsuits = null,
    HousingIssues = null,
    FinancialMismanagement = null,
    FinancialMismanagementDescription = null,
    MilitaryService = null,
    MilitaryServiceDescription = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_Issues 
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
        @MilitaryServiceDescription = ?
      `,
      [
        1,
        JobLoss,
        IncomeReduction,
        Medical,
        MedicalDescription,
        StudentLoan,
        StudentLoanDescription,
        Accidents,
        SubstanceAbuse,
        Incarceration,
        LossOfLovedOnes,
        UnexpectedExpenses,
        Divorce,
        Separation,
        Pregnancy,
        CollectionProblems,
        TaxIssues,
        Lawsuits,
        HousingIssues,
        FinancialMismanagement,
        FinancialMismanagementDescription,
        MilitaryService,
        MilitaryServiceDescription
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/OtherIncome', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_OtherIncome @ProfileID = ?`, [1]);
    res.status(201).json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/OtherIncome', async (req, res) => {
  const {
    Section = null,
    PayPeriodID = null,
    Amount = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_OtherIncome 
        @ProfileID = ?,
        @Section = ?,
        @PayPeriodID = ?,
        @Amount = ?
      `,
      [
        1,
        Section,
        PayPeriodID,
        Amount
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/Profile', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_Profile @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/Profile', async (req, res) => {
  const {
    CounselingClientID = null,
    FirstName = null,
    LastName = null,
    Email = null,
    Phone = null,
    HasPartner = null,
    ConsentToTexts = null,
    HowDidYouHearAboutUsID = null,
    NumberOfPeopleResponsibleFor = null,
    DateOfBirth = null,
    DoYouHaveIncome = null,
    DoYouHaveSavings = null,
    DoYouFeelConfident = null,
    EmailBudgetWorksheet = null,
    MailBudgetWorksheet = null,
    NetWorth = null,
    DebtToIncomeRatio = null,
    CreditUtilization = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_Profile 
        @ProfileID = ?,
        @CounselingClientID = ?,
        @FirstName = ?,
        @LastName = ?,
        @Email = ?,
        @Phone = ?,
        @HasPartner = ?,
        @ConsentToTexts = ?,
        @HowDidYouHearAboutUsID = ?,
        @NumberOfPeopleResponsibleFor = ?,
        @DateOfBirth = ?,
        @DoYouHaveIncome = ?,
        @DoYouHaveSavings = ?,
        @DoYouFeelConfident = ?,
        @EmailBudgetWorksheet = ?,
        @MailBudgetWorksheet = ?,
        @NetWorth = ?,
        @DebtToIncomeRatio = ?,
        @CreditUtilization = ?
      `,
      [
        1,
        CounselingClientID,
        FirstName,
        LastName,
        Email,
        Phone,
        HasPartner,
        ConsentToTexts,
        HowDidYouHearAboutUsID,
        NumberOfPeopleResponsibleFor,
        DateOfBirth,
        DoYouHaveIncome,
        DoYouHaveSavings,
        DoYouFeelConfident,
        EmailBudgetWorksheet,
        MailBudgetWorksheet,
        NetWorth,
        DebtToIncomeRatio,
        CreditUtilization
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/Savings', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_Savings @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/Savings', async (req, res) => {
  const {
    Savings = null,
    Cash = null,
    RetirementAccounts = null,
    Stocks = null,
    Cryptocurrency = null,
    Bonds = null,
    LifeInsurance = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_Savings 
        @ProfileID = ?,
        @Savings = ?,
        @Cash = ?,
        @RetirementAccounts = ?,
        @Stocks = ?,
        @Cryptocurrency = ?,
        @Bonds = ?,
        @LifeInsurance = ?
      `,
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
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/SecuredDebt', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_SecuredDebt @ProfileID = ?`, [1]);
    res.status(201).json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/SecuredDebt', async (req, res) => {
  const {
    TypeID = null,
    MonthlyPayment = null,
    AccountHolderID = null,
    StatusID = null,
    CurrentValue = null,
    BalanceOwed = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_SecuredDebt 
        @ProfileID = ?,
        @TypeID = ?,
        @MonthlyPayment = ?,
        @AccountHolderID = ?,
        @StatusID = ?,
        @CurrentValue = ?,
        @BalanceOwed = ?
      `,
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

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/SideWork', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_SideWork @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/SideWork', async (req, res) => {
  const {
    Zip = null,
    Employees = null,
    YearsEmployed = null,
    TypeOfBusinessID = null,
    RevenueID = null,
    TypeOfBusinessOther = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_SideWork 
        @ProfileID = ?,
        @Zip = ?,
        @Employees = ?,
        @YearsEmployed = ?,
        @TypeOfBusinessID = ?,
        @RevenueID = ?,
        @TypeOfBusinessOther = ?
      `,
      [
        1,
        Zip,
        Employees,
        YearsEmployed,
        TypeOfBusinessID,
        RevenueID,
        TypeOfBusinessOther
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/UnsecuredDebt', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_UnsecuredDebt @ProfileID = ?`, [1]);
    res.status(201).json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/UnsecuredDebt', async (req, res) => {
  const {
    CreditorID = null,
    DebtTypeID = null,
    AccountNumber = null,
    Balance = null,
    CreditLimit = null,
    MonthlyPayment = null,
    OtherCreditor = null,
    InterestRate = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_UnsecuredDebt 
        @ProfileID = ?,
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

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/WaysToOvercome', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_WaysToOvercome @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/WaysToOvercome', async (req, res) => {
  const {
    CallingACCC = null,
    ContactedCreditors = null,
    ContactedAttorney = null,
    WorkingNightsWeekends = null,
    FoundBetterJob = null,
    SpendingLess = null,
    SecondJob = null,
    SellProperty = null,
    SoldOtherAssets = null,
    Other = null,
    OtherDescription = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_WaysToOvercome 
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
        @OtherDescription = ?
      `,
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

router.get('/WaysToTrimBudget', async (req, res) => {
  try{
    const data = await db.raw(`EXEC get_WaysToTrimBudget @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/WaysToTrimBudget', async (req, res) => {
  const {
    CookAtHome = null,
    PackLunch = null,
    BatchCook = null,
    BuySeasonalProduce = null,
    PlanMealsAroundSales = null,
    UseCoupons = null,
    ThinkBeforeBuy = null,
    MaximizeWardrobe = null,
    EasyCareClothing = null,
    SaveHaircuts = null,
    DitchGym = null,
    ShopSecondhand = null,
    RefinanceMortgage = null,
    IncreaseDeductibles = null,
    GetRoommate = null,
    CutTV = null,
    UpgradeAppliances = null,
    UseSmartThermostat = null,
    UnplugElectronics = null,
    ConserveWater = null,
    CompareHomeInsurance = null,
    UseUtilityAssistance = null,
    UsePublicTransit = null,
    Carpool = null,
    DriveLess = null,
    MaintainVehicle = null,
    RefinanceCar = null,
    ShopForCarInsurance = null,
    UseFuelRewards = null,
    BikeOrWalk = null,
    SwitchToFuelEfficientVehicle = null,
    WorkFromHome = null,
    GenericMedications = null,
    LowCostClinics = null,
    UseUrgentCare = null,
    AskForCashDiscounts = null,
    ReviewHospitalBills = null,
    TrackInsuranceClaims = null
  } = req.body;

  try {
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
        @ShopSecondhand = ?,
        @RefinanceMortgage = ?,
        @IncreaseDeductibles = ?,
        @GetRoommate = ?,
        @CutTV = ?,
        @UpgradeAppliances = ?,
        @UseSmartThermostat = ?,
        @UnplugElectronics = ?,
        @ConserveWater = ?,
        @CompareHomeInsurance = ?,
        @UseUtilityAssistance = ?,
        @UsePublicTransit = ?,
        @Carpool = ?,
        @DriveLess = ?,
        @MaintainVehicle = ?,
        @RefinanceCar = ?,
        @ShopForCarInsurance = ?,
        @UseFuelRewards = ?,
        @BikeOrWalk = ?,
        @SwitchToFuelEfficientVehicle = ?,
        @WorkFromHome = ?,
        @GenericMedications = ?,
        @LowCostClinics = ?,
        @UseUrgentCare = ?,
        @AskForCashDiscounts = ?,
        @ReviewHospitalBills = ?,
        @TrackInsuranceClaims = ?
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
      ShopSecondhand,
      RefinanceMortgage,
      IncreaseDeductibles,
      GetRoommate,
      CutTV,
      UpgradeAppliances,
      UseSmartThermostat,
      UnplugElectronics,
      ConserveWater,
      CompareHomeInsurance,
      UseUtilityAssistance,
      UsePublicTransit,
      Carpool,
      DriveLess,
      MaintainVehicle,
      RefinanceCar,
      ShopForCarInsurance,
      UseFuelRewards,
      BikeOrWalk,
      SwitchToFuelEfficientVehicle,
      WorkFromHome,
      GenericMedications,
      LowCostClinics,
      UseUrgentCare,
      AskForCashDiscounts,
      ReviewHospitalBills,
      TrackInsuranceClaims
    ]);

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/YourIncome', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_YourIncome @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/YourIncome', async (req, res) => {
  const {
    PayPeriodID = null,
    GrossIncome = null,
    NetIncome = null,
    OtherDeductions = null,
    WagesGarnished = null,
    PayrollDeductions = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_YourIncome 
        @ProfileID = ?,
        @PayPeriodID = ?,
        @GrossIncome = ?,
        @NetIncome = ?,
        @OtherDeductions = ?,
        @WagesGarnished = ?,
        @PayrollDeductions = ?
      `,
      [
        1,
        PayPeriodID,
        GrossIncome,
        NetIncome,
        OtherDeductions,
        WagesGarnished,
        PayrollDeductions
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/YourPartnersIncome', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_YourPartnersIncome @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/YourPartnersIncome', async (req, res) => {
  const {
    PayPeriodID = null,
    GrossIncome = null,
    NetIncome = null,
    PayrollDeductions = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_YourPartnersIncome 
        @ProfileID = ?,
        @PayPeriodID = ?,
        @GrossIncome = ?,
        @NetIncome = ?,
        @PayrollDeductions = ?
      `,
      [
        1,
        PayPeriodID,
        GrossIncome,
        NetIncome,
        PayrollDeductions
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/YourSavingsIncome', async (req, res) => {
  try {
    const data = await db.raw(`EXEC get_YourSavingsIncome @ProfileID = ?`, [1]);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.patch('/YourSavingsIncome', async (req, res) => {
  const {
    HowLongUseSavings = null,
    HowLongUseSavingsPeriodID = null,
    SavingsAmount = null,
    GrossMonthlySavingsIncome = null
  } = req.body;

  try {
    await db.raw(
      `
      EXEC update_YourSavingsIncome 
        @ProfileID = ?,
        @HowLongUseSavings = ?,
        @HowLongUseSavingsPeriodID = ?,
        @SavingsAmount = ?,
        @GrossMonthlySavingsIncome = ?
      `,
      [
        1,
        HowLongUseSavings,
        HowLongUseSavingsPeriodID,
        SavingsAmount,
        GrossMonthlySavingsIncome
      ]
    );

    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

export default router;