import {
  Character,
  CharacterResponse,
  CharactersResponse,
  State,
} from '../types/types';

async function requestForCharacters(state: State) {
  const url = `https://api.potterdb.com/v1/characters?filter[name_cont]=${state.searchTerm}&page[number]=${state.pageNumber}&page[size]=${state.pageSize}`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: CharactersResponse = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return ['error'];
  }
}

export async function handleRequestForCharacters(
  state: State,
  updateCharactesList: (newCharactes: Character[]) => void,
  updateLoading: (condition: boolean) => void,
  updateShowModal: (condition: boolean) => void,
  updateErrorMessage: (message: string, stack: string) => void
) {
  updateLoading(true);
  try {
    const response = await requestForCharacters(state);
    if (response[0] === 'error') {
      throw new Error('Network response was not ok');
    }
    if (
      Array.isArray(response) &&
      response.every((item) => typeof item === 'object')
    ) {
      updateCharactesList(response);
      updateLoading(false);
    }
  } catch (error) {
    console.log(error);
    updateLoading(false);
    updateShowModal(true);
    updateErrorMessage('Network response was not ok', '');
  }
}

export async function handleRequestCharacterDetails(id: string) {
  try {
    const response: CharacterResponse = await fetch(
      `https://api.potterdb.com/v1/characters/${id}`
    ).then((res) => res.json());
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
  }
}
