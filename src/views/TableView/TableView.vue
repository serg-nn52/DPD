<template>
  <div class="table-container">
    <h1 class="title">Staff</h1>
    <InputSearch class="search" />
    <PersonsTable />
  </div>
</template>

<script setup lang="ts">
import PersonsTable from '@/widgets/PersonsTable/PersonsTable.vue';
import InputSearch from '@/widgets/InputSearch/InputSearch.vue';
</script>

<style lang="scss" src="./TableView.style.scss" scoped></style>
