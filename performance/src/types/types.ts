export interface HeaderProps {
  title_text: string;
}

interface NativeName {
  official: string;
  common: string;
}

interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface Idd {
  root: string;
  suffixes: string[];
}

interface Demonyms {
  [key: string]: {
    f: string;
    m: string;
  };
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

interface Flags {
  png: string;
  svg: string;
}

interface CapitalInfo {
  latlng: number[];
}

export interface CountryData {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: NativeName;
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  languages: {
    [key: string]: string;
  };
  translations: {
    [key: string]: NativeName;
  };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: Record<string, unknown>;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
}

export interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export interface SortButtonProps {
  label?: string;
  sortCriterion: string;
  sortOrder: string;
  setSortCriterion: (criterion: string) => void;
  onSort: () => void;
}

export interface RegionSelectorProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  uniqueRegions: string[];
}

export interface CountryListProps {
  countries: CountryData[];
  onVisitToggle: (countryCode: string) => void;
  visitedCountries: string[];
}

export interface CountryCardProps {
  country: CountryData;
  onVisitToggle: (countryCode: string) => void;
  isVisited: boolean;
}
