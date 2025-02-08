import './App.css';
import { DataAppProvider } from './context/dataAppProvider';
import { MainPage } from './components/mainPage';

function App() {
  // handleSearchTermChange = async (searchTerm: string) => {
  //   this.setState({ searchTerm });
  // };

  return (
    <DataAppProvider>
      <MainPage />
    </DataAppProvider>
  );
}

export default App;
