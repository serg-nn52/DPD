<template>
  <div class="loader-wrapper">
    <img class="loader-img" :src="loaderImg" alt="Loading..." />
  </div>
</template>

<script setup lang="ts">
import loaderImg from '@/assets/img/loader-new.gif';
</script>

<style lang="scss" src="./UILoader.style.scss" scoped></style>
