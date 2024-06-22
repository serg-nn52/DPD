<template>
  <div @click="() => {}" class="header-cell">
    <slot></slot>
    <span v-show="true"
      >{{ ' ' }}<ArrowDown v-if="getSort.method === 'down'" /><ArrowUp v-if="getSort.method === 'up'"
    /></span>
  </div>
</template>

<script lang="ts" setup>
import ArrowUp from '@/assets/icons/arrowUp.svg';
import ArrowDown from '@/assets/icons/arrowDown.svg';

const getSort = {
  method: 'down',
};
</script>

<style src="./SortableCell.style.scss" lang="scss" scoped></style>
