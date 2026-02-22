'use client'

import PurchaseForm from '@/components/purchase-form'
import { useIndexedStore } from '@/hooks/useIndexedStore'
import {
  formatCurrency,
  getNextDate,
  calculateUsagePercent
} from '@/lib/utils/format'
import { CreditCard } from '@/types/card'
import { Purchase } from '@/types/purchase'
import {
  ArrowLeft,
  CreditCard as CreditCardIcon,
  CalendarDays,
  Wallet,
  Plus
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const colorGradients: Record<string, string> = {
  blue: 'from-sky-900 to-sky-700',
  dark: 'from-slate-900 to-slate-700',
  gold: 'from-amber-900 to-amber-700',
  teal: 'from-teal-900 to-teal-700'
}
interface CardDetailHeaderProps {
  card: CreditCard
}

const initialFormData: Purchase = {
  id: '',
  cardId: '',
  description: '',
  amount: 0,
  installments: 1,
  interestRate: 0,
  date: '',
  firstChargeDate: ''
}

export default function CardDetailHeader({ card }: CardDetailHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Purchase>(initialFormData)
  const { add } = useIndexedStore('purchases')
  const router = useRouter()
  const { debtId } = useParams()
  const gradient = colorGradients.dark
  const available = card.limit - card.currentBalance
  const usage = calculateUsagePercent(card.currentBalance, card.limit)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, dataset } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: dataset.type === 'number' ? Number(value) : value
    }))
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault()
    setIsLoading(true)

    const newPurchase: Purchase = {
      ...formData,
      id: crypto.randomUUID(),
      cardId: debtId as string
    }

    try {
      await add(newPurchase)
      console.log('Purchase saved to IndexedDB:', newPurchase)
      setFormData(initialFormData)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving purchase:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`bg-linear-to-br ${gradient} text-white`}>
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
          <CreditCardIcon size={18} className='opacity-80' />
          <h1 className='text-lg font-semibold'>{card.name}</h1>
        </div>
        <span className='text-sm font-mono opacity-80'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors'
          >
            <Plus size={16} />
            Agregar Compra
          </button>
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
            <p className='text-sm font-bold'>{card.cutoffDate} de cada mes</p>
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

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black'>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-md'>
            <div className='p-6'>
              <h3 className='text-lg font-bold mb-4'>Agregar nueva compra</h3>
              <PurchaseForm
                formData={formData}
                onSubmit={handleSubmit}
                onInputChange={handleInputChange}
              />
            </div>
            <div className='flex justify-end gap-3 p-4 border-t border-gray-200'>
              {isLoading ? (
                <p className='text-sm text-gray-500'>Guardando...</p>
              ) : (
                <>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg'
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className='px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg'
                  >
                    Confirmar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
