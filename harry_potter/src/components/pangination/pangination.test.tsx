import { configureStore } from '@reduxjs/toolkit';
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
import { potterSlice, store } from '$/data';

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
      waitFor(() => {
        const nextPageButton = screen.getByText('Next page');
        fireEvent.click(nextPageButton);
        fireEvent.click(nextPageButton);
      }).finally(() => {
        waitFor(() => {
          expect(window.location.search).toBe('?page=2');
        });
      });
    });
  });

  test('make sure handleNextPage function called', async () => {
    const store = configureStore({
      reducer: {
        potterData: potterSlice.reducer,
      },
    });
    waitFor(() => {
      store.dispatch(potterSlice.actions.updateNumberAllCharacters(500));
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Pangination />
        </Provider>
      </MemoryRouter>
    );
    waitFor(() => {
      const nextPageButton = screen.getByText('Next page');
      fireEvent.click(nextPageButton);
      const updatePage = store.getState().potterData.pageNumber;
      expect(updatePage).toBe(2);
    });
  });

  test('make sure handlePrevPage function called', async () => {
    const store = configureStore({
      reducer: {
        potterData: potterSlice.reducer,
      },
    });
    waitFor(() => {
      store.dispatch(potterSlice.actions.updateNumberAllCharacters(500));
      store.dispatch(potterSlice.actions.updatePageNumber(2));
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Pangination />
        </Provider>
      </MemoryRouter>
    );
    waitFor(() => {
      const prevPageButton = screen.getByText('Prev page');
      fireEvent.click(prevPageButton);
      const updatePage = store.getState().potterData.pageNumber;
      expect(updatePage).toBe(1);
      expect(prevPageButton).toBeDisabled();
    });
  });

  test('make sure handleChangePageSize function called', async () => {
    const store = configureStore({
      reducer: {
        potterData: potterSlice.reducer,
      },
    });
    waitFor(() => {
      store.dispatch(potterSlice.actions.updateNumberAllCharacters(500));
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Pangination />
        </Provider>
      </MemoryRouter>
    );
    waitFor(() => {
      const select = screen.getAllByRole('combobox');
      fireEvent.change(select[0], { target: { value: 10 } });
      const updatePageSize = store.getState().potterData.pageSize;
      expect(updatePageSize).toBe(10);
    });
  });
});
