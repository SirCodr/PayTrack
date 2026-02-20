'use client'

import type { CardSummary } from '@/types/card'
import {
  formatCurrency,
  calculateUsagePercent,
  getUsageColor
} from '@/lib/utils/format'
import { TrendingDown, CreditCard, PiggyBank } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const usageRingStyles: Record<string, string> = {
  green: 'border-green-500 text-green-500',
  yellow: 'border-yellow-500 text-yellow-500',
  orange: 'border-orange-500 text-orange-500',
  red: 'border-red-500 text-red-500'
}

interface StatItemProps {
  label: string
  value: string
  icon: LucideIcon
}

function StatItem({ label, value, icon: Icon }: StatItemProps) {
  return (
    <div className='flex items-center gap-3 flex-1 min-w-[140px]'>
      <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100'>
        <Icon size={20} className='text-slate-500' />
      </div>
      <div>
        <p className='text-xs text-slate-500'>{label}</p>
        <p className='text-lg font-bold text-slate-900'>{value}</p>
      </div>
    </div>
  )
}

interface DebtsSummaryProps {
  summary: CardSummary
}

export default function DebtsSummary({ summary }: DebtsSummaryProps) {
  const usagePercent = calculateUsagePercent(
    summary.totalBalance,
    summary.totalLimit
  )
  const usageColor = getUsageColor(usagePercent)

  return (
    <div className='rounded-xl bg-slate-50 border border-slate-200 p-5'>
      <div className='flex flex-col md:flex-row gap-5 md:items-center justify-between'>
        <StatItem
          label='Deuda total'
          value={formatCurrency(summary.totalBalance)}
          icon={TrendingDown}
        />
        <StatItem
          label='Disponible total'
          value={formatCurrency(summary.totalAvailable)}
          icon={PiggyBank}
        />
        <StatItem
          label='Tarjetas activas'
          value={String(summary.cardCount)}
          icon={CreditCard}
        />

        {/* Indicador circular de uso global */}
        <div className='flex items-center gap-3 flex-1 min-w-[140px]'>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-[3px] ${usageRingStyles[usageColor]}`}
          >
            <span className='text-xs font-bold'>{usagePercent}%</span>
          </div>
          <div>
            <p className='text-xs text-slate-500'>Uso global</p>
            <p className='text-sm font-semibold text-slate-900'>
              {formatCurrency(summary.totalLimit)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
