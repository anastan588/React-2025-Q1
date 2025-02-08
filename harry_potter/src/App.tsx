import './App.css';
import { DataAppProvider } from './context/dataAppProvider';
import { MainPage } from './pages/mainPage/mainPage';
import { Route, Routes } from 'react-router';
import { DetailedCard } from './pages/detailed/detailedCard';
import { NotFoundPage } from './pages/notFound/notFoundPage';

function App() {
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
