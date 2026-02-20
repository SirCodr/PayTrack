/**
 * Formatea un numero como moneda (MXN por defecto)
 */
export function formatCurrency(amount: number, currency = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Calcula el porcentaje de uso del credito
 */
export function calculateUsagePercent(balance: number, limit: number): number {
  if (limit === 0) return 0
  return Math.round((balance / limit) * 100)
}

/**
 * Retorna el color segun el porcentaje de uso
 */
export function getUsageColor(percent: number): string {
  if (percent <= 30) return 'green'
  if (percent <= 60) return 'yellow'
  if (percent <= 80) return 'orange'
  return 'red'
}

/**
 * Calcula la fecha de pago a partir de la fecha de corte
 */
export function calculatePayDate(cutDate: number): number {
  const payDate = cutDate + 15
  return payDate > 31 ? payDate - 31 : payDate
}

/**
 * Formatea una fecha de corte/pago al siguiente dia del mes correspondiente
 */
export function getNextDate(dayOfMonth: number): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  let nextDate = new Date(year, month, dayOfMonth)
  if (nextDate <= now) {
    nextDate = new Date(year, month + 1, dayOfMonth)
  }

  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(nextDate)
}
