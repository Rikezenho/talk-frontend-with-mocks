import axios from 'axios'
import { REACT_APP_API_URL } from '../configs'

const todosService = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 1000,
})

const getTodos = () => todosService.get('todos')
const addTodo = ({ text } = {}) =>
  todosService.post('todos', { text, isChecked: false })
const toggleTodo = ({ id, isChecked } = {}) =>
  todosService.patch(`todos/${id}`, { isChecked })
const removeTodo = ({ id } = {}) => todosService.delete(`todos/${id}`)

export { getTodos, addTodo, toggleTodo, removeTodo }
