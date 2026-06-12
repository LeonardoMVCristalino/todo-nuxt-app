<script setup lang="ts">
// import { useTodoStore } from '~/stores/todo'
import type { Todo, Colors } from '~/types/app'

const toast = useToast()

// const { changeStatusCheck, removeTodo } = useTodoStore()

const store = useTodoAxiosStore()

const { openDetails } = useTodoUi()

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

const handleDelete = () => {
  store.removeItem(props.id)
  toast.add({
    title: 'Eliminado',
    description: 'Tarea eliminada correctamente'
  })
}

const handleUpdate = () => {
  store.updateItem(props.id, {
    is_completed: !props.is_completed
  })
  toast.add({
    title: 'Actualizado',
    description: 'Tarea actualizada correctamente'
  })
}
</script>

<template>
  <UCard
    :ui="{
      root: ''
    }"
    :class="hoverClass"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @dblclick="openDetails(props.id)"
  >
    <template #header>
      <div class="flex justify-between  items-center">
        <div class="flex gap-5 items-center">
          <UButton
            size="xl"
            :icon="isCompleted.icon"
            :color="'info'"
            variant="link"
            @click="handleUpdate"
          />
          <div :class="props.is_completed ? 'text-lg line-through' : 'text-lg font-bold'">
            {{ props.title }}
          </div>
        </div>
        <UButton
          size="xl"
          icon="lucide:trash"
          color="error"
          variant="solid"
          @click="handleDelete"
        />
      </div>
    </template>
    <!-- <template v-if="isHovered" #default>
      <div :class="isHovered ? 'block' : 'hidden'">
        <p class="text-neutral-400">{{ props.description }}</p>
      </div>
    </template> -->
  </UCard>
</template>
