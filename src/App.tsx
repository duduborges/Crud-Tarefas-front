/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from 'react-bootstrap'
import './App.css'
import { FaCheck, FaPlus, FaTasks } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { MdEdit, MdSave } from 'react-icons/md'
import Deletar from './components/lixinho'
import Concluir from './components/concluir'
import { Api } from './api'
import { PiBroom } from 'react-icons/pi'
import { TbBrandGithubFilled } from 'react-icons/tb'
import Spinner from './components/spinner'



interface TarefasProps {
  id: string,
  titulo: string,
  descricao: string,
  cor: string,
  corTexto: string,
  concluida: boolean,
}



function App() {
  const [add, setAdd] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditigng] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tarefas, setTarefas] = useState<TarefasProps[]>([])
  const [salvando, setSalvando] = useState(false)
  const [tarefasN, setTarefasN] = useState<TarefasProps[]>([])

  const [novaTarefa, setNovaTarefa] = useState({
    id: "",
    titulo: "",
    descricao: "",
    cor: "#000000",
    corTexto: "#FFFFFF",
    concluida: false,
  })







  const fetchTarefas = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`/tarefas`);
      const response2 = await Api.get(`/tarefas/concluidas`);

      setTarefas(response.data);
      setTarefasN(response2.data);

      console.log(response.data)

      console.log(response2.data)
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovaTarefa((prevTarefa) => ({
      ...prevTarefa,
      [name]: value,
    }));
  };


  function handleClick() {
    if (add) {
      setAdd(false)
      setTimeout(() => setShowForm(false), 500)
    } else {
      setShowForm(true)
      setTimeout(() => setAdd(true), 100)
    }
  }

  const addTarefa = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSalvando(true)
    try {
      const response = await Api.post("/tarefas", novaTarefa);
      if (response.status === 201) {
        fetchTarefas();
        setNovaTarefa({
          id: "",
          titulo: "",
          descricao: "",
          cor: "#000000",
          corTexto: "#FFFFFF",
          concluida: false,
        });
      } else {
        console.error('Erro ao criar tarefa, código de status:', response.status);
      }
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
    }
    finally {
      setShowForm(false);
      setSalvando(false)
    }
  }

  const editTarefa = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSalvando(true)

    try {
      console.log("Tarefa a ser atualizada:", novaTarefa);
      await Api.put(`/tarefas/${novaTarefa.id}`, novaTarefa);
      setIsEditigng(false)
      fetchTarefas();
    } catch (error) {
      console.error('Erro ao editar a tarefa:', error);
    }
    finally {
      setShowForm(false);
      setSalvando(false)
    }
  }

  const deletar = async (id: string) => {
    try {
      await Api.delete(`/tarefas/${id}`);
      fetchTarefas();
    } catch (error) {
      console.error('Erro ao excluir o tarefa:', error);
    }
    fetchTarefas();

  };

  const PreencherForm = (tarefa: TarefasProps) => {
    setShowForm(true)
    setIsEditigng(true)
    setNovaTarefa({
      id: tarefa.id,
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      cor: tarefa.cor,
      corTexto: tarefa.corTexto,
      concluida: tarefa.concluida,
    });
  };

  const concluir = async (id: string) => {
    try {
      await Api.put(`/concluir/${id}`);
      fetchTarefas();
    } catch (error) {
      console.error('Erro ao excluir o tarefa:', error);
    }
  }

  function limpar() {
    setNovaTarefa({
      id: "",
      titulo: "",
      descricao: "",
      cor: "#000000",
      corTexto: "#ffffff",
      concluida: false,
    })
    setIsEditigng(false)
  }

  useEffect(() => {
    fetchTarefas()
  }, [])

  return (
    <>
      <header>
        <nav className='flex items-center bg-slate-700 text-white justify-between p-4'>
          <h1 className='text-2xl lg:text-4xl font-semibold flex items-center gap-2'><FaTasks /> Tarefas </h1>
          <Button onClick={handleClick} className='criar-tarefa bg-slate-500 sm:text-md p-2 rounded-lg justify-between  flex items-center gap-2'>
            <span className='text-sm lg:text-xl'>Criar Tarefas</span>
            <FaPlus size={20} />
          </Button>
        </nav>
      </header>
      <main>
        {showForm && (
          <div className={`transition-all duration-500 ${add ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'} relative overflow-hidden`}>
            <>
              <form onSubmit={isEditing ? (editTarefa) : (addTarefa)} className='flex flex-col mt-4'>

                <div className='flex justify-evenly items-center w-[96%] m-auto'>
                  <label className='flex flex-col text-left w-2/5'>
                    Titulo
                    <input
                      value={novaTarefa.titulo}
                      name='titulo'
                      onChange={handleInputChange}
                      type="text" maxLength={20}
                      className='bg-slate-200 focus:outline-none  px-2 w-full py-1 rounded-sm'

                    />
                  </label>
                  <label className='flex flex-col text-right w-2/5'>
                    Descrição
                    <input
                      onChange={handleInputChange}
                      name='descricao'
                      value={novaTarefa.descricao}
                      type="text" className='bg-slate-200 focus:outline-none  px-2 w-full py-1 rounded-sm'
                    />
                  </label>
                </div>
                <label className='text-lg flex items-center gap-2 m-auto mt-5'>
                  Cor do fundo:
                  <input
                    onChange={handleInputChange}
                    value={novaTarefa.cor}
                    name='cor'
                    className=' w-10 focus:outline-none   h-10 p-0 appearance-none bg-transparent cursor-pointer border-none rounded-sm'
                    type="color" />
                </label>
                <label className='text-lg flex items-center gap-2 m-auto mt-5 mb-2'>
                  Cor do Texto:
                  <input
                    onChange={handleInputChange}
                    value={novaTarefa.corTexto}
                    name='corTexto'
                    className=' w-10 focus:outline-none   h-10 p-0 appearance-none bg-transparent cursor-pointer border-none rounded-sm'
                    type="color" />
                </label>
                {isEditing ? (
                  <Button
                    type='submit'
                    className='bg-slate-400 w-4/6 lg:w-1/3  py-2 rounded-lg text-xl lg:text-2xl hover:bg-slate-500 transition-all m-auto text-white flex items-center justify-center gap-3'>
                    Editar tarefa <span><FaCheck /></span>
                  </Button>
                ) : (
                  <>
                    {salvando ? (
                      <>
                        <Button
                          type='submit'
                          disabled
                          className='bg-slate-400 w-4/6 lg:w-1/3  py-2 rounded-lg text-xl lg:text-2xl hover:bg-slate-500 transition-all m-auto text-white flex items-center justify-center gap-3'>
                          Salvando... <span><MdSave /></span>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type='submit'
                          className='bg-slate-400 w-4/6 lg:w-1/3  py-2 rounded-lg text-xl lg:text-2xl hover:bg-slate-500 transition-all m-auto text-white flex items-center justify-center gap-3'>
                          Salvar tarefa <span><MdSave /></span>
                        </Button>
                      </>
                    )}

                  </>
                )}
              </form>

              <div className='m-auto w-full flex flex-col items-center border-solid border-t border-slate-500 pt-2 my-10 relative'>
                <div className='flex absolute left left-0 items-center  gap-1 lg:gap-3 mx-4 text-sm  lg:text-xl cursor-pointer bg-slate-200 px-2 py-1 lg:p-4 rounded-lg'>
                  <p>Limpar</p>
                  <PiBroom onClick={limpar} />
                </div>
                <h3 className='font-light underline underline-offset-2 lg:text-3xl'>Veja como está ficando</h3>
                <div style={{ backgroundColor: novaTarefa.cor, color: novaTarefa.corTexto }} className=' rounded-md flex flex-col w-4/6 lg:w-1/3 mx-2 text-center mt-2 p-2 h-48 lg:h-80'>
                  <p className='text-2xl'>{novaTarefa ? (novaTarefa.titulo) : "Titulo"}</p>
                  <p className='text-sm'>{novaTarefa ? (novaTarefa.descricao) : "Descrição"}</p>
                </div>
              </div>
            </>
          </div>
        )}
        {!add && (
          <>
            <h1 className='text-center text-xl lg:text-3xl w-10/12 my-4 m-auto italic'>
              Para adicionar uma tarefa nova, clique em: "Criar Tarefas"
            </h1>
          </>
        )}
        <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 1000 320">
          <path fill="#94a3b8" fill-opacity="1" d="M0,160L40,144C80,128,160,96,240,112C320,128,400,192,480,224C560,256,640,256,720,234.7C800,213,880,171,960,154.7C1040,139,1120,149,1200,154.7C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
        </svg>

        <div className='flex flex-col relative bg-slate-400 pb-8  pt-3'>
          <h1 className='text-center text-4xl mt-4 text-white font-semibold mb-7'>Não concluidas</h1>
          <div className='flex-row flex flex-wrap justify-center'>
            {loading ? (
              <>
                <div className='flex justify-center gap-4 items-center'>
                  <Spinner />
                  <p className='text-white'>Carregando...</p>
                </div>
              </>
            ) : (
              <>
                {tarefas.map((tarefas) => (
                  <div key={tarefas.id} style={{ backgroundColor: tarefas.cor, color: tarefas.corTexto }} className=' rounded-md flex flex-col relative w-4/6 lg:w-1/3 mx-2 text-center mt-2 p-2 h-48 lg:h-80'>
                    <p className='text-sm font-bold lg:text-3xl '>{tarefas.titulo}</p>
                    <p className='text-sm mt-2 w-5/6 m-auto'>{tarefas.descricao}</p>
                    <Deletar onClick={() => deletar(tarefas.id)} />
                    <p onClick={() => PreencherForm(tarefas)} className='absolute right-2 top-2 cursor-pointer  text-yellow-300 flex gap-2 text-2xl lg:text-4xl hover:text-yellow-100 transition-all'><MdEdit /></p>
                    <Concluir onClick={() => concluir(tarefas.id)} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 320"><path fill="#94a3b8" fill-opacity="1" d="M0,128L80,144C160,160,320,192,480,176C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>

        <div className='pb-40 bg-slate-50'>
          <h1 className='text-center text-4xl mt-4 text-black font-semibold mb-7'>Concluidas</h1>
          <div className='flex-row flex flex-wrap justify-center'>
            {loading ? (
              <>
                <div className='flex justify-center gap-4 items-center'>
                  <Spinner />
                  <p className='text-black'>Carregando...</p>
                </div>

              </>
            ) : (
              <>
                {
                  tarefasN.map((tarefas) => (
                    <div key={tarefas.id} style={{ backgroundColor: tarefas.cor, color: tarefas.corTexto }} className='opacity-60 rounded-md flex flex-col relative w-4/6 lg:w-1/3 mx-2 text-center mt-2 p-2 h-48 lg:h-80'>
                      <p className='text-sm font-bold lg:text-3xl '>{tarefas.titulo}</p>
                      <p className='text-sm mt-2 w-5/6 m-auto'>{tarefas.descricao}</p>
                      <Deletar onClick={() => deletar(tarefas.id)} />
                    </div>
                  ))
                }
              </>
            )}
          </div>
        </div>
        <footer className='bg-black p-8 items-center text-white flex justify-between'>
          <p className='text-xl'>Eduardo Borges &copy;</p>
          <a href='https://github.com/duduborges' target='_blank'><TbBrandGithubFilled size={30} /></a>
        </footer>
      </main >


    </>
  )
}

export default App
