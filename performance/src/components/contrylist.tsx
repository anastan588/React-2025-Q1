import { CountryCard } from '$/components';
import { CountryListProps } from '$/types';

export function CountryList({
  countries,
  onVisitToggle,
  visitedCountries,
}: CountryListProps) {
  return (
    <>
      {countries.map((country) => (
        <CountryCard
          key={country.cca2}
          country={country}
          onVisitToggle={onVisitToggle}
          isVisited={visitedCountries.includes(country.cca2)}
        />
      ))}
    </>
  );
}
