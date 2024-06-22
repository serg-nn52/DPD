<template>
  <div v-if="totalPage > 1" class="pagination-wrapper">
    <div @click="setCurrentPage(i)" v-for="i in totalPage" :key="i" :class="classes(i)">{{ i }}</div>
  </div>
</template>

<script setup lang="ts">
import { usePersonsStore } from '@/stores/persons/persons.store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const personsStore = usePersonsStore();
const { currentPage, totalPage } = storeToRefs(personsStore);
const { setCurrentPage } = personsStore;
const classes = computed(() => {
  return (i: number) => ['pagination-element', { 'pagination-element__current': i === currentPage.value }];
});
</script>

<style lang="scss" src="./TablePagination.style.scss" scoped></style>
