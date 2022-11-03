export interface IBankAccountSummary {
  totalBankAndCashAmount: number,
  bankAndCashList: IBankCashList[]
}

export interface IBankCashList {
  name: string
  amount: number
}
