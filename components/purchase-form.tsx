import { PERIOD_DATES } from '@/constants/credit-card'
import { CreditCard } from '@/types/card'
import { Purchase } from '@/types/purchase'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Calendar, SingleCalendarDialog } from './ui/calendar'

type PurchaseFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formData: Purchase
  onInputChange: (
    name: string,
    value: string | number,
    type: 'number' | 'string' | 'date'
  ) => void
}

export default function PurchaseForm({
  onSubmit,
  formData,
  onInputChange
}: PurchaseFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, dataset } = e.target
    onInputChange(name, value, dataset.type as 'number' | 'string' | 'date')
  }

  const handleCalendarChange = (
    date: Date | undefined,
    onInputChange: (
      name: string,
      value: string | number,
      type: 'number' | 'string' | 'date'
    ) => void
  ) => {
    if (date) {
      onInputChange('date', date.toISOString(), 'date')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='mb-4'>
        <Label htmlFor='description'>Descripción</Label>
        <Input
          type='text'
          id='description'
          name='description'
          value={formData.description}
          onChange={handleInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='Ej. Liverpool - Sala de piel'
        />
      </div>

      <div className='mb-4'>
        <Label htmlFor='amount'>Monto</Label>
        <Input
          type='number'
          id='amount'
          name='amount'
          value={formData.amount}
          onChange={handleInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='$0.00'
          min={0}
        />
      </div>

      <div className='mb-4'>
        <Label htmlFor='date'>Fecha</Label>
        <SingleCalendarDialog
          mode='single'
          selected={new Date(formData.date)}
          onSelect={(date) => {
            handleCalendarChange(date, onInputChange)
          }}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
        />
      </div>

      <div className='mb-4'>
        <Label htmlFor='installments'>Total de cuotas</Label>
        <Input
          type='number'
          id='installments'
          name='installments'
          value={formData.installments}
          onChange={handleInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='Ej. 6'
          min={1}
        />
      </div>

      <div className='mb-4'>
        <Label htmlFor='interestRate'>Tasa de Interés</Label>
        <Input
          type='number'
          id='interestRate'
          name='interestRate'
          value={formData.interestRate}
          onChange={handleInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='$0.00'
          min={0}
        />
      </div>
    </form>
  )
}
