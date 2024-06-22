import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { IDataPersons } from '@/data/api.types';
import data from '@/data/api.json';
import type { IPerson } from './persons.types';
import { useRoute, useRouter } from 'vue-router';

export const usePersonsStore = defineStore('persons', () => {
  const TOTAL_ELEMENTS_ON_PAGE = 20;

  const router = useRouter();
  const route = useRoute();

  const persons = ref<IPerson[]>([] as IPerson[]);
  const isLoading = ref(false);

  //заберу данные из query-параметров
  const searchWords = ref((route.query.filter as string) || '');
  const currentPage = ref(+(route.query.page as string) || 1);

  const totalPage = computed(() => Math.ceil(filteredPersons.value.length / TOTAL_ELEMENTS_ON_PAGE));

  const setCurrentPage = (page: number) => (currentPage.value = page);

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

  //добавляю пагинацию
  const filteredPersonsWithPagination = computed(() => {
    return filteredPersons.value.filter((el, i) => {
      const maxNumber = currentPage.value * TOTAL_ELEMENTS_ON_PAGE;
      const minNumber = currentPage.value * TOTAL_ELEMENTS_ON_PAGE - TOTAL_ELEMENTS_ON_PAGE + 1;

      if (i + 1 >= minNumber && i + 1 <= maxNumber) return el;
    });
  });

  //убираю ситуацию, когда currentPage становится больше итогового количества страниц
  watch(totalPage, (val) => {
    if (currentPage.value > val && val > 0) currentPage.value = val;
  });

  //добавляем в параметры к роуту
  watch(currentPage, (val) => {
    if (val && val > 1) {
      router.push({
        query: {
          ...route.query,
          page: val,
        },
      });
    } else {
      const query = { ...route.query };
      delete query.page;
      router.push({
        query,
      });
    }
  });

  //при поиске показываем результаты с 1 страницы, как один из вариантов реализации
  watch(searchWords, () => {
    setCurrentPage(1);
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

  return {
    persons,
    isLoading,
    fetchPersons,
    searchWords,
    filteredPersons,
    setCurrentPage,
    currentPage,
    totalPage,
    filteredPersonsWithPagination,
  };
});
