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

app.get('/concerns-01-01', async (req, res) => {
  try{
    const result = await db('ClientContract')
      .select(
        'ClientContract.ReferralID',
        'ClientSession.ReasonForContactID',
        'ClientSession.TotalDebtID',
        'ClientSession.ClientPaymentStatusID',
        'ClientSession.PresentingProblem',
        'ClientAssessment.PrimaryCauseToSeekCounselingID'
      )
      .leftJoin('ClientSession', 'ClientContract.ClientID', 'ClientSession.ClientID')
      .leftJoin('ClientAssessment', 'ClientContract.ClientID', 'ClientAssessment.ClientID')
      .where('ClientContract.ClientID', 10)
      .first();
    
    res.json(result || {});
  }catch(err: any){
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-01-01', async (req, res) => {
  const {
    ReferralID,
    ReasonForContactID,
    TotalDebtID,
    ClientPaymentStatusID,
    PrimaryCauseToSeekCounselingID,
    PresentingProblem,
  } = req.body;
  try {
    await db.raw('EXEC update_ClientContract @ClientID = ?, @ReferralID = ?', [10, ReferralID]);
    await db.raw(
      'EXEC update_ClientSession @ClientID = ?, @ReasonForContactID = ?, @TotalDebtID = ?, @ClientPaymentStatusID = ?, @PresentingProblem = ?',
      [10, ReasonForContactID, TotalDebtID, ClientPaymentStatusID, PresentingProblem]
    );
    await db.raw(
      'EXEC update_ClientAssessment @ClientID = ?, @PrimaryCauseToSeekCounselingID = ?',
      [10, PrimaryCauseToSeekCounselingID]
    );
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/concerns-01-02', async (req, res) => {
  try {
    const result = await db('ClientAssessment')
      .select(
        'ClientAssessment.IssueJobLoss as jobLoss',
        'ClientAssessment.IssueIncomeReduction as incomeReduction',
        'ClientAssessment.IssueMedicalExpenses as medicalDisabilities',
        'ClientAssessment.ReasonMedicalDisabilities as medicalIssuesDetails',
        'ClientAssessment.IssueUnsecuredPastDue as studentLoan',
        'ClientAssessment.reasonStruggling as studentLoanDetails',
        'ClientAssessment.IssueSecuredPastDue as accidents',
        'ClientAssessment.IssueHousingPastDue as substanceAbuse',
        'ClientAssessment.Lawsuits as lawsuits',
        'ClientAssessment.IssueHousing as housingIssues',
        'ClientAssessment.FinancialMismanagement as financialMismanagement',
        'ClientAssessment.FinancialMismanagementReason as financialMismanagementDetails',
        'ClientAssessment.MilitaryService as militaryService',
        'ClientAssessment.MilitaryServiceReason as militaryServiceDetails',
        'ClientFinancials.Illness as incarceration',
        'ClientFinancials.DeathInFamily as lossOfLovedOnes',
        'ClientFinancials.UnexpectedExpenses as unexpectedExpenses',
        'ClientFinancials.Divorce as divorce',
        'ClientFinancials.Separation as separation',
        'ClientFinancials.Pregnancy as pregnancyNewBirth',
        'ClientFinancials.StudentLoan as collectionProblems',
        'ClientFinancials.IRS as taxIssues'
      )
      .leftJoin('ClientFinancials', 'ClientAssessment.ClientID', 'ClientFinancials.ClientID')
      .where('ClientAssessment.ClientID', 10)
      .first();
    
    res.json(result || {});
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-01-02', async (req, res) => {
  const { financialIssues } = req.body;
  try {
    await db.raw(
      `EXEC update_ClientAssessment 
        @ClientID = ?,
        @IssueJobLoss = ?,
        @IssueIncomeReduction = ?,
        @IssueMedicalExpenses = ?,
        @ReasonMedicalDisabilities = ?,
        @IssueUnsecuredPastDue = ?,
        @reasonStruggling = ?,
        @IssueSecuredPastDue = ?,
        @IssueHousingPastDue = ?,
        @Lawsuits = ?,
        @IssueHousing = ?,
        @FinancialMismanagement = ?,
        @FinancialMismanagementReason = ?,
        @MilitaryService = ?,
        @MilitaryServiceReason = ?`,
      [
        10,
        financialIssues.jobLoss,
        financialIssues.incomeReduction,
        financialIssues.medicalDisabilities,
        financialIssues.medicalIssuesDetails,
        financialIssues.studentLoan,
        financialIssues.studentLoanDetails,
        financialIssues.accidents,
        financialIssues.substanceAbuse,
        financialIssues.lawsuits,
        financialIssues.housingIssues,
        financialIssues.financialMismanagement,
        financialIssues.financialMismanagementDetails,
        financialIssues.militaryService,
        financialIssues.militaryServiceDetails
      ]
    );
    await db.raw(
      `EXEC update_ClientFinancials 
        @ClientID = ?,
        @Illness = ?,
        @DeathInFamily = ?,
        @UnexpectedExpenses = ?,
        @Divorce = ?,
        @Separation = ?,
        @Pregnancy = ?,
        @StudentLoan = ?,
        @IRS = ?`,
      [
        10,
        financialIssues.incarceration,
        financialIssues.lossOfLovedOnes,
        financialIssues.unexpectedExpenses,
        financialIssues.divorce,
        financialIssues.separation,
        financialIssues.pregnancyNewBirth,
        financialIssues.collectionProblems,
        financialIssues.taxIssues,
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
    const result = await db('ClientAssessment')
      .select(
        'ClientAssessment.ResolveContactCreditors as contactingCreditors',
        'ClientAssessment.ResolveContactAttorney as contactingAttorney',
        'ClientAssessment.ResolveWorkMoreHours as workingNightsWeekends',
        'ClientAssessment.ResolveFindJob as foundBetterJob',
        'ClientAssessment.ResolveSpendLess as spendingLess',
        'ClientAssessment.ResolveCreateBudget as secondJob',
        'ClientAssessment.ResolveSellProperty as sellProperty',
        'ClientAssessment.ResolveSellOtherassets as soldAssets',
        'ClientAssessment.ResolveCallingACCC as callingACCC',
        'ClientAssessment.ResolveOther as other',
        'ClientAssessment.ActionsToHandleDebt as otherExplanation'
      )
      .where('ClientAssessment.ClientID', 10)
      .first();
    
    res.json(result || {});
  } catch (err: any) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.post('/concerns-01-03', async (req, res) => {
  const { waysToOvercome } = req.body;
  try{
    await db.raw(
      `EXEC update_ClientAssessment 
        @ClientID = ?,
        @ResolveContactCreditors = ?,
        @ResolveContactAttorney = ?,
        @ResolveWorkMoreHours = ?,
        @ResolveFindJob = ?,
        @ResolveSpendLess = ?,
        @ResolveCreateBudget = ?,
        @ResolveSellProperty = ?,
        @ResolveSellOtherassets = ?,
        @ResolveCallingACCC = ?,
        @ResolveOther = ?,
        @ActionsToHandleDebt = ?
      `,
      [
        10,
        waysToOvercome.contactingCreditors,
        waysToOvercome.contactingAttorney,
        waysToOvercome.workingNightsWeekends,
        waysToOvercome.foundBetterJob,
        waysToOvercome.spendingLess,
        waysToOvercome.secondJob,
        waysToOvercome.sellProperty,
        waysToOvercome.soldAssets,
        waysToOvercome.callingACCC,
        waysToOvercome.other,
        waysToOvercome.otherExplanation,
      ]
    );
    res.status(201).json({ success: true });
  }catch(err: any){
    console.error(err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Self Enrollment API listening on port ${port}`);
});