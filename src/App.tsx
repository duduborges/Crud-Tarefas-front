/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from 'react-bootstrap'
import './App.css'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { useState } from 'react'
import { MdEdit, MdSave } from 'react-icons/md'
import Deletar from './components/lixinho'
import Concluir from './components/concluir'




function App() {
  const [add, setAdd] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditigng] = useState(false)




  function handleClick() {
    if (add) {
      setAdd(false)
      setTimeout(() => setShowForm(false), 500)
    } else {
      setShowForm(true)
      setTimeout(() => setAdd(true), 100)
    }
  }

  function addTarefa() {
    console.log("serto")
  }
  function editTarefa() {
    console.log("serto")
  }

  return (
    <>
      <header>
        <nav className='flex items-center bg-slate-700 text-white justify-between p-4'>
          <h1 className='text-2xl lg:text-4xl font-semibold'>Tarefas</h1>
          <Button onClick={handleClick} className='criar-tarefa bg-slate-500 sm:text-md p-2 rounded-lg justify-between  flex items-center gap-2'>
            <span className='sm:text-sm lg:text-2xl'>Criar Tarefas</span>
            <FaPlus size={20} />
          </Button>
        </nav>
      </header>
      <main>
        {showForm && (
          <div className={`transition-all duration-500 ${add ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'} overflow-hidden`}>
            <>
              <form onSubmit={isEditing ? (editTarefa) : (addTarefa)} className='flex flex-col mt-4'>
                <div className='flex justify-evenly items-center w-[96%] m-auto'>
                  <label className='flex flex-col text-left w-2/5'>
                    Titulo
                    <input type="text" className='bg-slate-200 focus:outline-none  px-2 w-full py-1 rounded-sm' />
                  </label>
                  <label className='flex flex-col text-right w-2/5'>
                    Descrição
                    <input type="text" className='bg-slate-200 focus:outline-none  px-2 w-full py-1 rounded-sm' />
                  </label>
                </div>
                <label className='text-lg flex items-center gap-2 m-auto mt-5'>
                  Cor do fundo:
                  <input className=' w-10 focus:outline-none   h-10 p-0 appearance-none bg-transparent cursor-pointer border-none rounded-sm' type="color" />
                </label>
                <label className='text-lg flex items-center gap-2 m-auto mt-5 mb-2'>
                  Cor do Texto:
                  <input className=' w-10 focus:outline-none   h-10 p-0 appearance-none bg-transparent cursor-pointer border-none rounded-sm' type="color" />
                </label>
                {isEditing ? (
                  <Button className='bg-slate-400 w-4/6 lg:w-1/3  py-2 rounded-lg text-xl lg:text-2xl hover:bg-slate-500 transition-all m-auto text-white flex items-center justify-center gap-3'>Editar tarefa <span><FaCheck /></span></Button>
                ) : (
                  <Button className='bg-slate-400 w-4/6 lg:w-1/3  py-2 rounded-lg text-xl lg:text-2xl hover:bg-slate-500 transition-all m-auto text-white flex items-center justify-center gap-3'>Salvar tarefa <span><MdSave /></span></Button>
                )}
              </form>

              <div className='m-auto w-full flex flex-col items-center border-solid border-t pt-2 my-10'>
                <h3 className='font-light underline underline-offset-2 lg:text-3xl'>Veja como está ficando</h3>
                <div className='bg-black text-white flex flex-col w-4/6 lg:w-1/3 mx-2  text-center mt-2 p-2 h-48  lg:h-80'>
                  <p className='text-2xl'>Titulo</p>
                  <p className='text-sm'>Descrição</p>
                </div>
              </div>
            </>
          </div>
        )}
        {!add && (
          <>
            <h1 className='text-center text-xl w-10/12 my-4 m-auto italic'>
              Para adicionar uma tarefa nova, clique em: "Criar Tarefas"
            </h1>
          </>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1430 320">
          <path fill="#94a3b8" fill-opacity="1" d="M0,160L40,144C80,128,160,96,240,112C320,128,400,192,480,224C560,256,640,256,720,234.7C800,213,880,171,960,154.7C1040,139,1120,149,1200,154.7C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>
        <div className='flex flex-col bg-slate-400 pb-8'>
          <h1 className='text-center text-4xl mt-4 text-white font-semibold mb-7'>Minhas Tarefas</h1>
          <div className='flex-row flex flex-wrap justify-center'>

            <div className='bg-black text-white flex flex-col relative w-4/6 lg:w-1/3 mx-2  text-center mt-2 p-2 h-48  lg:h-80'>
              <p className='text-2xl'>Titulo</p>
              <p className='text-sm'>Descrição</p>
              <Deletar />
              <p className='absolute right-2 top-2 cursor-pointer  text-yellow-300 flex gap-2 text-2xl lg:text-4xl hover:text-yellow-100 transition-all'><MdEdit /></p>
              <Concluir />
            </div>
            <div className='bg-black text-white flex flex-col w-4/6 lg:w-1/3 mx-2  text-center mt-2 p-2 h-48 lg:h-80'>
              <p className='text-2xl'>Titulo</p>
              <p className='text-sm'>Descrição</p>
            </div>
            <div className='bg-black text-white flex flex-col w-4/6 lg:w-1/3 mx-2  text-center mt-2 p-2 h-48 lg:h-80'>
              <p className='text-2xl'>Titulo</p>
              <p className='text-sm'>Descrição</p>
            </div>
            <div className='bg-black text-white flex flex-col w-4/6 lg:w-1/3 mx-2  text-center mt-2 p-2 h-48 lg:h-80'>
              <p className='text-2xl'>Titulo</p>
              <p className='text-sm'>Descrição</p>
            </div>
          </div>
        </div>
      </main>


    </>
  )
}

export default App
