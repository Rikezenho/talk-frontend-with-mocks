import { createServer } from 'miragejs'
import { REACT_APP_API_URL } from '../configs'

let data = [
  {
    id: 1,
    text: 'Comprar pão',
    isChecked: false,
  },
]

const startMockServer = () => {
  console.log('[!] Mock server started')

  createServer({
    routes() {
      this.urlPrefix = REACT_APP_API_URL

      this.get('/todos', () => data)

      let currentId = 2
      this.post('/todos', (schema, request) => {
        const { text } = JSON.parse(request.requestBody)
        const newData = {
          id: currentId,
          text,
          isChecked: false,
        }
        data.push(newData)
        currentId++
        return newData
      })

      this.patch('/todos/:id', (schema, request) => {
        const { id } = request.params
        const { isChecked } = JSON.parse(request.requestBody)

        data = data.map((item) => ({
          ...item,
          isChecked: +item.id === +id ? isChecked : item.isChecked,
        }))

        return data
      })

      this.delete('/todos/:id', (schema, request) => {
        const { id } = request.params

        data = data.filter((item) => +item.id !== +id)

        return data
      })
    },
  })
}

export { startMockServer }
