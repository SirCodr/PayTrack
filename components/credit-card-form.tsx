export default function CreditCardForm({ onSubmit, formData, onInputChange }) {
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
          name='cardName'
          value={formData.cardName}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='Ej. BBVA Platinum'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='cardNumber'
          className='block text-sm font-medium text-gray-700'
        >
          Número de tarjeta
        </label>
        <input
          type='text'
          id='cardNumber'
          name='cardNumber'
          value={formData.cardNumber}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='**** **** **** ****'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='cardType'
          className='block text-sm font-medium text-gray-700'
        >
          Tipo de tarjeta
        </label>
        <input
          type='text'
          id='cardType'
          name='cardType'
          value={formData.cardType}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='Ej. VISA, MasterCard'
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
          type='text'
          id='creditLimit'
          name='creditLimit'
          value={formData.creditLimit}
          onChange={onInputChange}
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm'
          placeholder='$0.00'
        />
      </div>
    </form>
  )
}
