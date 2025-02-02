import { Component } from 'react';
import { CharactersResponse } from '../types/types';

export const pageNumber = 1;
export const pageSize = 10;
export const urlGETSearchDefault = `https://api.potterdb.com/v1/characters?page[number]=${pageNumber}&page[size]=${pageSize}`;

export class Api extends Component {
  async fetchCharactersDataList(searchTerm: string) {
    const url =
      searchTerm === ''
        ? urlGETSearchDefault
        : `https://api.potterdb.com/v1/characters?filter[name_cont]=${searchTerm}&page[number]=${pageNumber}&page[size]=${pageSize}`;

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
      console.log(data.data);
      localStorage.setItem('searchTerm', searchTerm);
      return data.data; // Return the characters data
    } catch (error) {
      console.error('Fetch error:', error);
      return ['error']; // Return an empty array in case of an error
    }
  }
}
