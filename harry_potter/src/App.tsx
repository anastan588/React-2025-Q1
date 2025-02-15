import { useState } from 'react';
import { Route, Routes } from 'react-router';

import { initialState } from '$/data/initData';
import { DetailedCard } from '$/pages/detailed';
import { MainPage } from '$/pages/mainPage';
import { NotFoundPage } from '$/pages/notFound';

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
