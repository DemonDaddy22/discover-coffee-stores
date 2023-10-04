interface IProps {}

interface IPropsWithChildren {
  children?: React.ReactNode;
}

interface ICoffeeStore {
  fsq_id: string;
  categories: Category[];
  chains: any[];
  distance: number;
  geocodes: Geocodes;
  link: string;
  location: Location;
  name: string;
  related_places: RelatedPlaces;
  timezone: string;
  description: string;
  images: Partial<{
    small: string | null;
    regular: string | null;
  }>;
}

interface Category {
  id: number;
  name: string;
  icon: Icon;
}

interface Icon {
  prefix: string;
  suffix: string;
}

interface Geocodes {
  main: Main;
}

interface Main {
  latitude: number;
  longitude: number;
}

interface Location {
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region: string;
}

interface RelatedPlaces {
  children: Child[];
}

interface Child {
  fsq_id: string;
  name: string;
}
