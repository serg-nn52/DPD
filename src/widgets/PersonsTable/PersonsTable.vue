<template>
  <div class="wrapper-table">
    <UILoader v-if="isLoading" />
    <div v-else-if="filteredPersons.length" class="table">
      <div class="table-header" onselectstart="return false" onmousedown="return false">
        <SortableCell v-for="(item, i) in tableHeaderData" :key="i">{{ item }}</SortableCell>
      </div>
      <div v-for="person in filteredPersons" :key="person.id" class="table-row">
        <img :src="person.avatar" alt="avatar" />
        <div class="row-date">{{ person.name }}</div>

        <div class="cell">{{ person.gender }}</div>
        <div class="cell">{{ person.country }}</div>
        <div class="cell">{{ person.dob }}</div>
        <div class="cell">{{ person.email }}</div>
        <div class="cell">{{ person.phone }}</div>
      </div>
    </div>
    <h2 class="not-found" v-else>No results found!</h2>
  </div>
</template>

<script lang="ts" setup>
import SortableCell from '@/components/SortableSell/SortableCell.vue';
import UILoader from '@/components/UILoader/UILoader.vue';
import { usePersonsStore } from '@/stores/persons/persons.store';
import { storeToRefs } from 'pinia';
import { tableHeaderData } from './PersonsTable.data';

const personsStore = usePersonsStore();
const { filteredPersons, isLoading } = storeToRefs(personsStore);
personsStore.fetchPersons();
</script>

<style src="./PersonsTable.style.scss" lang="scss" scoped></style>
