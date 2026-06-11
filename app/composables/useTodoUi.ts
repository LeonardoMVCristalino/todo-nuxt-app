export const useTodoUi = () => {
  // useState garantiza que el estado sea único, global y seguro en SSR
  const isOpen = useState<boolean>('todo-slideover-is-open', () => false)
  const selectedTodoId = useState<number | null>('todo-slideover-selected-id', () => null)

  const openDetails = (todoId: number) => {
    selectedTodoId.value = todoId
    isOpen.value = true
  }

  const closeDetails = () => {
    isOpen.value = false
    // Esperamos a que termine la animación de Nuxt UI antes de limpiar el ID
    setTimeout(() => {
      if (!isOpen.value) selectedTodoId.value = null
    }, 300)
  }

  return {
    isOpen,
    selectedTodoId,
    openDetails,
    closeDetails
  }
}
