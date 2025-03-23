import { CountryListProps } from '$/types';

import Countrycard from './countrycard';

export function CountryList({ countries }: CountryListProps) {
  return (
    <>
      {countries.map((country) => (
        <Countrycard key={country.cca2} country={country} />
      ))}
    </>
  );
}
