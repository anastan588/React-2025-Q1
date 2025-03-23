import React from 'react';

import { CountryCardProps } from '$/types';

function CountryCard({ country, onVisitToggle, isVisited }: CountryCardProps) {
  return (
    <div
      className={`text-text-primary ${isVisited ? 'bg-light-green border-1 border-dotted' : 'bg-dark-grey'} grid grid-cols-[50px_1fr_1fr_1fr_0.5fr] justify-items-center pr-2 pl-2`}
    >
      <input
        type="checkbox"
        checked={isVisited}
        onChange={() => onVisitToggle(country.cca2)}
      />
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
