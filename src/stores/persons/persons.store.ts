import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { IDataPersons } from '@/data/api.types';
import data from '@/data/api.json';
import type { IPerson } from './persons.types';
import { useRoute, useRouter } from 'vue-router';

export const usePersonsStore = defineStore('persons', () => {
  const router = useRouter();
  const route = useRoute();

  const persons = ref<IPerson[]>({} as IPerson[]);
  const isLoading = ref(false);
  const searchWords = ref((route.query.filter as string) || '');

  //реализую поиск по введенным словам
  const filteredPersons = computed(() => {
    const tempArr = persons.value.filter((el) => {
      const tempEl = { ...el };
      //чтобы не было поиска по этим полям
      tempEl.id = '';
      tempEl.avatar = '';

      return Object.values(tempEl).join('~').toUpperCase().includes(searchWords.value.toUpperCase());
    });
    if (searchWords.value) {
      router.push({
        query: {
          ...route.query,
          filter: searchWords.value,
        },
      });
    } else {
      const query = { ...route.query };
      delete query.filter;
      router.push({
        query,
      });
    }
    return tempArr;
  });

  //эмулирую метод получения данных
  const fetchPersons = () => {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
      persons.value = (data as IDataPersons).results.map((el) => {
        return {
          id: el.id.value,
          avatar: el.picture.medium,
          name: `${el.name.title} ${el.name.first} ${el.name.last}`,
          gender: el.gender,
          country: el.location.country,
          dob: el.dob.date.split('T')[0],
          email: el.email,
          phone: el.phone,
        };
      });
    }, 2000);
  };

  return { persons, isLoading, fetchPersons, searchWords, filteredPersons };
});
