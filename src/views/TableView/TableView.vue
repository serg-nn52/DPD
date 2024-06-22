<template>
  <div class="table-container">
    <h1 class="title">Staff</h1>
    <InputSearch class="search" />
    <h2 class="mobile-info" v-if="device === 'mobile'">Sorry, the mobile version of the table is under development!</h2>
    <PersonsTable v-else />
  </div>
</template>

<script setup lang="ts">
import PersonsTable from '@/widgets/PersonsTable/PersonsTable.vue';
import InputSearch from '@/widgets/InputSearch/InputSearch.vue';
import { useMedia } from '@/composables/useMedia';

const { device } = useMedia();
</script>

<style lang="scss" src="./TableView.style.scss" scoped></style>
