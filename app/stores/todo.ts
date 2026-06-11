import type { Todo } from '~/types/app';

// Pinia Docs https://pinia.vuejs.org/ssr/nuxt.html
export const useTodoStore = defineStore('todo', () => {

const toast = useToast()

const todos = ref<Todo[]>([
  {
    id: 1,
    title: 'Todo 1',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    is_completed: false,
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
  },
  {
    id: 2,
    title: 'Todo 2',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    is_completed: true,
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
  },
  {
    id: 3,
    title: 'Todo 3',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    is_completed: false,
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
  },
  {
    id: 4,
    title: 'Todo 4',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    is_completed: true,
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
  },
  {
    id: 5,
    title: 'Todo 5',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    is_completed: false,
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
  },
  {
    id: 6,
    title: 'Todo 6',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
    is_completed: true,
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
  },
])

const completedTodos = computed(() => {
  return todos.value.filter((todo) => todo.is_completed)
})

const pendingTodos = computed(() => {
  return todos.value.filter((todo) => !todo.is_completed)
})


const changeStatusCheck = (id: number) => {
  const todo = todos.value.find((todo) => todo.id === id)
  if (todo) {
    toast.add({
      title: todo.is_completed ?  `${todo.title} pending` : `${todo.title} completed`,
      // description: todo.is_completed ? 'Todo changed to pending successfully' : 'Todo completed successfully',
      color: todo.is_completed ? 'error' : 'success',
      duration: 3000
    })
    todo.is_completed = !todo.is_completed
  }
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
  toast.add({
    title: 'Todo removed',
    description: 'Todo removed successfully',
    color: 'success',
  })
}


return {
  todos,
  completedTodos,
  pendingTodos,
  changeStatusCheck,
  removeTodo
}
})

