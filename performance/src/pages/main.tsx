import { useEffect, useMemo, useState } from 'react';

import { fetchCountries } from '$/api/api';
import { Header } from '$/components/header';
import { CountryData } from '$/types/types';

function MainPage() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortCriterion, setSortCriterion] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('not sorting');

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
  }, []);
  console.log(countries);

  const filteredCountries = countries
    .filter((country) => {
      const matchesRegion =
        selectedRegion === 'All' || country.region === selectedRegion;
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'not sorting') return 0;
      let comparison = 0;
      if (sortCriterion === 'name') {
        comparison = a.name.common.localeCompare(b.name.common);
      } else if (sortCriterion === 'population') {
        comparison = a.population - b.population;
      }
      return sortOrder === 'ascending' ? comparison : -comparison;
    });

  const uniqueRegions = [
    'All',
    ...new Set(countries.map((country) => country.region)),
  ];

  const handleSortByName = () => {
    if (sortCriterion === 'name') {
      if (sortOrder === 'ascending') {
        setSortOrder('descending');
      } else if (sortOrder === 'descending') {
        setSortOrder('not sorting');
      } else {
        setSortOrder('ascending');
      }
    } else {
      setSortCriterion('name');
      setSortOrder('ascending');
    }
  };

  const handleSortByPopulation = () => {
    if (sortCriterion === 'population') {
      if (sortOrder === 'ascending') {
        setSortOrder('descending');
      } else if (sortOrder === 'descending') {
        setSortOrder('not sorting');
      } else {
        setSortOrder('ascending');
      }
    } else {
      setSortCriterion('population');
      setSortOrder('ascending');
    }
  };

  return (
    <div className="bg-primary flex h-full min-h-screen flex-col items-center bg-contain bg-center">
      <Header title_text={'Performance'} />
      <div className="flex flex-col p-5">
        <div className="text-text-primary bg-dark-green grid grid-cols-4 justify-items-center gap-2 p-2">
          <div className="flex items-center justify-center gap-2">
            <p>Country</p>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-[100px] p-2"
            />
            <button onClick={handleSortByName} className="flex items-center">
              {sortCriterion === 'name' && sortOrder === 'ascending' ? (
                <img src="up.png" alt="Ascending" className="max-w-10" />
              ) : sortCriterion === 'name' && sortOrder === 'descending' ? (
                <img src="down.png" alt="Descending" className="max-w-10" />
              ) : (
                <img src="updown.png" alt="Default" className="max-w-10" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            {' '}
            <p>Population</p>
            <button
              onClick={handleSortByPopulation}
              className="flex items-center"
            >
              {sortCriterion === 'population' && sortOrder === 'ascending' ? (
                <img src="up.png" alt="Ascending" className="max-w-10" />
              ) : sortCriterion === 'population' &&
                sortOrder === 'descending' ? (
                <img src="down.png" alt="Descending" className="max-w-10" />
              ) : (
                <img src="updown.png" alt="Default" className="max-w-10" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="region-select" className="text-white">
              Region:
            </label>
            <select
              id="region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-dark-green ml-2 p-2"
            >
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <p>Flag</p>
        </div>
        {filteredCountries.map((country) => (
          <div
            key={country.cca2}
            className="text-text-primary bg-dark-grey grid grid-cols-4 justify-items-center gap-2 pr-2 pl-2"
          >
            <p>{country.name.common}</p>
            <p>{country.population}</p>
            <p>{country.region}</p>
            <img src={country.flags.svg} className="max-h-6 max-w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
