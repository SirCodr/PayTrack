export interface Purchase {
  id: string
  cardId: string
  description: string
  amount: number
  installments: number
  interestRate: number
  date: string
  firstChargeDate: string
}

export interface PeriodInstallment {
  purchaseId: string
  purchase: Purchase
  installmentNumber: number
  totalInstallments: number
  installmentAmount: number
  principalAmount: number
  interestAmount: number
  remainingBalance: number
}

export interface BillingPeriod {
  id: string
  label: string
  startDate: string
  endDate: string
  installments: PeriodInstallment[]
  totalPeriod: number
  isCurrent: boolean
}
