<script setup lang="ts">
import { useTodoStore } from '~/stores/todo';
import type { Todo, Colors } from '~/types/app';

const { changeStatusCheck, removeTodo } = useTodoStore()

const { selectedTodoId, openDetails } = useTodoUi()

const props = defineProps<Todo>()

  // icons doc: https://lucide.dev/icons/circle
const isCompleted = computed<{ icon: string, color: Colors }>(() => {
  if (props.is_completed) {
    return { icon: 'i-lucide-circle-check', color: 'success' }
  }
  return { icon: 'i-lucide-circle', color: 'error' }
})


const isHovered = ref<boolean>(false)

// hover docs: https://mokkapps.de/vue-tips/detect-mouse-hover
const hoverClass = computed(() => {
  if (isHovered.value) {
    return 'transition-all duration-600 transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl dark:hover:bg-neutral-800 hover:bg-neutral-200'
  }
  return ''
})

</script>
<template>
  <UCard :ui="{
    root: ''
  }" 
  @mouseenter="isHovered = true" 
  @mouseleave="isHovered = false" 
  @click="openDetails(props.id)"
  :class="hoverClass">
    <template #header>
      <div class="flex justify-between  items-center">
        <div class="flex gap-5 items-center">
          <UButton size="xl" @click="changeStatusCheck(props.id)" :icon="isCompleted.icon" :color="'info'" variant="link" />
          <div :class="props.is_completed ? 'text-lg line-through' : 'text-lg font-bold'">{{ props.title }}</div>
        </div>
        <UButton @click="removeTodo(props.id)" size="xl" icon="lucide:trash" color="error" variant="solid" />
      </div>
    </template>
    <!-- <template v-if="isHovered" #default>
      <div :class="isHovered ? 'block' : 'hidden'">
        <p class="text-neutral-400">{{ props.description }}</p>
      </div>
    </template> -->
  </UCard>
</template>
