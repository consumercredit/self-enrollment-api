import { Router } from 'express';
import { db } from '../app';

const router = Router();

router.get('/WaysToTrimBudget', async (req, res) => {
  try{
    const data = await db.raw(`EXEC get_WaysToTrimBudget @ProfileID = ?`, [1]);
    res.status(200).json(data[0]);
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

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

export default router;