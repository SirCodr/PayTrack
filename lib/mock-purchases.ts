import type { Purchase } from '@/types/purchase'

export const mockPurchases: Purchase[] = [
  // --- Compras de BBVA Platinum (card-1, corte dia 15) ---
  {
    id: 'purchase-1',
    cardId: 'card-1',
    description: 'Liverpool - Sala de piel',
    category: 'hogar',
    totalAmount: 18000,
    installments: 6,
    interestRate: 0.0199,
    purchaseDate: '2025-11-20',
    firstChargeDate: '2025-12-15'
  },
  {
    id: 'purchase-2',
    cardId: 'card-1',
    description: 'Amazon - MacBook Air M4',
    category: 'electronica',
    totalAmount: 28999,
    installments: 12,
    interestRate: 0.0199,
    purchaseDate: '2025-10-05',
    firstChargeDate: '2025-11-15'
  },
  {
    id: 'purchase-3',
    cardId: 'card-1',
    description: 'Costco - Despensa mensual',
    category: 'alimentos',
    totalAmount: 3450.75,
    installments: 1,
    interestRate: 0,
    purchaseDate: '2026-02-01',
    firstChargeDate: '2026-02-15'
  },
  {
    id: 'purchase-4',
    cardId: 'card-1',
    description: 'Volaris - Vuelo Cancun',
    category: 'viajes',
    totalAmount: 8500,
    installments: 3,
    interestRate: 0.0199,
    purchaseDate: '2026-01-10',
    firstChargeDate: '2026-02-15'
  },

  // --- Compras de Banorte Oro (card-2, corte dia 22) ---
  {
    id: 'purchase-5',
    cardId: 'card-2',
    description: 'Palacio de Hierro - Traje formal',
    category: 'ropa',
    totalAmount: 15600,
    installments: 6,
    interestRate: 0.0165,
    purchaseDate: '2025-12-01',
    firstChargeDate: '2025-12-22'
  },
  {
    id: 'purchase-6',
    cardId: 'card-2',
    description: 'Best Buy - Pantalla 65 pulgadas',
    category: 'electronica',
    totalAmount: 22499,
    installments: 12,
    interestRate: 0.0165,
    purchaseDate: '2025-11-15',
    firstChargeDate: '2025-12-22'
  },
  {
    id: 'purchase-7',
    cardId: 'card-2',
    description: 'Farmacia San Pablo - Medicamentos',
    category: 'salud',
    totalAmount: 1890.5,
    installments: 1,
    interestRate: 0,
    purchaseDate: '2026-02-05',
    firstChargeDate: '2026-02-22'
  },
  {
    id: 'purchase-8',
    cardId: 'card-2',
    description: 'Cinepolis - Membresia anual',
    category: 'entretenimiento',
    totalAmount: 4200,
    installments: 3,
    interestRate: 0.0165,
    purchaseDate: '2026-01-20',
    firstChargeDate: '2026-02-22'
  }
]

export function getPurchasesByCardId(cardId: string): Purchase[] {
  return mockPurchases.filter((p) => p.cardId === cardId)
}
