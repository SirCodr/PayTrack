import type { Card } from '@/types/card'

export const mockCards: Card[] = [
  {
    id: 'card-1',
    name: 'BBVA Platinum',
    cutDate: 15,
    payDate: 30,
    limit: 85000,
    currentBalance: 23450.75,
    brand: 'visa',
    color: 'blue',
    lastFourDigits: '4532'
  },
  {
    id: 'card-2',
    name: 'Banorte Oro',
    cutDate: 22,
    payDate: 7,
    limit: 120000,
    currentBalance: 67890.5,
    brand: 'mastercard',
    color: 'gold',
    lastFourDigits: '8791'
  }
]
