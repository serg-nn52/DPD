import type { tableFields } from './persons.data';

export interface IPerson {
  id: string;
  avatar: string;
  name: string;
  gender: string;
  country: string;
  dob: string;
  email: string;
  phone: string;
}
export type TSortableMethod = 'down' | 'up';

export type TFieldsType = keyof typeof tableFields;
