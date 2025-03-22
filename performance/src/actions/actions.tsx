import { CountryData } from '$/types';

export const filterAndSortCountries = (
  countries: CountryData[],
  searchQuery: string,
  selectedRegion: string,
  sortOrder: 'ascending' | 'descending' | 'not sorting',
  sortCriterion: string
): CountryData[] => {
  const filteredCountries = countries.filter((country) => {
    const matchesRegion =
      selectedRegion === 'All' || country.region === selectedRegion;
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });
  if (sortOrder === 'not sorting') return filteredCountries;
  return [...filteredCountries].sort((a, b) => {
    const comparison =
      sortCriterion === 'population'
        ? a.population - b.population
        : a.name.common.localeCompare(b.name.common);

    return sortOrder === 'ascending' ? comparison : -comparison;
  });
};

export const getUniqueRegions = (countries: CountryData[]): string[] => {
  return ['All', ...new Set(countries.map((country) => country.region))];
};

export const toggleSortOrder = (
  sortCriterion: string,
  currentSortOrder: 'ascending' | 'descending' | 'not sorting',
  newCriterion: string
): {
  newSortOrder: 'ascending' | 'descending' | 'not sorting';
  newSortCriterion: string;
} => {
  if (sortCriterion === newCriterion) {
    const newSortOrder =
      currentSortOrder === 'ascending'
        ? 'descending'
        : currentSortOrder === 'descending'
          ? 'not sorting'
          : 'ascending';
    return { newSortOrder, newSortCriterion: sortCriterion };
  } else {
    return { newSortOrder: 'ascending', newSortCriterion: newCriterion };
  }
};
