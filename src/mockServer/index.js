import { createServer } from 'miragejs'

let data = [
  { id: 1, text: 'Comprar leite', isChecked: false },
  { id: 2, text: 'Comprar chocolate', isChecked: true },
  { id: 3, text: 'Comprar manga', isChecked: false },
]

const startMockServer = () => {
  createServer({
    routes() {
      this.urlPrefix = 'http://localhost:9999'

      this.get('todos', () => data)

      this.post('todos', (schema, request) => {
        const { text = '' } = JSON.parse(request.requestBody || '{}')
        data.push({ id: data[data.length - 1].id + 1, text, isChecked: false })
        return data
      })

      this.patch('todos/:id', (schema, request) => {
        const { isChecked } = JSON.parse(request.requestBody || '{}')
        const { id } = request.params
        data = data.map((item) => ({
          ...item,
          isChecked: +item.id === +id ? isChecked : item.isChecked,
        }))
        return data
      })

      this.delete('todos/:id', (schema, request) => {
        const { id } = request.params
        data = data.filter((item) => +item.id !== +id)
        return data
      })

      this.passthrough()
    },
  })
}

export { startMockServer }
