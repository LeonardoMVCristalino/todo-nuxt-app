<script setup lang="ts">
const store = useTodoAxiosStore()
await store.fetchAll()

// 2. Composable para la UI
const { isOpen, selectedTodoId, closeDetails } = useTodoUi()

// 3. Computed para obtener el objeto en tiempo real desde Pinia
const selectedTodo = computed(() => {
  return store.todos.find(t => t.id === selectedTodoId.value) || null
})

const handleRemove = () => {
  if (selectedTodoId.value) store.removeItem(selectedTodoId.value)
  closeDetails()
}

const handleUpdate = () => {
  if (selectedTodoId.value) store.updateItem(selectedTodoId.value, {
    is_completed: !selectedTodo.value?.is_completed
  })
  closeDetails()
}
</script>

<template>
  <div>
    <div class="w-1/2 mx-auto flex  justify-end gap-4 pt-10">
      <UModal title="Modal with title">
        <UButton
          label="Crear tarea"
          color="secondary"
          variant="solid"
        />
        <template #body="{ close }">
          <TodoCreate @close="close" />
        </template>
      </UModal>
    </div>
    <div class="w-1/2 mx-auto flex flex-col gap-4 py-10">
      <TodoList />
      <DebugTest title="Debug data">
        {{ store.todos }}
      </DebugTest>
    </div>
    <USlideover
      v-model:open="isOpen"
      side="right"
    >
      <template #title>
        <div class="flex items-center justify-center gap-3">
          <UButton
            variant="link"
            :icon="selectedTodo?.is_completed ? 'i-lucide-circle-check' : 'i-lucide-circle'"
            color="info"
            @click="handleUpdate"
          />
          <span :class="selectedTodo?.is_completed ? '' : 'line-through'">{{ selectedTodo?.title }}</span>
          <UBadge
            square
            :color="selectedTodo?.is_completed ? 'success' : 'error'"
            variant="solid"
          >
            {{ selectedTodo?.is_completed ? 'Completada' : 'Pendiente' }}
          </UBadge>
        </div>
      </template>
      <template #body>
        <div
          v-if="selectedTodo"
          class="p-6"
        >
          <p><b>Descripcion: </b></p>
          <p>{{ selectedTodo.description }}</p>
          <br>

          <p><b>Fecha creacion: </b>{{ fromNow(selectedTodo.created_at) }}</p>
          <br>

          <p><b>Fecha actualizacion: </b>{{ fromNow(selectedTodo.updated_at) }}</p>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-center w-full mx-auto p-3">
          <UButton
            label="Eliminar tarea"
            color="error"
            @click="handleRemove"
          />
        </div>
      </template>
    </USlideover>
  </div>
</template>
