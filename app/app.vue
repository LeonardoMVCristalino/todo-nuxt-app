<script setup>

// toast position
// https://ui.nuxt.com/docs/components/toast#duration
</script>

<template>

  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLayout>
      <NuxtPage />

    </NuxtLayout>
  </UApp>
</template>
