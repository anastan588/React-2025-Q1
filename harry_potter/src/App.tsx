import React from 'react';
import './App.css';
import { SearchFieldComponent } from './components/searchField';
import { SearchResultsComponent } from './components/searchResults';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { State } from './types/types';
import { Api } from './api/api';
import { Spinner } from './components/spinner';
import { ErrorModal } from './components/errorModal';

class App extends React.Component<object, State> {
  api: Api;
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      charactersList: [],
      loading: false,
      error: {
        message: '',
        stack: '',
      },
      showErrorModal: false,
      errorThrown: false,
    };
    this.api = new Api(this.state.searchTerm);
  }

  async componentDidMount() {
    await this.requestForServer();
  }

  async requestForServer() {
    localStorage.setItem('searchTerm', this.state.searchTerm);
    this.setState({
      loading: true,
      error: { message: '', stack: '' },
      showErrorModal: false,
    });
    try {
      const response = await this.api.fetchCharactersDataList(
        this.state.searchTerm
      );
      if (response[0] === 'error') {
        throw new Error('Network response was not ok');
      }
      if (
        Array.isArray(response) &&
        response.every((item) => typeof item === 'object')
      ) {
        this.setState({
          charactersList: response,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
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
  };

  handleSearch = async () => {
    await this.requestForServer();
  };

  closeError = () => {
    this.setState({ showErrorModal: false });
  };
  throwError = () => {
    this.setState({ errorThrown: true });
  };

  render() {
    if (this.state.errorThrown) {
      throw new Error('This is a test error');
    }
    return (
      <>
        <div className="flex flex-col items-center bg-teal-300 gap-7 h-full relative min-h-screen">
          <Header></Header>
          <main className="flex-1 flex flex-col items-center gap-4 p-0 px-5 w-full max-w-screen">
            <SearchFieldComponent
              searchTerm={this.state.searchTerm}
              onSearchTermChange={this.handleSearchTermChange}
              onSearch={this.handleSearch}
            />
            {this.state.loading ? (
              <Spinner />
            ) : this.state.showErrorModal ? (
              <ErrorModal error={this.state.error} onClose={this.closeError} />
            ) : (
              <SearchResultsComponent
                charactersList={this.state.charactersList}
              />
            )}
            <button
              className="self-end border-2 border-white rounded-lg py-2.5 px-6 bg-slate-50 text-[120%] text-rose-500"
              onClick={this.throwError}
            >
              Throw Error
            </button>
          </main>
          <Footer></Footer>
        </div>
      </>
    );
  }
}

export default App;
