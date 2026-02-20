import type {
  Purchase,
  PeriodInstallment,
  BillingPeriod
} from '@/types/purchase'

interface AmortizationRow {
  installmentNumber: number
  principal: number
  interest: number
  payment: number
  remainingBalance: number
}

/**
 * Genera tabla de amortizacion sobre saldo decreciente.
 * Principal fijo = total / cuotas
 * Interes = saldo_pendiente * tasa_mensual
 */
export function generateAmortizationSchedule(
  purchase: Purchase
): AmortizationRow[] {
  const { totalAmount, installments, interestRate } = purchase
  const rows: AmortizationRow[] = []
  const principalFixed = totalAmount / installments
  let remaining = totalAmount

  for (let i = 1; i <= installments; i++) {
    const interest = remaining * interestRate
    const payment = principalFixed + interest
    remaining -= principalFixed

    rows.push({
      installmentNumber: i,
      principal: Math.round(principalFixed * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      payment: Math.round(payment * 100) / 100,
      remainingBalance: Math.max(0, Math.round(remaining * 100) / 100)
    })
  }

  return rows
}

/**
 * Genera los periodos de facturacion para una tarjeta y distribuye las cuotas.
 * Mira 12 meses hacia atras y 12 hacia adelante desde la fecha actual.
 */
export function generateBillingPeriods(
  cutDate: number,
  purchases: Purchase[]
): BillingPeriod[] {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  // Generar periodos: 3 meses atras + 9 meses adelante
  const periods: BillingPeriod[] = []

  for (let offset = -3; offset <= 9; offset++) {
    const monthDate = new Date(currentYear, currentMonth + offset, 1)
    const year = monthDate.getFullYear()
    const month = monthDate.getMonth()

    const endDate = new Date(year, month, cutDate)
    const startDate = new Date(year, month - 1, cutDate + 1)

    const isCurrent = now >= startDate && now <= endDate

    const label = new Intl.DateTimeFormat('es-MX', {
      month: 'long',
      year: 'numeric'
    }).format(endDate)

    periods.push({
      id: `period-${year}-${String(month + 1).padStart(2, '0')}`,
      label: label.charAt(0).toUpperCase() + label.slice(1),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      installments: [],
      totalPeriod: 0,
      isCurrent
    })
  }

  // Distribuir cuotas de cada compra en los periodos correspondientes
  for (const purchase of purchases) {
    const schedule = generateAmortizationSchedule(purchase)
    const firstCharge = new Date(purchase.firstChargeDate)

    for (const row of schedule) {
      // La cuota N cae en el mes N-1 despues del primer cargo
      const chargeMonth = new Date(
        firstCharge.getFullYear(),
        firstCharge.getMonth() + (row.installmentNumber - 1),
        firstCharge.getDate()
      )

      // Buscar el periodo que contiene esta fecha
      const period = periods.find((p) => {
        const pStart = new Date(p.startDate)
        const pEnd = new Date(p.endDate)
        return chargeMonth >= pStart && chargeMonth <= pEnd
      })

      if (period) {
        const installment: PeriodInstallment = {
          purchaseId: purchase.id,
          purchase,
          installmentNumber: row.installmentNumber,
          totalInstallments: purchase.installments,
          installmentAmount: row.payment,
          principalAmount: row.principal,
          interestAmount: row.interest,
          remainingBalance: row.remainingBalance
        }
        period.installments.push(installment)
      }
    }
  }

  // Calcular total por periodo y filtrar periodos vacios
  const activePeriods = periods
    .map((p) => ({
      ...p,
      totalPeriod: p.installments.reduce(
        (sum, inst) => sum + inst.installmentAmount,
        0
      )
    }))
    .filter((p) => p.installments.length > 0)

  return activePeriods
}
