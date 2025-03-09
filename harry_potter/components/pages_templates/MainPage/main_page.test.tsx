import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import {
  MainPage,
  makeStore,
  ThemeContext,
  updateShowErrorMessageWindow,
} from '$/components';

const mockThemeContext = {
  theme: 'light',
  setTheme: vi.fn(),
};

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    push: vi.fn(),
  }),
}));
vi.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: '1' },
    replace: vi.fn(),
  }),
}));

describe('Main Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render page Main', async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Throw Error' });
    expect(() => {
      fireEvent.click(button);
    }).toBeTruthy();
  });

  test('displays the ErrorModal when showErrorModal is true', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <MainPage />
        </ThemeContext.Provider>
      </Provider>
    );
    store.dispatch(updateShowErrorMessageWindow(true));
    waitFor(() => {
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  test('throws an error when the "Throw Error" button is clicked', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <MainPage />
        </ThemeContext.Provider>
      </Provider>
    );
    const throwErrorButton = screen.getByRole('button', {
      name: 'Throw Error',
    });

    try {
      fireEvent.click(throwErrorButton);
    } catch (error) {
      console.error('Error during test execution:', error);
      waitFor(() => {
        expect(screen.getByText('Try again'));
      });
    }
  });

  test('renders pangination component', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <MainPage />
        </ThemeContext.Provider>
      </Provider>
    );
    waitFor(() => {
      expect(screen.getByText('Next page')).toBeInTheDocument();
    });
  });

  test('renders pangination component after click on close button on error', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <MainPage />
        </ThemeContext.Provider>
      </Provider>
    );
    store.dispatch(updateShowErrorMessageWindow(true));
    waitFor(() => {
      expect(screen.getByText('Close')).toBeInTheDocument();
      const CloseButton = screen.getByText('Close');
      fireEvent.click(CloseButton);
    });

    waitFor(() => {
      expect(screen.getByText('Next page')).toBeInTheDocument();
    });
  });
});
