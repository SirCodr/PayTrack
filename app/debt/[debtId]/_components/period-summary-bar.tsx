import { formatCurrency } from '@/lib/utils/format'

interface PeriodSummaryBarProps {
  totalAmount: number
  installmentCount: number
}

export default function PeriodSummaryBar({
  totalAmount,
  installmentCount
}: PeriodSummaryBarProps) {
  return (
    <div className='border-t border-slate-100 pt-3 mt-1 flex items-center justify-between'>
      <span className='text-xs text-slate-500'>
        {installmentCount} {installmentCount === 1 ? 'cargo' : 'cargos'} en este
        periodo
      </span>
      <div className='text-right'>
        <span className='text-xs text-slate-500'>Total del periodo</span>
        <p className='text-sm font-bold text-slate-900'>
          {formatCurrency(totalAmount)}
        </p>
      </div>
    </div>
  )
}
