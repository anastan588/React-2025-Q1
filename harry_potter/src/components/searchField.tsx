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
      <div className="flex justify-center gap-5">
        <input
          className="p-2.5 px-6 rounded-lg text-lg bg-white"
          type="text"
          value={this.searchTerm}
          onChange={this.handleSearchInputChange}
          placeholder="Search for character"
        />
        <button
          className="p-2.5 px-6 rounded-lg bg-rose-400 text-lg text-white transform hover:scale-110 transition-transform duration-200 ease-in-out"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}
