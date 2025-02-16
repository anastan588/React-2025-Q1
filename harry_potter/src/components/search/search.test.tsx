import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { SearchFieldComponent } from '$/components';
import { store } from '$/data/store';

const mockSetSearchTermInComponent = vi.fn();
vi.mock('$hooks', () => ({
  useSearchStringLS: () => ['initial term', mockSetSearchTermInComponent],
}));

describe('Search Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render search field', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchFieldComponent />
        </Provider>
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: 'Search' });
    expect(() => {
      fireEvent.click(button);
    }).toBeTruthy();
  });

  test('render input field', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchFieldComponent />
        </Provider>
      </MemoryRouter>
    );
    const newValue = 'Harry Potter';
    const input = screen.getByRole('textbox');
    expect(() => {
      fireEvent.change(input, { target: { value: newValue } });
    }).toBeTruthy();
  });

  test('calls handle updateSearchTerm, numberPage', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchFieldComponent />
        </Provider>
      </MemoryRouter>
    );
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('calls handle update searchTerm in component', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchFieldComponent />
        </Provider>
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    const newValue = 'Harry Potter';
    fireEvent.change(input, { target: { value: newValue } });
    waitFor(() => {
      expect(mockSetSearchTermInComponent).toHaveBeenCalledWith(
        newValue.toLowerCase()
      );
    });
  });
});
