import './App.css';
import React from 'react';
import { SearchFieldComponent } from './components/searchField';
import { SearchResultsComponent } from './components/searchResults';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { State } from './types/types';
import { Api } from './api/api';

class App extends React.Component<State> {
  public state: State = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    charactersList: [],
    loading: false,
  };
  api = new Api(this.state.searchTerm);

  async componentDidMount() {
    await this.requestForServer();
  }

  async requestForServer() {
    this.setState({ loading: true });
    console.log(this.state.searchTerm);
    await this.api
      .fetchCharactersDataList(this.state.searchTerm)
      .then((response) => {
        console.log(response);
        this.setState({ charactersList: response, loading: false });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ loading: false });
      });
  }

  handleSearchTermChange = async (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
    console.log(this.state);
  };

  handleSearch = async () => {
    await this.requestForServer();
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="main_container">
          <Header></Header>
          <main className="main">
            <SearchFieldComponent
              searchTerm={this.state.searchTerm}
              onSearchTermChange={this.handleSearchTermChange}
              onSearch={this.handleSearch}
            />
            <SearchResultsComponent
              charactersList={this.state.charactersList}
            />
          </main>
          <Footer></Footer>
        </div>
      </>
    );
  }
}

export default App;
