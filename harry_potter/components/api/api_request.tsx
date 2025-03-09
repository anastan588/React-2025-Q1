import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  CharacterResponse,
  CharactersResponse,
  SearchPropsForCharacters,
} from '$/components';

export const potterApi = createApi({
  reducerPath: 'potterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.potterdb.com/v1/`,
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<CharactersResponse, SearchPropsForCharacters>({
      query: (params) => {
        const { searchTerm = '', pageNumber, pageSize } = params;
        return `characters?filter[name_cont]=${searchTerm}&page[number]=${pageNumber}&page[size]=${pageSize}`;
      },
      keepUnusedDataFor: 0,
    }),
    getCharacterById: builder.query<CharacterResponse, string>({
      query: (detailedId: string) => {
        return `characters/${detailedId}`;
      },
      keepUnusedDataFor: 0,
    }),
  }),
});
