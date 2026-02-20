'use client'

import CardList from '@/app/debt/_components/card-list'
import CreditCardForm from '@/components/credit-card-form'
import { mockCards } from '@/lib/mock-data'
import { CreditCard, Plus } from 'lucide-react'
import { useState } from 'react'

export default function DebtsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardType: '',
    creditLimit: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log('Form Data:', formData)
    setIsModalOpen(false)
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header */}
      <header className='border-b border-slate-200 bg-white'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center w-9 h-9 rounded-lg bg-sky-700 text-white'>
                <CreditCard size={20} />
              </div>
              <div>
                <h1 className='text-base font-bold text-slate-900'>TCDebt</h1>
                <p className='text-xs text-slate-500'>
                  Control de tarjetas de credito
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className='inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors'
            >
              <Plus size={16} />
              Agregar tarjeta
            </button>
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

        <CardList cards={mockCards} />
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-md'>
            <div className='p-6'>
              <h3 className='text-lg font-bold mb-4'>Agregar nueva tarjeta</h3>
              <CreditCardForm
                onSubmit={handleSubmit}
                formData={formData}
                onInputChange={handleInputChange}
              />
            </div>
            <div className='flex justify-end gap-3 p-4 border-t border-gray-200'>
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
