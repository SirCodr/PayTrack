import { PERIOD_DATES } from '@/constants/credit-card'
import { CreditCard } from '@/types/card'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Label } from './ui/label'

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
        <Label htmlFor='cardName'>Nombre de la tarjeta</Label>
        <Input
          type='text'
          id='cardName'
          name='name'
          value={formData.name}
          onChange={onInputChange}
          placeholder='Ej. BBVA Platinum'
        />
      </div>

      <div className='mb-4'>
        <Label htmlFor='creditLimit'>Límite de crédito</Label>
        <Input
          type='number'
          id='creditLimit'
          name='limit'
          value={formData.limit}
          onChange={onInputChange}
          placeholder='$0.00'
          data-type='number'
          min={0}
        />
      </div>

      <div className='mb-4'>
        <Label htmlFor='cutoffDate'>Fecha de corte</Label>
        <Select
          value={formData.cutoffDate.toString()}
          onValueChange={(value) =>
            onInputChange({
              target: { name: 'cutoffDate', value, dataset: { type: 'number' } }
            } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger
            id='cutoffDate'
            name='cutoffDate'
            className='mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
            data-type='number'
          >
            <SelectValue placeholder='Selecciona una fecha' />
          </SelectTrigger>
          <SelectContent>
            {PERIOD_DATES.map((days) => (
              <SelectItem key={days} value={days.toString()}>
                {days}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  )
}
