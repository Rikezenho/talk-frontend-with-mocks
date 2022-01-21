import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { removeTodo, toggleTodo } from '../../services/todo'

const Todo = ({
  id = '',
  isChecked = false,
  text = '',
  fetchTodos = () => {},
} = {}) => {
  const [localIsChecked, setLocalIsChecked] = useState(isChecked)

  const doToggle = (e) => {
    toggleTodo({ id, isChecked: e.target.checked })
      .then(() => {
        setLocalIsChecked(e.target.checked)
        fetchTodos()
      })
      .catch(() => toast.error('Error toggling todo status'))
  }

  const remove = () => {
    removeTodo({ id })
      .then(() => {
        fetchTodos()
      })
      .catch(() => toast.error('Error removing todo'))
  }

  useEffect(() => {
    setLocalIsChecked(isChecked)
  }, [isChecked])

  return (
    <div className="box">
      <div className="columns">
        <div className="column is-one-fifth">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={localIsChecked}
              onChange={doToggle}
            />
          </label>
        </div>
        <div className="column">{text}</div>
        <div className="column is-one-fifth">
          <AiFillDelete onClick={remove} />
        </div>
      </div>
    </div>
  )
}

export { Todo }
