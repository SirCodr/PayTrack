import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from './ui/button'

type ModalFormProps = {
  children: React.ReactNode
  title: string
  isLoading: boolean
  isOpen: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => void
  setOpen: (open: boolean) => void
}

export default function ModalForm({
  children,
  title,
  isLoading,
  isOpen,
  onSubmit,
  setOpen
}: ModalFormProps) {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isLoading} onClick={onSubmit}>
                {isLoading ? 'Guardando...' : 'Confirmar'}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button disabled={isLoading} variant='secondary'>
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
