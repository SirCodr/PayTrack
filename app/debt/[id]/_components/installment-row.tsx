'use client'

import type { PeriodInstallment } from '@/types/purchase'
import { formatCurrency } from '@/lib/utils/format'
import {
  Home,
  Monitor,
  Shirt,
  ShoppingCart,
  Plane,
  Film,
  Heart,
  Wrench,
  Package
} from 'lucide-react'

const categoryIcons: Record<string, React.ElementType> = {
  hogar: Home,
  electronica: Monitor,
  ropa: Shirt,
  alimentos: ShoppingCart,
  viajes: Plane,
  entretenimiento: Film,
  salud: Heart,
  servicios: Wrench,
  otros: Package
}

const categoryColors: Record<string, string> = {
  hogar: 'bg-blue-100 text-blue-700',
  electronica: 'bg-purple-100 text-purple-700',
  ropa: 'bg-pink-100 text-pink-700',
  alimentos: 'bg-green-100 text-green-700',
  viajes: 'bg-sky-100 text-sky-700',
  entretenimiento: 'bg-amber-100 text-amber-700',
  salud: 'bg-red-100 text-red-700',
  servicios: 'bg-slate-100 text-slate-700',
  otros: 'bg-gray-100 text-gray-700'
}

type InstallmentStatus = 'paid' | 'current' | 'future'

interface InstallmentRowProps {
  installment: PeriodInstallment
  status: InstallmentStatus
}

export default function InstallmentRow({
  installment,
  status
}: InstallmentRowProps) {
  const {
    purchase,
    installmentNumber,
    totalInstallments,
    installmentAmount,
    principalAmount,
    interestAmount
  } = installment

  const Icon = categoryIcons[purchase.category] ?? Package
  const iconColor = categoryColors[purchase.category] ?? categoryColors.otros

  const isOnePayment = totalInstallments === 1

  const statusStyles: Record<InstallmentStatus, string> = {
    paid: 'opacity-60',
    current: '',
    future: 'opacity-80'
  }

  const badgeStyles: Record<InstallmentStatus, string> = {
    paid: 'bg-emerald-100 text-emerald-700',
    current: 'bg-sky-100 text-sky-700',
    future: 'bg-slate-100 text-slate-600'
  }

  return (
    <div className={`py-3 ${statusStyles[status]}`}>
      <div className='flex items-start gap-3'>
        {/* Icono de categoria */}
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}
        >
          <Icon size={18} />
        </div>

        {/* Info de la compra */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2'>
            <div className='min-w-0'>
              <p className='text-sm font-medium text-slate-900 truncate'>
                {purchase.description}
              </p>
              <div className='flex items-center gap-2 mt-0.5'>
                {!isOnePayment && (
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded ${badgeStyles[status]}`}
                  >
                    Cuota {installmentNumber}/{totalInstallments}
                  </span>
                )}
                {isOnePayment && (
                  <span className='text-xs font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600'>
                    Contado
                  </span>
                )}
                {status === 'paid' && (
                  <span className='text-xs text-emerald-600 font-medium'>
                    Pagada
                  </span>
                )}
              </div>
            </div>

            {/* Monto de la cuota */}
            <div className='text-right shrink-0'>
              <p className='text-sm font-bold text-slate-900'>
                {formatCurrency(installmentAmount)}
              </p>
              {!isOnePayment && (
                <p className='text-xs text-slate-400 mt-0.5'>
                  Total: {formatCurrency(purchase.totalAmount)}
                </p>
              )}
            </div>
          </div>

          {/* Desglose interes + principal (solo si tiene cuotas) */}
          {!isOnePayment && interestAmount > 0 && (
            <div className='flex items-center gap-3 mt-1.5 text-xs text-slate-500'>
              <span>Capital: {formatCurrency(principalAmount)}</span>
              <span className='text-slate-300'>|</span>
              <span>Interes: {formatCurrency(interestAmount)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
