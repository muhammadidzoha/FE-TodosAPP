import React from 'react'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import TodosDetail from './components/TodosDetail'
import TodosEdit from './components/TodosEdit'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/todos/:id' element={<TodosDetail />}></Route>
      <Route path='/todos/:id/edit' element={<TodosEdit />}></Route>
    </Routes>
  )
}

export default App