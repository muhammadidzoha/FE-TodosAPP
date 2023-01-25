import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
    const [todos, setTodos] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await axios.get('http://localhost:5000/todos')
            .then(res => {
                setTodos(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const createTodo = event => {
        event.preventDefault();

        if (!name || !description || !date) {
            return alert('Please fill all fields')
        }

        const data = {
            name,
            description,
            date
        }

        axios.post('http://localhost:5000/todos', data)
            .then(response => {
                console.log(response.data);
                getData(); // to refresh the todos list
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <div className='text-3xl text-white bg-indigo-500 h-20 flex justify-center items-center'>
                <h1>Todos List</h1>
            </div>
            <div className="flex flex-col items-center">
                <div className="m-4 grow h-fit bg-[#f8f9fa] p-4 border rounded-lg w-[1024px]">
                    <h2 className="text-center text-2xl font-bold">Tambah yang harus dilakukan</h2>
                    <form className="flex flex-col" onSubmit={createTodo}>
                        <div className="flex flex-col">
                            <label className="mb-1 text-lg font-light">Nama</label>
                            <input type="text" className="bg-[#F5F1FF] border-2 border-[#9475EA] rounded-lg p-4 mb-2 text-2xl focus:outline-none" onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-lg font-light">Deskripsi yang akan dilakukan</label>
                            <input type="text" className="bg-[#F5F1FF] border-2 border-[#9475EA] rounded-lg p-4 mb-2 text-2xl focus:outline-none" onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-lg font-light">Kapan akan dilakukan</label>
                            <input type="date" className="bg-[#F5F1FF] border-2 border-[#9475EA] rounded-lg p-4 mb-2 text-2xl focus:outline-none" onChange={e => setDate(e.target.value)} />
                        </div>
                        <input type="submit" value="Tambah" className="w-fit border-2 border-[#9475EA] rounded-2xl text-2xl px-6 py-3 cursor-pointer self-end mt-auto" />
                    </form>
                </div>
                <div className='m-4 grow h-fit bg-[#f8f9fa] p-4 border rounded-lg w-[1024px]'>
                    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Daftar Todos</h2>
                        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {todos.map((todo) => (
                                <div key={todo.id} className="group relative">
                                    <Link to={`/todos/${todo.id}`}>
                                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden border rounded-lg drop-shadow-md bg-white group-hover:opacity-50 lg:aspect-none lg:h-80">
                                            <div className="mt-4 flex flex-col justify-center items-center m-4">
                                                <div>
                                                    <h3 className="text-md font-bold mb-3">
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {todo.name}
                                                    </h3>
                                                </div>
                                                <p className="text-sm">{todo.description}</p>
                                                <p className="text-sm absolute bottom-0 mb-5">{todo.date}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
