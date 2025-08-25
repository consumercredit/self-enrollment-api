export interface NetWorthItem {
    RowID?: number;
    Category: string;
    name: string;
    value: number;
}

export interface ExpenseItem {
    RowID?: number;
    Category?: string;
    Section: string,
    Amount: number,
    PayPeriodID: number,
    Comment: string
}

export interface IncomeItem {
    RowID?: number;
    Section: string;
    Amount: number;
    PayPeriodID: number;
}