'use client'

import {
  formatCurrency,
  calculateUsagePercent,
  getUsageColor,
  getNextDate
} from '@/lib/utils/format'
import { CreditCard } from '@/types/card'
import { Calendar, Scissors, Wallet } from 'lucide-react'

const usageBadgeStyles: Record<string, string> = {
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700'
}

const usageBarStyles: Record<string, string> = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500'
}

interface CardInfoPanelProps {
  card: CreditCard
}

export default function CardInfoPanel({ card }: CardInfoPanelProps) {
  const available = card.limit - card.currentBalance
  const usagePercent = calculateUsagePercent(card.currentBalance, card.limit)
  const usageColor = getUsageColor(usagePercent)

  return (
    <div className='w-full'>
      {/* Barra de uso */}
      <div className='mb-4'>
        <div className='flex justify-between items-center mb-1.5'>
          <span className='text-xs text-slate-500'>Uso del credito</span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${usageBadgeStyles[usageColor]}`}
          >
            {usagePercent}%
          </span>
        </div>
        <div className='w-full h-2 rounded-full bg-slate-100 overflow-hidden'>
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${usageBarStyles[usageColor]}`}
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>

      {/* Montos */}
      <div className='flex gap-4 mb-4 flex-wrap'>
        <div className='flex-1 min-w-[120px]'>
          <p className='text-xs text-slate-500 mb-0.5'>Saldo actual</p>
          <p className='text-lg font-bold text-slate-900'>
            {formatCurrency(card.currentBalance)}
          </p>
        </div>
        <div className='flex-1 min-w-[120px]'>
          <p className='text-xs text-slate-500 mb-0.5'>Disponible</p>
          <p className='text-lg font-bold text-green-600'>
            {formatCurrency(available)}
          </p>
        </div>
      </div>

      {/* Fechas e info */}
      <div className='flex flex-col gap-2.5 border-t border-slate-200 pt-3'>
        <div className='flex items-center gap-2'>
          <Scissors size={14} className='text-slate-400' />
          <span className='text-xs text-slate-500'>Fecha de corte:</span>
          <span className='text-xs font-semibold text-slate-800'>
            Dia {card.cutoffDate}
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <Calendar size={14} className='text-slate-400' />
          <span className='text-xs text-slate-500'>Fecha de pago:</span>
          <span className='text-xs font-semibold text-slate-800'>
            Dia {card.payDate}
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <Wallet size={14} className='text-slate-400' />
          <span className='text-xs text-slate-500'>Limite de credito:</span>
          <span className='text-xs font-semibold text-slate-800'>
            {formatCurrency(card.limit)}
          </span>
        </div>
      </div>
    </div>
  )
}
