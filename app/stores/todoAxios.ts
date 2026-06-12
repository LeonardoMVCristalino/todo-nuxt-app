import type { Todo } from '~/types/app'

// Pinia Docs https://pinia.vuejs.org/ssr/nuxt.html
export const useTodoAxiosStore = defineStore('todoAxios', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)

  const getClient = () => {
    const { $apiCrud } = useNuxtApp()
    return $apiCrud<Todo>('tasks')
  }

  const fetchAll = async () => {
    loading.value = true
    try {
      const client = getClient()
      const response = await client.getAll()
      console.log(response)
      todos.value = response.data
    } catch (error) {
      console.error('Error al cargar todos:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const createItem = async (payload: Partial<Todo>) => {
    const client = getClient()
    const newTodo = await client.create(payload)

    // Mutación del estado global en memoria
    todos.value.push(newTodo.data)
    return newTodo
  }

  const updateItem = async (id: number, payload: Partial<Todo>) => {
    const client = getClient()
    const updatedTodo = await client.update(id, payload)

    // Actualizar el elemento específico en el estado de Pinia
    fetchAll()
    return updatedTodo
  }

  const removeItem = async (id: number) => {
    const client = getClient()
    await client.remove(id)

    // Filtrado en memoria para actualizar la UI instantáneamente
    todos.value = todos.value.filter(item => item.id !== id)
  }

  return {
    todos,
    loading,
    fetchAll,
    createItem,
    updateItem,
    removeItem
  }
})
