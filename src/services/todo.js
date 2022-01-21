import axios from 'axios'

const todosService = axios.create({
  baseURL: 'http://localhost:9999/',
  timeout: 1000,
})

const getTodos = () => todosService.get('todos')
const addTodo = ({ text } = {}) => todosService.post('todos', { text })
const toggleTodo = ({ id, isChecked } = {}) =>
  todosService.patch(`todos/${id}`, { isChecked })
const removeTodo = ({ id } = {}) => todosService.delete(`todos/${id}`)

export { getTodos, addTodo, toggleTodo, removeTodo }
