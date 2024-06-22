//эмулирую стор пользователя, который работает

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IUser } from './user.types';
import userAvatar from '@/assets/img/avatar.jpg';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>({} as IUser);

  //например после получения данных
  user.value = {
    userName: 'Sergey',
    userRole: 'Frontend-developer',
    userLink: 'https://hh.ru/resume/1089880fff0b39c7970039ed1f695830564666',
    userAvatar,
  };
  return { user };
});
