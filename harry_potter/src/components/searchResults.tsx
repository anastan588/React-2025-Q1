import React from 'react';
import {
  Character,
  SearchResultsCharacterListProps,
  State,
} from '../types/types';
import { ResultItemComponent } from './resultItem';

export class SearchResultsComponent extends React.Component<
  SearchResultsCharacterListProps,
  CharacterData,
  State
> {
  render() {
    const { charactersList } = this.props;
    return (
      <div className="w-full flex flex-col justify-start gap-2 ">
        <div className="w-full flex gap-7.5 border border-white p-2.5 px-4 justify-around rounded-2xl text-xl bg-rose-400 text-white">
          <p className="flex justify-center">Character name</p>
          <p className="flex">More information about character</p>
        </div>
        {charactersList.map((character: Character) => {
          return (
            <ResultItemComponent key={character.id} character={character} />
          );
        })}
      </div>
    );
  }
}
