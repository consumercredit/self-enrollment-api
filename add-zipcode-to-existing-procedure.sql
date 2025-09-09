-- Add ZipCode parameter to existing update_Profile stored procedure
-- This preserves all your existing logic and just adds ZipCode support

USE [acccAzure]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Alex Westcott
-- Create date: 7-28-2025
-- Description:	Updated to include ZipCode parameter
-- =============================================
ALTER PROCEDURE [dbo].[update_Profile]
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
	@ZipCode varchar(5) = null
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
		ZipCode = ISNULL(@ZipCode, ZipCode)
	WHERE ProfileID = @ProfileID

	if(@ConsentToTexts is not null and @ConsentToTexts = 0)
		begin
			update Profile set Phone = null where ProfileID = @ProfileID
		end

	if(@HasPartner is not null)
		begin
			if(@HasPartner = 0)
				begin
					delete from YourPartnersIncome where ProfileID = @ProfileID
				end
			else if(@HasPartner = 1)
				begin
					if not exists(select * from YourPartnersIncome where ProfileID = @ProfileID)
						begin
							insert into YourPartnersIncome (ProfileID) values (@ProfileID)
						end
				end
		end

	if(@DoYouHaveIncome is not null)
		begin
			if(@DoYouHaveIncome = 0)
				begin
					delete from YourIncome where ProfileID = @ProfileID
				end
			else if(@DoYouHaveIncome = 1)
				begin
					delete from YourSavingsIncome where ProfileID = @ProfileID

					if not exists(select * from YourIncome where ProfileID = @ProfileID)
						begin
							insert into YourIncome (ProfileID) values (@ProfileID)
						end

					update Profile set DoYouHaveSavings = null where ProfileID = @ProfileID
				end
		end

	if(@DoYouHaveSavings is not null)
		begin
			if(@DoYouHaveSavings = 0)
				begin
					delete from YourSavingsIncome where ProfileID = @ProfileID
				end
			else if(@DoYouHaveSavings = 1)
				begin
					if not exists(select * from YourSavingsIncome where ProfileID = @ProfileID)
						begin
							insert into YourSavingsIncome (ProfileID) values (@ProfileID)
						end
				end
		end

	if(@EmailBudgetWorksheet is not null)
		begin
			if(@EmailBudgetWorksheet = 0)
				begin
					update Profile set MailBudgetWorksheet = null where ProfileID = @ProfileID
				end
		end
END
