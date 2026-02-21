export interface CreditCard {
  id: string
  name: string
  limit: number
  interestRate: number
  cutoffDate: string
  payDate: string
  currentBalance: number
  createdAt: string
}

export interface CardSummary {
  totalLimit: number
  totalBalance: number
  totalAvailable: number
  cardCount: number
}
