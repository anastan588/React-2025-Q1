import { Component } from 'react';
import { SearchResultsCharacterProps } from '../types/types';

export class ResultItemComponent extends Component<SearchResultsCharacterProps> {
  render() {
    const { character } = this.props;
    return (
      <>
        <div className="character">
          <p className="character_name">{character.attributes.name}</p>
          <a
            href={character.attributes.wiki}
            target="_blank"
            className="character_description"
            rel="noreferrer"
          >
            {character.attributes.wiki}
          </a>
        </div>
      </>
    );
  }
}
