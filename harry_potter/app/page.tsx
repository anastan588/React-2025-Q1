import { CharacterResponse } from '$/components';
import { MainPage } from '$/components/pages_templates';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = params.page || 1;
  const pageSize = params.pageSize || 30;
  const search = params.search || '';
  const details = params.details || '';

  let url = `https://api.potterdb.com/v1/characters?page[number]=${page}&page[size]=${pageSize}`;
  if (details !== '') {
    url = `https://api.potterdb.com/v1/characters/${details}`;
  } else if (search !== '') {
    console.log('search not null');
    url = `https://api.potterdb.com/v1/characters?filter[name_cont]=${search}&page[number]=${page}&page[size]=${pageSize}`;
  }
  console.log(url, 'urla');
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: CharacterResponse = await response.json();
    if (!data.data) {
      throw new Error('Invalid data format');
    }
    return <MainPage response={data} />;
  } catch (error) {
    console.error('Fetch error:', error);
    return ['error'];
  }
}
