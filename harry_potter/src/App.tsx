import { useState } from 'react';
import { Route, Routes } from 'react-router';
import { MainPage } from '$/pages/MainPage';
import { DetailedCard } from '$/pages/Detailed';
import { NotFoundPage } from '$/pages/NotFound';
import { initialState } from '$/data/initData';

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
