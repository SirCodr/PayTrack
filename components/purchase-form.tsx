import { PERIOD_DATES } from '@/constants/credit-card'
import { CreditCard } from '@/types/card'
import { Purchase } from '@/types/purchase'

type PurchaseFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formData: Purchase
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

export default function PurchaseForm({
  onSubmit,
  formData,
  onInputChange
}: PurchaseFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
        >
          Descripcion
        </label>
        <input
          type='text'
          id='description'
          name='description'
          value={formData.description}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='Ej. Liverpool - Sala de piel'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='amount'
          className='block text-sm font-medium text-gray-700'
        >
          Monto
        </label>
        <input
          type='number'
          id='amount'
          name='amount'
          value={formData.amount}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='$0.00'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='date'
          className='block text-sm font-medium text-gray-700'
        >
          Fecha
        </label>
        <input
          type='date'
          id='date'
          name='date'
          value={formData.date}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='installments'
          className='block text-sm font-medium text-gray-700'
        >
          Total de cuotas
        </label>
        <input
          type='number'
          id='installments'
          name='installments'
          value={formData.installments}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='Ej. 6'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='interestRate'
          className='block text-sm font-medium text-gray-700'
        >
          Tasa de Interés
        </label>
        <input
          type='number'
          id='interestRate'
          name='interestRate'
          value={formData.interestRate}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='$0.00'
        />
      </div>
    </form>
  )
}
