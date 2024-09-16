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
import { FaCheck } from "react-icons/fa";

interface ConcluirProps {
     onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Concluir({ onClick }: ConcluirProps) {
     return (
          <AlertDialog>
               <AlertDialogTrigger>
                    <p className='absolute bottom-2 right-2 hover:text-green-700 transition-all text-green-600 flex gap-2 text-xl lg:text-4xl'>
                         <FaCheck />
                    </p>
               </AlertDialogTrigger>
               <AlertDialogContent>
                    <AlertDialogHeader>
                         <AlertDialogTitle>Você realmente concluiu esta tarefa?</AlertDialogTitle>
                         <AlertDialogDescription>
                              Ao clicar em CONCLUIR você não poderá mais visualizar a tarefa novamente!
                         </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <AlertDialogCancel>Cancelar</AlertDialogCancel>
                         <AlertDialogAction onClick={onClick} className='bg-green-700 hover:bg-green-600'>
                              CONCLUIR
                         </AlertDialogAction>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     )
}
