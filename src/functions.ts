import { db } from "./app";
import type { NetWorthItem, ExpenseItem, IncomeItem } from './types';

export const updateExpense = async (expense: ExpenseItem) => {
  await db.raw(`EXEC 
    update_Expenses 
    @RowID = ?,
    @PayPeriodID = ?,
    @Amount = ?, 
    @Comment = ?`, 
    [
      expense.RowID,
      expense.PayPeriodID,
      expense.Amount,
      expense.Comment
    ]
  );
}
  
export const updateOtherIncome = async (income: IncomeItem) => {
  await db.raw(`EXEC insert_OtherIncome 
    @ProfileID = ?, 
    @Section = ?, 
    @PayPeriodID = ?, 
    @Amount = ?`, 
    [
      1,
      income.Section,
      income.PayPeriodID,
      income.Amount
    ]
  );
}

export const updateNetWorthItem = async (item: NetWorthItem, profileID: number, type: string) => {
  if(type === 'asset'){
    if(item.Category === 'Secured'){
      await db.raw(`EXEC update_SecuredDebt @RowID = ?, @CurrentValue = ?`, [item.RowID, item.value]);
    }else if(item.Category === 'Savings'){
      const noSpaceName = item.name.replace(' ', '');
      await db.raw(`EXEC update_Savings @ProfileID = ?, @${noSpaceName} = ?`, [profileID, item.value]);
    }
  }else if(type === 'liability'){
    await db.raw(`EXEC update_SecuredDebt @RowID = ?, @BalanceOwed = ?`, [item.RowID, item.value]);
  }
}