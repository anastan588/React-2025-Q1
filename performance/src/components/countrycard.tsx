import React from 'react';

import { CountryCardProps } from '$/types';

function CountryCard({ country }: CountryCardProps) {
  return (
    <div
      key={country.cca2}
      className="text-text-primary bg-dark-grey grid grid-cols-4 justify-items-center gap-2 pr-2 pl-2"
    >
      <p>{country.name.common}</p>
      <p>{country.population.toLocaleString()}</p>
      <p>{country.region}</p>
      <img
        src={country.flags.svg}
        className="max-h-6 max-w-10"
        alt={`${country.name.common} flag`}
      />
    </div>
  );
}

export default React.memo(CountryCard);
