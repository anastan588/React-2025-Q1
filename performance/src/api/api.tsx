import { CountryData } from '$/types/types';

export async function fetchCountries() {
  const url = `https://restcountries.com/v3.1/all`;

  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: CountryData[] = await response.json();
  console.log(data);
  return data;
}
