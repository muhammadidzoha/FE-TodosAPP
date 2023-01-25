import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TodosDetail = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState({});
    const history = useNavigate();

    useEffect(() => {
        getData();
    });

    const handleEdit = () => {
        history(`/todos/${id}/edit`);
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            history('/');
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/todos/${id}`);
            setTodo(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='text-3xl text-white bg-indigo-500 h-20 flex justify-center items-center'>
                <h1>Todos List</h1>
            </div>
            <div className='m-4 grow h-fit bg-[#f8f9fa] p-4 border rounded-lg'>
                <div>
                    <h3 className="text-6xl font-bold mb-3">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {todo.name}
                    </h3>
                </div>
                <p className="text-xl">{todo.description}</p>
            </div>
            <div className='flex'>
                <button
                    type="submit"
                    className="group relative h-fit m-4 w-[50%] flex justify-center rounded-md border border-[#9475EA] bg-[#f8f9fa] py-2 px-4 text-sm font-medium hover:bg-[#F5F1FF] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleEdit}>
                    Edit
                </button>
                <button
                    type="submit"
                    className="group relative h-fit m-4 w-[50%] flex justify-center rounded-md border border-[#9475EA] bg-[#f8f9fa] py-2 px-4 text-sm font-medium hover:bg-[#F5F1FF] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleDelete}>
                    Hapus
                </button>
            </div>
        </>
    );
};

export default TodosDetail;
