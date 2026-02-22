import { PERIOD_DATES } from '@/constants/credit-card'
import { CreditCard } from '@/types/card'

type CreditCardFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formData: CreditCard
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
}

export default function CreditCardForm({
  onSubmit,
  formData,
  onInputChange
}: CreditCardFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className='mb-4'>
        <label
          htmlFor='cardName'
          className='block text-sm font-medium text-gray-700'
        >
          Nombre de la tarjeta
        </label>
        <input
          type='text'
          id='cardName'
          name='name'
          value={formData.name}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='Ej. BBVA Platinum'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='creditLimit'
          className='block text-sm font-medium text-gray-700'
        >
          Límite de crédito
        </label>
        <input
          type='number'
          id='creditLimit'
          name='limit'
          value={formData.limit}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='$0.00'
          data-type='number'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='cutoffDate'
          className='block text-sm font-medium text-gray-700'
        >
          Fecha de corte
        </label>
        <select
          id='cutoffDate'
          name='cutoffDate'
          value={formData.cutoffDate}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          data-type='number'
        >
          <option value=''>Selecciona una fecha</option>
          {PERIOD_DATES.map((days) => (
            <option key={days} value={days}>
              {days}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}
