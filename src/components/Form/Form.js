import { useState } from 'react'
import { toast } from 'react-toastify'
import { addTodo } from '../../services/todo'

const Form = ({ fetchTodos = () => {} } = {}) => {
  const [todoText, setTodoText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo({ text: todoText })
      .then(() => {
        fetchTodos()
        setTodoText('')
      })
      .catch((e) => {
        console.error(e.message)
        toast.error('Error creating todos')
      })
  }

  return (
    <form onSubmit={handleSubmit} style={{ paddingBottom: '20px' }}>
      <div className="box">
        <input
          name="todoText"
          className="input"
          type="text"
          placeholder="Text input"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        ></input>
      </div>
    </form>
  )
}

export { Form }
