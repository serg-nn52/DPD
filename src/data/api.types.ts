type TGender = 'male' | 'female';

interface IName {
  title: string;
  first: string;
  last: string;
}

export interface IFetchedPerson {
  email: string;
  gender: TGender;
  name: IName;
  location: {
    country: string;
  };
  dob: {
    date: string;
  };
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  id: {
    value: string;
  };
}

export interface IDataPersons {
  info: unknown;
  results: IFetchedPerson[];
}
