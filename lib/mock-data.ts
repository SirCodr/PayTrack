import type { Card } from '@/types/card'

export const mockCards: Card[] = [
  {
    id: 'card-1',
    name: 'BBVA Platinum',
    limit: 85000,
    interestRate: 1.87,
    cutoffDate: 15,
    payDate: 30,
    currentBalance: 23450.75
  },
  {
    id: 'card-2',
    name: 'Banorte Oro',
    cutoffDate: 22,
    payDate: 7,
    limit: 120000,
    currentBalance: 67890.5,
    interestRate: 1.84
  }
]
