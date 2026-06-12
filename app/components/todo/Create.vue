<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emit = defineEmits<{ close: [boolean] }>()

const store = useTodoAxiosStore()

const schema = z.object({
  title: z.string('Invalid title').min(1, 'Title is required'),
  description: z.string('Description is required').min(1, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  title: undefined,
  description: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  await store.createItem(event.data)

  toast.add({
    title: 'Tarea agregada',
    description: '',
    color: 'success',
    duration: 3000
  })
  emit('close', true)
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 mx-auto"
    @submit="onSubmit"
  >
    <UFormField
      label="titulo"
      name="title"
    >
      <UInput v-model="state.title" />
    </UFormField>

    <UFormField
      label="Descripcion"
      name="description"
    >
      <UTextarea v-model="state.description" />
    </UFormField>

    <UButton type="submit">
      Guardar
    </UButton>
  </UForm>
</template>
