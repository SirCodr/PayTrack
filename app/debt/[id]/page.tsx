'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { mockCards } from '@/lib/mock-data'
import { getPurchasesByCardId } from '@/lib/mock-purchases'
import { generateBillingPeriods } from '@/lib/utils/amortization'
import CardDetailHeader from '@/app/debt/[id]/_components/card-detail-header'
import BillingPeriodGroup from '@/app/debt/[id]/_components/billing-period-group'
import { formatCurrency } from '@/lib/utils/format'
import { Receipt } from 'lucide-react'

type InstallmentStatus = 'paid' | 'current' | 'future'

export default function CardDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const card = mockCards.find((c) => c.id === id)

  if (!card) {
    notFound()
  }

  const purchases = getPurchasesByCardId(card.id)
  const periods = generateBillingPeriods(card.cutDate, purchases)

  // Determinar estado de cada periodo
  const now = new Date()
  function getPeriodStatus(period: (typeof periods)[0]): InstallmentStatus {
    const endDate = new Date(period.endDate)
    if (period.isCurrent) return 'current'
    if (endDate < now) return 'paid'
    return 'future'
  }

  // Calcular totales globales
  const totalFutureDebt = periods
    .filter((p) => !p.isCurrent && new Date(p.endDate) >= now)
    .reduce((sum, p) => sum + p.totalPeriod, 0)
  const currentPeriod = periods.find((p) => p.isCurrent)

  return (
    <div className='min-h-screen bg-slate-50'>
      <CardDetailHeader card={card} />

      {/* Resumen de la tarjeta */}
      <div className='px-4 -mt-0 relative z-10'>
        <div className='bg-white rounded-xl border border-slate-200 p-4 flex gap-4 shadow-sm'>
          <div className='flex-1 text-center'>
            <p className='text-xs text-slate-500 mb-0.5'>Este periodo</p>
            <p className='text-lg font-bold text-slate-900'>
              {currentPeriod
                ? formatCurrency(currentPeriod.totalPeriod)
                : '$0.00'}
            </p>
          </div>
          <div className='w-px bg-slate-200' />
          <div className='flex-1 text-center'>
            <p className='text-xs text-slate-500 mb-0.5'>Deuda futura</p>
            <p className='text-lg font-bold text-slate-900'>
              {formatCurrency(totalFutureDebt)}
            </p>
          </div>
          <div className='w-px bg-slate-200' />
          <div className='flex-1 text-center'>
            <p className='text-xs text-slate-500 mb-0.5'>Compras</p>
            <p className='text-lg font-bold text-slate-900'>
              {purchases.length}
            </p>
          </div>
        </div>
      </div>

      {/* Titulo de seccion */}
      <div className='px-4 mt-6 mb-3 flex items-center gap-2'>
        <Receipt size={18} className='text-slate-400' />
        <h2 className='text-base font-semibold text-slate-800'>
          Compras por periodo
        </h2>
      </div>

      {/* Lista de periodos */}
      <div className='px-4 pb-8 flex flex-col gap-3'>
        {periods.length === 0 ? (
          <div className='text-center py-12'>
            <Receipt size={40} className='mx-auto text-slate-300 mb-3' />
            <p className='text-sm text-slate-500'>
              No hay compras registradas para esta tarjeta
            </p>
          </div>
        ) : (
          periods.map((period) => (
            <BillingPeriodGroup
              key={period.id}
              period={period}
              periodStatus={getPeriodStatus(period)}
            />
          ))
        )}
      </div>
    </div>
  )
}
