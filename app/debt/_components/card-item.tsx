'use client'

import type { Card as CardType } from '@/types/card'
import CreditCardVisual from '@/app/debt/_components/credit-card-visual'
import CardInfoPanel from '@/app/debt/_components/card-info-panel'

interface CardItemProps {
  card: CardType
}

export default function CardItem({ card }: CardItemProps) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200'>
      <div className='p-5 flex flex-col gap-5'>
        <div className='flex justify-center'>
          <CreditCardVisual card={card} />
        </div>
        <CardInfoPanel card={card} />
      </div>
    </div>
  )
}
