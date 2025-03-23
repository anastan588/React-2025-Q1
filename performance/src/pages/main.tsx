import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  filterAndSortCountries,
  getUniqueRegions,
  toggleSortOrder,
} from '$/actions';
import { fetchCountries } from '$/api';
import {
  CountryList,
  Header,
  RegionSelector,
  SearchInput,
  SortButton,
} from '$/components';
import { CountryData } from '$/types';

export function MainPage() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortCriterion, setSortCriterion] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<
    'ascending' | 'descending' | 'not sorting'
  >('not sorting');
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    getCountries();
    const storedVisited = localStorage.getItem('visitedCountries');
    if (storedVisited) {
      setVisitedCountries(JSON.parse(storedVisited));
    }
  }, []);

  const filteredCountries = useMemo(() => {
    return filterAndSortCountries(
      countries,
      searchQuery,
      selectedRegion,
      sortOrder,
      sortCriterion
    );
  }, [countries, searchQuery, selectedRegion, sortOrder, sortCriterion]);

  const uniqueRegions = useMemo(() => getUniqueRegions(countries), [countries]);

  const handleSortByName = useCallback(() => {
    const { newSortOrder, newSortCriterion } = toggleSortOrder(
      sortCriterion,
      sortOrder,
      'name'
    );
    setSortCriterion(newSortCriterion);
    setSortOrder(newSortOrder);
  }, [sortCriterion, sortOrder]);

  const handleSortByPopulation = useCallback(() => {
    const { newSortOrder, newSortCriterion } = toggleSortOrder(
      sortCriterion,
      sortOrder,
      'population'
    );
    setSortCriterion(newSortCriterion);
    setSortOrder(newSortOrder);
  }, [sortCriterion, sortOrder]);

  const handleVisitToggle = (countryCode: string) => {
    setVisitedCountries((prevVisited) => {
      const updatedVisited = prevVisited.includes(countryCode)
        ? prevVisited.filter((code) => code !== countryCode)
        : [...new Set([...prevVisited, countryCode])];
      localStorage.setItem('visitedCountries', JSON.stringify(updatedVisited));
      return updatedVisited;
    });
  };

  return (
    <div className="bg-primary flex h-full min-h-screen flex-col items-center bg-contain bg-center">
      <Header title_text={'Performance'} />
      <div className="flex flex-col p-5">
        <div className="text-text-primary bg-dark-green grid grid-cols-[50px_1fr_1fr_1fr_0.5fr] justify-items-center p-2">
          <p className="flex items-center justify-center">Visited</p>
          <div className="flex items-center justify-center gap-2">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <SortButton
              sortCriterion={sortCriterion}
              sortOrder={sortOrder}
              setSortCriterion={setSortCriterion}
              onSort={handleSortByName}
            />
          </div>
          <SortButton
            label="Population"
            sortCriterion={sortCriterion}
            sortOrder={sortOrder}
            setSortCriterion={setSortCriterion}
            onSort={handleSortByPopulation}
          />
          <RegionSelector
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            uniqueRegions={uniqueRegions}
          />
          <p className="flex items-center justify-center">Flag</p>
        </div>
        <CountryList
          countries={filteredCountries}
          onVisitToggle={handleVisitToggle}
          visitedCountries={visitedCountries}
        />
      </div>
    </div>
  );
}
