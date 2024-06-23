<template>
  <div class="header-cell">
    <slot></slot>
    <template v-if="isShowArrow">
      {{ ' ' }}
      <ArrowDown v-if="sortableMethod === 'down'" />
      <ArrowUp v-if="sortableMethod === 'up'" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import ArrowUp from '@/assets/icons/arrowUp.svg';
import ArrowDown from '@/assets/icons/arrowDown.svg';
import type { ISortableCellProps } from './SortableCell.types';

defineProps<ISortableCellProps>();
</script>

<style src="./SortableCell.style.scss" lang="scss" scoped></style>
