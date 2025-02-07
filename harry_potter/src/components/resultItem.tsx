import { Component } from 'react';
import { SearchResultsCharacterProps } from '../types/types';

export class ResultItemComponent extends Component<SearchResultsCharacterProps> {
  render() {
    const { character } = this.props;
    return (
      <div className="flex gap-7.5 justify-around  border border-white p-1 px-4 bg-rose-300 text-lg">
        <p className="flex justify-center">{character.attributes.name}</p>
        <a
          href={character.attributes.wiki}
          target="_blank"
          className="flex text-teal-800 overflow-hidden truncate"
          rel="noreferrer"
        >
          {character.attributes.wiki}
        </a>
      </div>
    );
  }
}
