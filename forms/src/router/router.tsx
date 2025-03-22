import { Route, Routes } from 'react-router';

import ControlledPage from '$/pages/controlled/controlled';
import MainPage from '$/pages/main/main';
import UnControlledPage from '$/pages/uncontrolled/uncontrolled';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/uncontrolled" element={<UnControlledPage />} />
      <Route path="/controlled" element={<ControlledPage />} />
    </Routes>
  );
}
