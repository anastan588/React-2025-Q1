import { Route, Routes } from 'react-router';

import { MainPage } from '$/pages';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}
