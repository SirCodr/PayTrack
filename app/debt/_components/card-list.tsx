'use client'

import type { Card as CardType, CardSummary } from '@/types/card'
import CardItem from '@/app/debt/_components/card-item'
import DebtsSummary from '@/app/debt/_components/debts-summary'
import { CreditCard } from 'lucide-react'

interface CardListProps {
  cards: CardType[]
}

function computeSummary(cards: CardType[]): CardSummary {
  const totalLimit = cards.reduce((acc, c) => acc + c.limit, 0)
  const totalBalance = cards.reduce((acc, c) => acc + c.currentBalance, 0)
  return {
    totalLimit,
    totalBalance,
    totalAvailable: totalLimit - totalBalance,
    cardCount: cards.length
  }
}

export default function CardList({ cards }: CardListProps) {
  const summary = computeSummary(cards)

  if (cards.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 gap-3 text-slate-400'>
        <CreditCard size={48} />
        <p className='text-lg font-medium'>No hay tarjetas registradas</p>
        <p className='text-sm'>
          Agrega tu primera tarjeta de credito para comenzar
        </p>
      </div>
    )
  }

  return (
    <div>
      <DebtsSummary summary={summary} />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6'>
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}
