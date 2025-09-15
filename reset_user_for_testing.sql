-- =====================================================================
-- STORED PROCEDURE: Reset User Data for Testing
-- =====================================================================
-- This stored procedure resets a user to new state for testing purposes
-- WARNING: Only use in development/testing environments!
-- =====================================================================

CREATE OR ALTER PROCEDURE [dbo].[reset_UserForTesting]
    @ProfileID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Validate ProfileID exists
    IF NOT EXISTS (SELECT 1 FROM Profile WHERE ProfileID = @ProfileID)
    BEGIN
        RAISERROR('ProfileID %d does not exist', 16, 1, @ProfileID);
        RETURN;
    END
    
    BEGIN TRANSACTION ResetUser;
    
    BEGIN TRY
        -- Delete all related form data
        DELETE FROM WaysToOvercome WHERE ProfileID = @ProfileID;
        DELETE FROM Issues WHERE ProfileID = @ProfileID;
        DELETE FROM Concerns WHERE ProfileID = @ProfileID;
        DELETE FROM Demographics WHERE ProfileID = @ProfileID;
        DELETE FROM Employment WHERE ProfileID = @ProfileID;
        DELETE FROM SideWork WHERE ProfileID = @ProfileID;
        DELETE FROM Goals WHERE ProfileID = @ProfileID;
        DELETE FROM Habits WHERE ProfileID = @ProfileID;
        DELETE FROM WaysToTrimBudget WHERE ProfileID = @ProfileID;
        DELETE FROM YourIncome WHERE ProfileID = @ProfileID;
        DELETE FROM YourPartnersIncome WHERE ProfileID = @ProfileID;
        DELETE FROM YourSavingsIncome WHERE ProfileID = @ProfileID;
        DELETE FROM OtherIncome WHERE ProfileID = @ProfileID;
        DELETE FROM Expenses WHERE ProfileID = @ProfileID;
        DELETE FROM SecuredDebt WHERE ProfileID = @ProfileID;
        DELETE FROM UnsecuredDebt WHERE ProfileID = @ProfileID;
        DELETE FROM Savings WHERE ProfileID = @ProfileID;
        
        -- Reset Profile table to new user state
        UPDATE Profile 
        SET 
            -- Reset progress tracking
            FurthestPage = '/intro',
            
            -- Clear name fields for testing
            FirstName = NULL,
            LastName = NULL,
            
            -- Clear counseling client ID
            CounselingClientID = NULL,
            
            -- Clear form data but keep email for login
            HasPartner = NULL,
            ConsentToTexts = NULL,
            HowDidYouHearAboutUsID = NULL,
            NumberOfPeopleResponsibleFor = NULL,
            DateOfBirth = NULL,
            DoYouHaveIncome = NULL,
            DoYouHaveSavings = NULL,
            DoYouFeelConfident = NULL,
            EmailBudgetWorksheet = NULL,
            MailBudgetWorksheet = NULL,
            NetWorth = NULL,
            DebtToIncomeRatio = NULL,
            CreditUtilization = NULL,
            
            -- Clear contact preferences
            Phone = NULL,
            
            -- Update timestamp
            UpdatedDate = GETDATE()
            
        WHERE ProfileID = @ProfileID;
        
        COMMIT TRANSACTION ResetUser;
        
        -- Return success message
        SELECT 
            'SUCCESS' AS Status,
            'User reset to new state' AS Message,
            @ProfileID AS ProfileID,
            '/intro' AS NewFurthestPage;
            
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION ResetUser;
        
        -- Return error information
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorNumber INT = ERROR_NUMBER();
        
        RAISERROR('Failed to reset user: %s (Error %d)', 16, 1, @ErrorMessage, @ErrorNumber);
        
    END CATCH;
END;

-- Grant execute permissions (adjust as needed for your environment)
-- GRANT EXECUTE ON [dbo].[reset_UserForTesting] TO [your_api_user];
