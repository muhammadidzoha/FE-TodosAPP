import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TodosEdit = () => {
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

    const updateTodo = event => {
        event.preventDefault();

        if (!name || !description || !date) {
            return alert('Please fill all fields')
        }

        const data = {
            name,
            description,
            date
        }

        axios.put('http://localhost:5000/todos', data)
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
                    <form className="flex flex-col" onSubmit={updateTodo}>
                        <div className="flex flex-col">
                            <label className="mb-1 text-lg font-light">Nama</label>
                            <input type="text" className="bg-[#F5F1FF] border-2 border-[#9475EA] rounded-lg p-4 mb-2 text-2xl focus:outline-none" onChange={e => setName(e.target.value)} value={todos.name} />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-lg font-light">Deskripsi yang akan dilakukan</label>
                            <input type="text" className="bg-[#F5F1FF] border-2 border-[#9475EA] rounded-lg p-4 mb-2 text-2xl focus:outline-none" onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 text-lg font-light">Kapan akan dilakukan</label>
                            <input type="date" className="bg-[#F5F1FF] border-2 border-[#9475EA] rounded-lg p-4 mb-2 text-2xl focus:outline-none" onChange={e => setDate(e.target.value)} />
                        </div>
                        <input type="submit" value="Submit" className="w-fit border-2 border-[#9475EA] rounded-2xl text-2xl px-6 py-3 cursor-pointer self-end mt-auto" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default TodosEdit
