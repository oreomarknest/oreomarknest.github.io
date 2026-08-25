<template>
  <span class="brand-logo" aria-hidden="true">
    <img :src="logoSrc" alt="">
  </span>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const logoSrc = `${config.app.baseURL}marknest-logo-outline.svg`
</script>
