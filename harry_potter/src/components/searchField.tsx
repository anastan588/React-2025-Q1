import React from 'react';
import { Api } from '../api/api';
import { SearchTermProps, State } from '../types/types';

export class SearchFieldComponent extends React.Component<
  SearchTermProps,
  State
> {
  api: Api;
  searchTerm: string;
  constructor(props: SearchTermProps) {
    super(props);
    this.searchTerm = localStorage.getItem('searchTerm') || '';
    this.api = new Api(this.searchTerm);
  }

  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.searchTerm = event.target.value.toLowerCase();
    this.props.onSearchTermChange(this.searchTerm);
  };

  handleSearch = () => {
    this.props.onSearch();
  };

  render() {
    return (
      <>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={this.searchTerm}
            onChange={this.handleSearchInputChange}
            placeholder="Search for character"
          />
          <button className="search-button" onClick={this.handleSearch}>
            Search
          </button>
        </div>
      </>
    );
  }
}
