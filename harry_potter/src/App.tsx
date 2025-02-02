import './App.css';
import React from 'react';
import { SearchFieldComponent } from './components/searchField';
import { SearchResultsComponent } from './components/searchResults';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { State } from './types/types';
import { Api } from './api/api';
import { Spinner } from './components/spinner';
import { ErrorModal } from './components/errorModal';

class App extends React.Component<State> {
  public state: State = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    charactersList: [],
    loading: false,
    error: {
      message: '',
      stack: '',
    },
    showErrorModal: false,
  };
  api = new Api(this.state.searchTerm);

  async componentDidMount() {
    await this.requestForServer();
  }

  async requestForServer() {
    this.setState({
      loading: true,
      error: { message: '', stack: '' },
      showErrorModal: false,
    });
    try {
      const response = await this.api.fetchCharactersDataList(
        this.state.searchTerm
      );
      console.log(response.length, this.state.searchTerm.length);
      if (response[0] === 'error') {
        throw new Error('Network response was not ok');
      }
      this.setState({ charactersList: response, loading: false });
    } catch (error) {
      console.error('Error:', error);
      this.setState({
        loading: false,
        error: {
          message: 'Network response was not ok',
          stack: '',
        },
        showErrorModal: true,
      });
    }
  }

  handleSearchTermChange = async (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
    console.log(this.state);
  };

  handleSearch = async () => {
    await this.requestForServer();
  };

  closeError = () => {
    this.setState({ showErrorModal: false });
  };

  render() {
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
            {this.state.loading ? (
              <Spinner />
            ) : (
              <SearchResultsComponent
                charactersList={this.state.charactersList}
              />
            )}
          </main>
          <Footer></Footer>
        </div>
        {this.state.showErrorModal && (
          <ErrorModal error={this.state.error} onClose={this.closeError} />
        )}
      </>
    );
  }
}

export default App;
