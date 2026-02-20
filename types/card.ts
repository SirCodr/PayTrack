import { CreditCard } from './credit-card'

export interface Card extends CreditCard {
  currentBalance: number
}

export type CardBrand = 'visa' | 'mastercard' | 'amex'

export type CardColor = 'blue' | 'dark' | 'gold' | 'teal'

export interface CardSummary {
  totalLimit: number
  totalBalance: number
  totalAvailable: number
  cardCount: number
}
