export interface Card {
  id: string
  name: string
  cutDate: number // dia del mes (1-31)
  payDate: number // dia del mes (auto-calculado: cutDate + 15)
  limit: number // limite de credito
  currentBalance: number // saldo actual utilizado
  brand: CardBrand
  color: CardColor
  lastFourDigits: string
}

export type CardBrand = 'visa' | 'mastercard' | 'amex'

export type CardColor = 'blue' | 'dark' | 'gold' | 'teal'

export interface CardSummary {
  totalLimit: number
  totalBalance: number
  totalAvailable: number
  cardCount: number
}
