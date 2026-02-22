export interface CreditCard {
  id: string
  name: string
  limit: number
  cutoffDate: number
  payDate: number
  currentBalance: number
  createdAt: string
}

export interface CardSummary {
  totalLimit: number
  totalBalance: number
  totalAvailable: number
  cardCount: number
}
