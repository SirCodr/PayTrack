'use client'

import type { Card as CardType } from '@/types/card'
import { CreditCard, Wifi } from 'lucide-react'

const colorGradients: Record<string, string> = {
  blue: 'from-sky-900 to-sky-400',
  dark: 'from-slate-900 to-slate-700',
  gold: 'from-amber-800 to-amber-400',
  teal: 'from-teal-900 to-teal-400'
}

interface CreditCardVisualProps {
  card: CardType
}

export default function CreditCardVisual({ card }: CreditCardVisualProps) {
  const gradient = colorGradients.dark

  return (
    <div
      className={`relative w-full max-w-90 aspect-[1.586] rounded-xl bg-linear-to-br ${gradient} p-5 text-white overflow-hidden shadow-lg select-none`}
    >
      {/* Patron decorativo */}
      <div className='absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-white/10' />
      <div className='absolute -bottom-[30%] -left-[15%] w-[70%] h-[70%] rounded-full bg-white/5' />

      {/* Contenido */}
      <div className='relative z-10 flex flex-col justify-between h-full'>
        {/* Header: nombre + contactless */}
        <div className='flex justify-between items-start'>
          <span className='text-sm font-semibold opacity-90'>{card.name}</span>
          <Wifi size={20} className='opacity-70 rotate-90' />
        </div>

        {/* Chip */}
        <div className='flex items-center gap-3 my-2'>
          <div
            className='w-10 h-7.5 rounded-md'
            style={{
              background:
                'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #D4AF37 100%)'
            }}
          />
        </div>

        {/* Numero */}
        <p className='text-lg font-medium tracking-[0.15em] font-mono'>
          {'**** **** **** ****'}
        </p>

        {/* Footer: marca */}
        <div className='flex justify-end items-center mt-1'>
          <div className='flex items-center gap-1'>
            <CreditCard size={16} className='opacity-80' />
          </div>
        </div>
      </div>
    </div>
  )
}
