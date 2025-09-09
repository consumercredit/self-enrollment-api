-- Update the update_Profile stored procedure to include ZipCode parameter
-- Run this script as db_owner on your SQL Server database

PRINT 'Updating update_Profile stored procedure to include ZipCode parameter...';

-- Drop and recreate the stored procedure with ZipCode parameter
DROP PROCEDURE IF EXISTS update_Profile;

CREATE PROCEDURE [dbo].[update_Profile]
    @ProfileID int,
    @FirstName varchar(50) = null,
    @LastName varchar(100) = null,
    @Email varchar(254) = null,
    @Phone varchar(20) = null,
    @DateOfBirth date = null,
    @HasPartner bit = null,
    @ConsentToTexts bit = null,
    @HowDidYouHearAboutUsID int = null,
    @NumberOfPeopleResponsibleFor int = null,
    @DoYouHaveIncome bit = null,
    @DoYouHaveSavings bit = null,
    @DoYouFeelConfident bit = null,
    @EmailBudgetWorksheet bit = null,
    @MailBudgetWorksheet bit = null,
    @NetWorth int = null,
    @DebtToIncomeRatio int = null,
    @CreditUtilization int = null,
    @FurthestPage varchar(75) = null,
    @ZipCode varchar(5) = null,
    @Auth0UserId varchar(255) = null,
    @LastLoginDate datetime2 = null
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Profile 
    SET 
        UpdatedDate = SYSDATETIME(),
        FirstName = ISNULL(@FirstName, FirstName),
        LastName = ISNULL(@LastName, LastName),
        Email = ISNULL(@Email, Email),
        Phone = ISNULL(@Phone, Phone),
        DateOfBirth = ISNULL(@DateOfBirth, DateOfBirth),
        HasPartner = ISNULL(@HasPartner, HasPartner),
        ConsentToTexts = ISNULL(@ConsentToTexts, ConsentToTexts),
        HowDidYouHearAboutUsID = ISNULL(@HowDidYouHearAboutUsID, HowDidYouHearAboutUsID),
        NumberOfPeopleResponsibleFor = ISNULL(@NumberOfPeopleResponsibleFor, NumberOfPeopleResponsibleFor),
        DoYouHaveIncome = ISNULL(@DoYouHaveIncome, DoYouHaveIncome),
        DoYouHaveSavings = ISNULL(@DoYouHaveSavings, DoYouHaveSavings),
        DoYouFeelConfident = ISNULL(@DoYouFeelConfident, DoYouFeelConfident),
        EmailBudgetWorksheet = ISNULL(@EmailBudgetWorksheet, EmailBudgetWorksheet),
        MailBudgetWorksheet = ISNULL(@MailBudgetWorksheet, MailBudgetWorksheet),
        NetWorth = ISNULL(@NetWorth, NetWorth),
        DebtToIncomeRatio = ISNULL(@DebtToIncomeRatio, DebtToIncomeRatio),
        CreditUtilization = ISNULL(@CreditUtilization, CreditUtilization),
        FurthestPage = ISNULL(@FurthestPage, FurthestPage),
        ZipCode = ISNULL(@ZipCode, ZipCode),
        Auth0UserId = ISNULL(@Auth0UserId, Auth0UserId),
        LastLoginDate = ISNULL(@LastLoginDate, LastLoginDate)
    WHERE ProfileID = @ProfileID;
    
    -- If no profile exists, create one
    IF @@ROWCOUNT = 0
    BEGIN
        INSERT INTO Profile (
            ProfileID, FirstName, LastName, Email, Phone, DateOfBirth, 
            HasPartner, ConsentToTexts, HowDidYouHearAboutUsID, 
            NumberOfPeopleResponsibleFor, DoYouHaveIncome, DoYouHaveSavings,
            DoYouFeelConfident, EmailBudgetWorksheet, MailBudgetWorksheet,
            NetWorth, DebtToIncomeRatio, CreditUtilization, FurthestPage,
            ZipCode, Auth0UserId, LastLoginDate, CreatedDate, UpdatedDate
        )
        VALUES (
            @ProfileID, @FirstName, @LastName, @Email, @Phone, @DateOfBirth,
            @HasPartner, @ConsentToTexts, @HowDidYouHearAboutUsID,
            @NumberOfPeopleResponsibleFor, @DoYouHaveIncome, @DoYouHaveSavings,
            @DoYouFeelConfident, @EmailBudgetWorksheet, @MailBudgetWorksheet,
            @NetWorth, @DebtToIncomeRatio, @CreditUtilization, @FurthestPage,
            @ZipCode, @Auth0UserId, @LastLoginDate, GETDATE(), SYSDATETIME()
        );
    END
END

PRINT 'SUCCESS: update_Profile stored procedure updated with ZipCode, Auth0UserId, and LastLoginDate parameters';
PRINT 'The procedure now supports all profile page fields and Auth0 integration';
PRINT '';
PRINT 'Profile page will now properly save and recall:';
PRINT '  - First Name';
PRINT '  - Last Name';  
PRINT '  - Phone Number';
PRINT '  - Zip Code';
PRINT '  - Text Message Consent';
PRINT '  - Auth0 User ID';
PRINT '  - Last Login Date';
