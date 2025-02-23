import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { Images } from '$/assets';
import { ThemeContext } from '$/context';

export function NotFoundPage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  return (
    <div
      data-theme={theme}
      className="bg-secondary text-text-primary bg-opacity-40 flex h-screen flex-col items-center gap-5 p-10"
      style={{
        backgroundImage: `url(${Images.Snow})`,
      }}
    >
      <h1 className="text-2xl font-bold">Page not found</h1>
      <button
        className="transform rounded-lg px-2.5 py-1.5 font-bold transition-transform duration-200 ease-in-out hover:scale-[1.2]"
        type="button"
        onClick={() => navigate('/')}
      >
        Main page
      </button>
    </div>
  );
}
