import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { makeStore, SearchFieldComponent } from '$/components';

const mockSetSearchTermInComponent = vi.fn();
vi.mock('$hooks', () => ({
  useSearchStringLS: () => ['initial term', mockSetSearchTermInComponent],
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { page: '1' },
    pathname: '/',
  }),
}));

describe('Search Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render search field', async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <SearchFieldComponent />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Search' });
    expect(() => {
      fireEvent.click(button);
    }).toBeTruthy();
  });

  test('render input field', async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <SearchFieldComponent />
      </Provider>
    );
    const newValue = 'Harry Potter';
    const input = screen.getByRole('textbox');
    expect(() => {
      fireEvent.change(input, { target: { value: newValue } });
    }).toBeTruthy();
  });

  test('calls handle updateSearchTerm, numberPage', () => {
    const store = makeStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <SearchFieldComponent />
      </Provider>
    );
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('calls handle update searchTerm in component', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <SearchFieldComponent />
      </Provider>
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
