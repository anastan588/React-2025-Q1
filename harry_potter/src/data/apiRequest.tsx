import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CharactersResponse } from '$/types';
import { CharacterResponse, SearchPropsForCharacters } from '$/types/types';

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
    }),
    getCharacterById: builder.query<CharacterResponse, string>({
      query: (detailedId: string) => {
        console.log(detailedId);
        return `characters/${detailedId}`;
      },
    }),
  }),
});
