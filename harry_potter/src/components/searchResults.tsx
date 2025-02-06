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
      <>
        <div className="search_result">
          <div className="character table_head">
            <p className="character_name">Character name</p>
            <p className="character_description">
              More information about character
            </p>
          </div>
          {charactersList.map((character: Character) => {
            return (
              <ResultItemComponent key={character.id} character={character} />
            );
          })}
        </div>
      </>
    );
  }
}
