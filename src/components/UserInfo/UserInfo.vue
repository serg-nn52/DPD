<template>
  <a class="user__wrapper" target="_blank" :href="user.userLink">
    <div class="user__info">
      <p class="user__name">{{ user.userName }}</p>
      <p class="user__role">{{ user.userRole }}</p>
    </div>
    <img class="avatar" :src="user.userAvatar" alt="avatar" />
  </a>
</template>

<script lang="ts" setup>
import type { IUserInfoProps } from './UserInfo.types';

defineProps<IUserInfoProps>();
</script>

<style src="./UserInfo.style.scss" lang="scss" scoped></style>
