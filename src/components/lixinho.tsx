import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
     AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MouseEventHandler } from "react"
import { FaTrash } from "react-icons/fa"

interface DeletarProps {
     onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Deletar({ onClick }: DeletarProps) {
     return (
          <AlertDialog>
               <AlertDialogTrigger>
                    <p className='absolute top-2 left-2 hover:text-red-700 transition-all text-red-600 flex gap-2 text-xl lg:text-4xl'>
                         <FaTrash />
                    </p>
               </AlertDialogTrigger>
               <AlertDialogContent>
                    <AlertDialogHeader>
                         <AlertDialogTitle>Você tem certeza que deseja deletar essa tarefa?</AlertDialogTitle>
                         <AlertDialogDescription>
                              Ao clicar em DELETAR você não poderá mais visualizar a tarefa novamente!
                         </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <AlertDialogCancel>Cancelar</AlertDialogCancel>
                         <AlertDialogAction onClick={onClick} className='bg-red-700 hover:bg-red-600'>
                              DELETAR
                         </AlertDialogAction>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     )
}
