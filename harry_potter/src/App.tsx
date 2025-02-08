import './App.css';
import { DataAppProvider } from './context/dataAppProvider';
import { MainPage } from './components/mainPage';
import { Route, Routes } from 'react-router';
import { DetailedCard } from './components/detailedCard';
import NotFoundPage from './components/NotFoundPage';

function App() {
  // handleSearchTermChange = async (searchTerm: string) => {
  //   this.setState({ searchTerm });
  // };

  return (
    <DataAppProvider>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/details/:id" element={<DetailedCard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DataAppProvider>
  );
}

export default App;
