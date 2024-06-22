<template>
  <header class="header">
    <div class="container">
      <router-link class="logo-link" to="/"><LogoHeader class="logo" /></router-link>
      <UserInfo :user="user" />
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoHeader from '@/assets/icons/logo.svg';
import UserInfo from '@/components/UserInfo/UserInfo.vue';
import { useUserStore } from '@/stores/user/user.store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
<style src="./PageHeader.style.scss" lang="scss" scoped></style>
