import { Component } from 'react';
import { Api } from '../api/api';
import { SearchState } from '../types/types';

export class SearchFieldComponent extends Component<object, SearchState> {
  api: Api;
  constructor(props: object) {
    super(props);
    console.log(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      charactersList: [],
      loading: false,
    };
    this.api = new Api();
  }

  async componentDidMount() {
    console.log(this.state);
    await this.api.fetchCharactersDataList(this.state);
  }
  handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
    console.log(this.state);
  };

  async requestForServer() {
    await this.api
      .fetchCharactersDataList(this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleSearch = async () => {
    await this.requestForServer();
  };

  render() {
    return (
      <>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchInputChange}
            placeholder="Search for chracters"
          />
          <button className="search-button" onClick={this.handleSearch}>
            Search
          </button>
        </div>
      </>
    );
  }
}
