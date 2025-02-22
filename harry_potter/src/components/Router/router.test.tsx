import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

import { Router } from '$/components';
import { store } from '$/data';

describe('Router Component', () => {
  test('renders MainPage on "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Router />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('anastan588'));
  });

  test('renders NotFoundPage for undefined routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Provider store={store}>
          <Router />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Page not found'));
  });
});
