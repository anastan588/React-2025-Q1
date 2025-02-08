import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/errorBoundary.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
} else {
  console.error('Root element not found');
}
