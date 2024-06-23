import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { IDataPersons } from '@/data/api.types';
import data from '@/data/api.json';
import type { IPerson, TFieldsType, TSortableMethod } from './persons.types';
import { useRoute, useRouter } from 'vue-router';
import { tableFields } from './persons.data';

export const usePersonsStore = defineStore('persons', () => {
  const TOTAL_ELEMENTS_ON_PAGE = 20;

  const router = useRouter();
  const route = useRoute();

  const persons = ref<IPerson[]>([] as IPerson[]);
  const isLoading = ref(false);

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

  //реализую поиск по введенным словам
  //заберу данные из query-параметров
  const searchWords = ref((route.query.filter as string) || '');

  const filteredPersons = computed(() => {
    const tempArr = persons.value.filter((el) => {
      const tempEl = { ...el };
      //чтобы не было поиска по этим полям
      tempEl.id = '';
      tempEl.avatar = '';

      return Object.values(tempEl).join('~').toUpperCase().includes(searchWords.value.toUpperCase());
    });

    //при поиске показываем результаты с 1 страницы, как один из вариантов реализации
    watch(searchWords, () => {
      setCurrentPage(1);
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
    });

    //сортировка по выбранным значениям

    tempArr.sort((a, b) => {
      const key = tableFields[sortableField.value as TFieldsType] as keyof IPerson;
      //если сортировка по имени - сортирую по фамилии, третье слово в строке, индекс 2
      if (key === 'name') {
        if (a[key].split(' ')[2] > b[key].split(' ')[2]) {
          return sortableMethod.value === 'down' ? 1 : -1;
        }
        if (a[key].split(' ')[2] < b[key].split(' ')[2]) {
          return sortableMethod.value === 'down' ? -1 : 1;
        } else return 0;
      }
      //обычная сортировка
      if (a[key] > b[key]) {
        return sortableMethod.value === 'down' ? 1 : -1;
      }
      if (a[key] < b[key]) {
        return sortableMethod.value === 'down' ? -1 : 1;
      } else return 0;
    });

    return tempArr;
  });

  //добавляю пагинацию
  const currentPage = ref(+(route.query.page as string) || 1);
  const totalPage = computed(() => Math.ceil(filteredPersons.value.length / TOTAL_ELEMENTS_ON_PAGE));
  //диапазон
  const maxNumberPerson = computed(() => currentPage.value * TOTAL_ELEMENTS_ON_PAGE - 1);
  const minNumberPerson = computed(() => currentPage.value * TOTAL_ELEMENTS_ON_PAGE - TOTAL_ELEMENTS_ON_PAGE);

  //массив с учетом пагинации
  const filteredPersonsWithPagination = computed(() => {
    return filteredPersons.value.slice(minNumberPerson.value, maxNumberPerson.value + 1);
  });

  //метод для установки выбранной страницы
  const setCurrentPage = (page: number) => (currentPage.value = page);

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

  //сортировка
  //получаю данные из роута
  const sortableField = ref(route.query.sortableField || '');
  const sortableMethod = ref<TSortableMethod>((route.query.sortableMethod as TSortableMethod) || 'down');

  //вспомогательный метод переключения направления сортировки
  const toggleSortableMethod = () => {
    if (sortableMethod.value === 'down') return (sortableMethod.value = 'up');
    if (sortableMethod.value === 'up') return (sortableMethod.value = 'down');
  };

  const sortTable = (field: TFieldsType) => {
    //по аватарке не сортируем
    if (field === 'Avatar') return;
    field === sortableField.value ? toggleSortableMethod() : (sortableMethod.value = 'down');
    sortableField.value = field;
    router.push({
      query: {
        ...route.query,
        sortableField: sortableField.value,
        sortableMethod: sortableMethod.value,
      },
    });
  };

  //сброс всех фильтров
  const resetFilters = () => {
    searchWords.value = '';
    sortableField.value = '';
    sortableMethod.value = 'down';
    setCurrentPage(1);
  };

  //сделаю сброс фильтров при переходе на / без фильтров, f.e. по клику на лого
  router.afterEach((to) => {
    if (to.fullPath === '/') resetFilters();
  });

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
    sortTable,
    sortableField,
    sortableMethod,
  };
});
