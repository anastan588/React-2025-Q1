import './App.css';
import { MainPage } from './pages/mainPage/mainPage';
import { Route, Routes } from 'react-router';
import { DetailedCard } from './pages/detailed/detailedCard';
import { NotFoundPage } from './pages/notFound/notFoundPage';
import { useState } from 'react';
import { initialState } from './data/initDatatsx';

function App() {
  const [state, setState] = useState(initialState);
  return (
    <Routes>
      <Route path="/" element={<MainPage state={state} setState={setState} />}>
        <Route
          path="/details/:id"
          element={<DetailedCard state={state} setState={setState} />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
