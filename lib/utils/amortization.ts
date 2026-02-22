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
  const { amount, installments, interestRate } = purchase
  const rows: AmortizationRow[] = []
  const principalFixed = amount / installments
  let remaining = amount

  for (let i = 1; i <= installments; i++) {
    const interest = remaining * (interestRate / 100)
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

function calculateFirstChargeDate(cutDay: number, purchase: Purchase): Date {
  const purchaseDate = new Date(purchase.date)
  const day = purchaseDate.getDate()
  const month = purchaseDate.getMonth()
  const year = purchaseDate.getFullYear()

  let dueMonth = month
  let dueYear = year
  let dueDay: number

  if (cutDay === 15) {
    dueDay = 30 // Para corte 15, pago en 30
    if (day > 15) {
      dueMonth += 1
      if (dueMonth > 11) {
        dueMonth = 0
        dueYear += 1
      }
    }
  } else if (cutDay === 30) {
    dueDay = 15 // Para corte 30, pago en 15 del siguiente
    dueMonth += 1
    if (dueMonth > 11) {
      dueMonth = 0
      dueYear += 1
    }
    if (day > 30) {
      // Si compra después del 30 (ej. 31 en meses con 31), mover al siguiente mes
      dueMonth += 1
      if (dueMonth > 11) {
        dueMonth = 0
        dueYear += 1
      }
    }
  } else {
    throw new Error('cutDay no soportado: solo 15 o 30')
  }

  // Ajustar si dueDay excede los días del mes (ej. febrero con 28/29)
  const lastDayOfMonth = new Date(dueYear, dueMonth + 1, 0).getDate()
  dueDay = Math.min(dueDay, lastDayOfMonth)

  return new Date(dueYear, dueMonth, dueDay)
}

/**
 * Genera los periodos de facturacion para una tarjeta y distribuye las cuotas.
 * Mira 12 meses hacia atras y 12 hacia adelante desde la fecha actual.
 */
export function generateBillingPeriods(
  cutDay: number,
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

    const endDate =
      month === 1 && cutDay === 30
        ? new Date(year, month, 28)
        : new Date(year, month, cutDay)
    const startDate = new Date(year, month - 1, cutDay + 1)

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
  purchases.forEach((purchase) => {
    const schedule = generateAmortizationSchedule(purchase)
    const firstCharge = calculateFirstChargeDate(cutDay, purchase)

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
  })

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
