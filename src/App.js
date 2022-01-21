import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import { useEffect, useState } from 'react'

import { Todo } from './components/Todo'
import { Form } from './components/Form'
import { getTodos } from './services/todo'
import { toast, ToastContainer } from 'react-toastify'

const App = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    getTodos()
      .then(({ data } = {}) => setTodos(data))
      .catch(() => toast.error('Error getting todos'))
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="App">
      <h1 className="title">To-do App</h1>
      <Form fetchTodos={fetchTodos} />
      {todos.map(({ id, isChecked, text }) => (
        <Todo
          key={id}
          id={id}
          isChecked={isChecked}
          text={text}
          fetchTodos={fetchTodos}
        />
      ))}
      <ToastContainer />
    </div>
  )
}

export { App }
