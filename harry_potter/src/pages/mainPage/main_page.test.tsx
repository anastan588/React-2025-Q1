import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ThemeContext } from '$/context';
import { store, updateShowErrorMessageWindow } from '$/data';
import { MainPage } from '$/pages';

const mockThemeContext = {
  theme: 'light',
  setTheme: vi.fn(),
};

describe('Main Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render page Main', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: 'Throw Error' });
    expect(() => {
      fireEvent.click(button);
    }).toBeTruthy();
  });

  test('displays the ErrorModal when showErrorModal is true', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <MemoryRouter>
            <MainPage />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );
    store.dispatch(updateShowErrorMessageWindow(true));
    waitFor(() => {
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  test('throws an error when the "Throw Error" button is clicked', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <MemoryRouter>
            <MainPage />
          </MemoryRouter>
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
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <MemoryRouter>
            <MainPage />
          </MemoryRouter>
        </ThemeContext.Provider>
      </Provider>
    );
    waitFor(() => {
      expect(screen.getByText('Next page')).toBeInTheDocument();
    });
  });

  test('renders pangination component after click on close button on error', () => {
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={mockThemeContext}>
          <MemoryRouter>
            <MainPage />
          </MemoryRouter>
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
