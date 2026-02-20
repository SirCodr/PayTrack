'use client'

import type { Card as CardType } from '@/types/card'
import {
  formatCurrency,
  getNextDate,
  calculateUsagePercent
} from '@/lib/utils/format'
import { ArrowLeft, CreditCard, CalendarDays, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'

const colorGradients: Record<string, string> = {
  blue: 'from-sky-900 to-sky-700',
  dark: 'from-slate-900 to-slate-700',
  gold: 'from-amber-900 to-amber-700',
  teal: 'from-teal-900 to-teal-700'
}

const brandLogos: Record<string, string> = {
  visa: 'VISA',
  mastercard: 'MC',
  amex: 'AMEX'
}

interface CardDetailHeaderProps {
  card: CardType
}

export default function CardDetailHeader({ card }: CardDetailHeaderProps) {
  const router = useRouter()
  const gradient = colorGradients[card.color] ?? colorGradients.blue
  const available = card.limit - card.currentBalance
  const usage = calculateUsagePercent(card.currentBalance, card.limit)

  return (
    <div className={`bg-gradient-to-br ${gradient} text-white`}>
      {/* Barra superior */}
      <div className='flex items-center gap-3 px-4 pt-4 pb-3'>
        <button
          onClick={() => router.back()}
          className='p-2 rounded-lg hover:bg-white/10 transition-colors'
          aria-label='Volver'
        >
          <ArrowLeft size={20} />
        </button>
        <div className='flex items-center gap-2 flex-1'>
          <CreditCard size={18} className='opacity-80' />
          <h1 className='text-lg font-semibold'>{card.name}</h1>
        </div>
        <span className='text-sm font-mono opacity-80'>
          {'****'} {card.lastFourDigits}
        </span>
        <span className='text-xs font-bold bg-white/20 px-2 py-0.5 rounded'>
          {brandLogos[card.brand]}
        </span>
      </div>

      {/* Info compacta */}
      <div className='px-4 pb-4'>
        <div className='grid grid-cols-3 gap-3'>
          <div className='bg-white/10 rounded-lg p-3'>
            <div className='flex items-center gap-1.5 mb-1'>
              <Wallet size={14} className='opacity-70' />
              <span className='text-xs opacity-70'>Saldo</span>
            </div>
            <p className='text-sm font-bold'>
              {formatCurrency(card.currentBalance)}
            </p>
          </div>

          <div className='bg-white/10 rounded-lg p-3'>
            <div className='flex items-center gap-1.5 mb-1'>
              <Wallet size={14} className='opacity-70' />
              <span className='text-xs opacity-70'>Disponible</span>
            </div>
            <p className='text-sm font-bold'>{formatCurrency(available)}</p>
          </div>

          <div className='bg-white/10 rounded-lg p-3'>
            <div className='flex items-center gap-1.5 mb-1'>
              <CalendarDays size={14} className='opacity-70' />
              <span className='text-xs opacity-70'>Corte</span>
            </div>
            <p className='text-sm font-bold'>{getNextDate(card.cutDate)}</p>
          </div>
        </div>

        {/* Barra de uso */}
        <div className='mt-3'>
          <div className='flex justify-between text-xs opacity-70 mb-1'>
            <span>Uso del credito</span>
            <span>{usage}%</span>
          </div>
          <div className='w-full h-1.5 bg-white/20 rounded-full overflow-hidden'>
            <div
              className='h-full rounded-full transition-all bg-white/80'
              style={{ width: `${Math.min(usage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
