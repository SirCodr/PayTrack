'use client'

import CardList from '@/app/debt/_components/card-list'
import { mockCards } from '@/lib/mock-data'
import { CreditCard, Plus } from 'lucide-react'

export default function DebtsPage() {
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
            <button className='inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors'>
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
    </div>
  )
}
