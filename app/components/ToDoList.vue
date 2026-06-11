<script setup lang="ts">
// import { useTodoStore } from '~/stores/todo';
import type { Todo } from '~/types/app';

const store = useTodoStore()

</script>

<template>
  <div class="flex flex-col gap-1" v-for="todo in store.todos" :key="todo.id">
    <TodoCard v-bind="todo" />
  </div>
</template>
