import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { Pangination } from '$/components';
import { store } from '$/data';

describe('Pangination Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    window.history.pushState({}, '', '?page=2');
  });

  test('make sure the component updates URL query parameter when page changes', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Pangination />
        </Provider>
      </MemoryRouter>
    );
    await act(async () => {
      const nextPageButton = screen.getByText('Next page');
      fireEvent.click(nextPageButton);
      fireEvent.click(nextPageButton);
      await waitFor(() => {
        expect(window.location.search).toBe('?page=2');
      });
    });
  });

  test('make sure handleNextPage function called', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Pangination />
        </Provider>
      </MemoryRouter>
    );
    const nextPageButton = screen.getByText('Next page');
    fireEvent.click(nextPageButton);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  test('make sure handlePrevPage function called', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Pangination />
        </Provider>
      </MemoryRouter>
    );
    const prevPageButton = screen.getByText('Prev page');
    fireEvent.click(prevPageButton);
    expect(dispatchSpy).toHaveBeenCalled();
  });
});
