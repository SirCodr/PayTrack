'use client'

import { useState } from 'react'
import type { BillingPeriod } from '@/types/purchase'
import InstallmentRow from '@/app/debt/[debtId]/_components/installment-row'
import PeriodSummaryBar from '@/app/debt/[debtId]/_components/period-summary-bar'
import { formatCurrency } from '@/lib/utils/format'
import { ChevronDown } from 'lucide-react'

type InstallmentStatus = 'paid' | 'current' | 'future'

interface BillingPeriodGroupProps {
  period: BillingPeriod
  periodStatus: InstallmentStatus
}

export default function BillingPeriodGroup({
  period,
  periodStatus
}: BillingPeriodGroupProps) {
  const [isOpen, setIsOpen] = useState(
    period.isCurrent || periodStatus === 'current'
  )

  const headerBg = period.isCurrent
    ? 'bg-sky-50 border-sky-200'
    : periodStatus === 'paid'
      ? 'bg-slate-50 border-slate-200'
      : 'bg-white border-slate-200'

  return (
    <div className={`rounded-xl border overflow-hidden ${headerBg}`}>
      {/* Header del periodo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/[0.02] transition-colors'
        aria-expanded={isOpen}
      >
        <div className='flex items-center gap-2'>
          <ChevronDown
            size={18}
            className={`text-slate-400 transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`}
          />
          <div>
            <span className='text-sm font-semibold text-slate-900'>
              {period.label}
            </span>
            {period.isCurrent && (
              <span className='ml-2 text-xs font-medium bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full'>
                Periodo actual
              </span>
            )}
            {periodStatus === 'paid' && !period.isCurrent && (
              <span className='ml-2 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full'>
                Pagado
              </span>
            )}
          </div>
        </div>

        <span className='text-sm font-bold text-slate-900'>
          {formatCurrency(period.totalPeriod)}
        </span>
      </button>

      {/* Lista de cuotas */}
      {isOpen && (
        <div className='px-4 pb-4 bg-white'>
          <div className='divide-y divide-slate-100'>
            {period.installments.map((installment) => (
              <InstallmentRow
                key={`${installment.purchaseId}-${installment.installmentNumber}`}
                installment={installment}
                status={periodStatus}
              />
            ))}
          </div>

          <PeriodSummaryBar
            totalAmount={period.totalPeriod}
            installmentCount={period.installments.length}
          />
        </div>
      )}
    </div>
  )
}
