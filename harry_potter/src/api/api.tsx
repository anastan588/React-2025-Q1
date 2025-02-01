import { SearchState } from '../types/types';

export const pageNumber = 1;
export const pageSize = 4;
export const urlGETSearchDefault = `https://api.potterdb.com/v1/characters?page[number]=${pageNumber}&page[size]=${pageSize}`;

export class Api {
  async fetchCharactersDataList(searchState: SearchState) {
    const url =
      searchState.searchTerm === ''
        ? urlGETSearchDefault
        : `https://api.potterdb.com/v1/characters?filter[name_cont]=${searchState.searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    }).then((response) => {
      const responseResult = response.json();
      console.log(responseResult);
      return responseResult;
    });
  }
}
