<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <component :is="$route.meta.layout || 'div'">
      <RouterView />
    </component>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  min-height: 100vh;
  justify-content: space-between;
  flex-direction: column;
}
</style>
