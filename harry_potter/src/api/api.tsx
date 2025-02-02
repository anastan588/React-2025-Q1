import { Component } from 'react';
import { Character, CharactersResponse } from '../types/types';

export const pageNumber = 1;
export const pageSize = 10;
export const urlGETSearchDefault = `https://api.potterdb.com/v1/characters?page[number]=${pageNumber}&page[size]=${pageSize}`;

export class Api extends Component {
  async fetchCharactersDataList(searchTerm: string) {
    const url =
      searchTerm === ''
        ? urlGETSearchDefault
        : `https://api.potterdb.com/v1/characters?filter[name_cont]=${searchTerm}&page[number]=${pageNumber}&page[size]=${pageSize}`;
    let result: Character[] = [];
    await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => {
        const responseResult = response.json();
        console.log(responseResult);
        return responseResult;
      })
      .then((data: CharactersResponse) => {
        console.log(data.data);
        localStorage.setItem('searchTerm', searchTerm);
        result = data.data;
        return data.data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return result;
  }
}
