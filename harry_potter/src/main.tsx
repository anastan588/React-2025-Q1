import './index.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { ErrorBoundary } from '$/components/ErrorBoundary';
import { SoundProvider } from '$/context';
import { ThemeProvider } from '$/context';
import { store } from '$/data';

import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <SoundProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ErrorBoundary>
        </ThemeProvider>
      </SoundProvider>
    </Provider>
  );
} else {
  console.error('Root element not found');
}
