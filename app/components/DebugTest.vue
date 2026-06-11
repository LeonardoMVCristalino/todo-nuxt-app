<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
const isDev = import.meta.env.DEV
</script>

<template>
  <div v-if="isDev">
    <UCard :title="title">
      <slot></slot>

    </UCard>

  </div>
</template>