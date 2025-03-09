import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { makeStore, Pangination, potterSlice } from '$/components';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    query: { page: '1' },
    push: vi.fn(),
  }),
}));

describe('Pangination Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, '', '?page=2');
  });

  test('make sure the component updates URL query parameter when page changes', async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <Pangination />
      </Provider>
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
    const store = makeStore();
    waitFor(() => {
      store.dispatch(potterSlice.actions.updateNumberAllCharacters(500));
    });
    render(
      <Provider store={store}>
        <Pangination />
      </Provider>
    );
    waitFor(() => {
      const nextPageButton = screen.getByText('Next page');
      fireEvent.click(nextPageButton);
      const updatePage = store.getState().potterData.pageNumber;
      expect(updatePage).toBe(2);
    });
  });

  test('make sure handlePrevPage function called', async () => {
    const store = makeStore();
    waitFor(() => {
      store.dispatch(potterSlice.actions.updateNumberAllCharacters(500));
      store.dispatch(potterSlice.actions.updatePageNumber(2));
    });
    render(
      <Provider store={store}>
        <Pangination />
      </Provider>
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
    const store = makeStore();
    waitFor(() => {
      store.dispatch(potterSlice.actions.updateNumberAllCharacters(500));
    });
    render(
      <Provider store={store}>
        <Pangination />
      </Provider>
    );
    waitFor(() => {
      const select = screen.getAllByRole('combobox');
      fireEvent.change(select[0], { target: { value: 10 } });
      const updatePageSize = store.getState().potterData.pageSize;
      expect(updatePageSize).toBe(10);
    });
  });
});
