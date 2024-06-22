<template>
  <div class="search-field">
    <label for="search"><SearchIcon class="search-icon" /></label>
    <input
      type="text"
      class="search-input"
      id="search"
      placeholder="Search"
      v-model.trim="searchWords"
      @input="setFilters"
    />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/icons/search.svg';
import { usePersonsStore } from '@/stores/persons/persons.store';
import { storeToRefs } from 'pinia';

const personsStore = usePersonsStore();

const { searchWords } = storeToRefs(personsStore);

const setFilters = () => {};
</script>

<style src="./InputSearch.style.scss" lang="scss" scoped></style>
