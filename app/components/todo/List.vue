<script setup lang="ts">
const store = useTodoAxiosStore()
</script>

<template>
  <div
    v-for="todo in store.todos"
    :key="todo.id"
    class="flex flex-col gap-1"
  >
    <UTooltip text="Doble click para abrir detalles">
      <TodoCard v-bind="todo" />
    </UTooltip>
  </div>
</template>
