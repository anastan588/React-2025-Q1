import {
  CharacterResponse,
  CharactersResponse,
  State,
  StateProps,
} from '$/types';

export async function requestForCharacters({ state, setState }: StateProps) {
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
    setState((prevState: State) => ({
      ...prevState,
      records: data.meta.pagination.records,
    }));
    return data.data;
  } catch (error) {
    console.error('Fetch error:', error);
    return ['error'];
  }
}

export async function handleRequestForCharacters({
  state,
  setState,
}: StateProps) {
  setState((prevState: State) => ({
    ...prevState,
    loading: true,
  }));
  try {
    const response = await requestForCharacters({ state, setState });
    if (response[0] === 'error') {
      throw new Error('Network response was not ok');
    }
    if (
      Array.isArray(response) &&
      response.every((item) => typeof item === 'object')
    ) {
      console.log(response);
      setState((prevState: State) => ({
        ...prevState,
        charactersList: response,
      }));
      setState((prevState: State) => ({
        ...prevState,
        loading: false,
      }));
      console.log(state);
    }
  } catch (error) {
    console.log(error);
    setState((prevState: State) => ({
      ...prevState,
      showErrorModal: true,
    }));
    setState((prevState: State) => ({
      ...prevState,
      loading: false,
    }));
    setState((prevState: State) => ({
      ...prevState,
      error: {
        message: 'Network response was not ok',
      },
    }));
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
