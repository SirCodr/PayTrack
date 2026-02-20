'use client'

import type { Card as CardType } from '@/types/card'
import CreditCardVisual from '@/app/debt/_components/credit-card-visual'
import CardInfoPanel from '@/app/debt/_components/card-info-panel'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

interface CardItemProps {
  card: CardType
}

export default function CardItem({ card }: CardItemProps) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(`/debt/${card.id}`)}
      className='w-full text-left rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer group'
    >
      <div className='p-5 flex flex-col gap-5'>
        <div className='flex justify-center'>
          <CreditCardVisual card={card} />
        </div>
        <CardInfoPanel card={card} />
        <div className='flex items-center justify-center gap-1 text-xs text-slate-400 group-hover:text-sky-600 transition-colors'>
          <span>Ver detalle de compras</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </button>
  )
}
