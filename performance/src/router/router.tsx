import { Route, Routes } from 'react-router';

import MainPage from '$/pages/main';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}
