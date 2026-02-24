'use client'

import CardList from '@/app/debt/_components/card-list'
import CreditCardForm from '@/components/credit-card-form'
import ModalForm from '@/components/modal-form'
import { Button } from '@/components/ui/button'
import { useIndexedStore } from '@/hooks/useIndexedStore'
import { CreditCard } from '@/types/card'
import { CreditCard as CreditCardIcon, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

const initialFormData: CreditCard = {
  id: '',
  name: '',
  limit: 0,
  cutoffDate: 0,
  payDate: 0,
  createdAt: '',
  currentBalance: 0
}

export default function DebtsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<CreditCard>(initialFormData)
  const { add, data: cards, loading: isLoadingCards } = useIndexedStore('cards')

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

    const newCard: CreditCard = {
      id: crypto.randomUUID(),
      name: formData.name,
      limit: formData.limit,
      cutoffDate: formData.cutoffDate,
      payDate: formData.cutoffDate === 15 ? 30 : 15, // Alterna entre 15 y 30
      createdAt: new Date().toISOString(),
      currentBalance: 0
    }

    try {
      await add(newCard)
      console.log('Card saved to IndexedDB:', newCard)
      setFormData(initialFormData)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error saving card:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header */}
      <header className='border-b border-slate-200 bg-white'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center w-9 h-9 rounded-lg bg-sky-700 text-white'>
                <CreditCardIcon size={20} />
              </div>
              <div>
                <h1 className='text-base font-bold text-slate-900'>TCDebt</h1>
                <p className='text-xs text-slate-500'>
                  Control de tarjetas de credito
                </p>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus size={16} />
              Agregar tarjeta
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-6xl mx-auto px-4 py-6'>
        <div className='mb-5'>
          <h2 className='text-xl font-bold text-slate-900 text-balance'>
            Mis tarjetas
          </h2>
          <p className='text-sm text-slate-500 mt-1'>
            Resumen de tus tarjetas de credito y deudas activas
          </p>
        </div>

        {isLoadingCards ? (
          <p className='text-sm text-slate-500'>Cargando tarjetas...</p>
        ) : cards.length === 0 ? (
          <p className='text-sm text-slate-500'>
            No tienes tarjetas registradas
          </p>
        ) : (
          <CardList cards={cards} />
        )}
      </main>

      {isModalOpen && (
        <ModalForm
          title='Agregar nueva tarjeta'
          isLoading={isLoading}
          isOpen={isModalOpen}
          onSubmit={handleSubmit}
          setOpen={setIsModalOpen}
        >
          <CreditCardForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </ModalForm>
      )}
    </div>
  )
}
