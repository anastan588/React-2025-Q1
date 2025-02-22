import { Route, Routes } from 'react-router';

import { DetailedCard, MainPage, NotFoundPage } from '$/pages';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/details/:id" element={<DetailedCard />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
