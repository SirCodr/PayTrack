export interface Purchase {
  id: string
  cardId: string
  description: string
  category: PurchaseCategory
  totalAmount: number
  installments: number
  interestRate: number
  purchaseDate: string
  firstChargeDate: string
}

export type PurchaseCategory =
  | 'hogar'
  | 'electronica'
  | 'ropa'
  | 'alimentos'
  | 'viajes'
  | 'entretenimiento'
  | 'salud'
  | 'servicios'
  | 'otros'

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
