import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Pangination } from '$/components/Pangination';
import { Character } from '$/types';

const mockCharacterList: Character[] = Array.from({ length: 40 }, (_, i) => ({
  id: '3423rfr3ef',
  attributes: {
    name: `Character ${i + 1}`,
  },
}));

const mockSetState = vi.fn();
describe('Pangination Component', () => {
  const mockState = {
    searchTerm: '',
    charactersList: mockCharacterList,
    loading: true,
    error: {
      message: '',
      stack: '',
    },
    showErrorModal: false,
    errorThrow: false,
    detailesOpened: false,
    pageNumber: 1,
    pageSize: 20,
    records: 0,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    window.history.pushState({}, '', '?page=2');
  });

  test('make sure the component updates URL query parameter when page changes', async () => {
    render(
      <MemoryRouter>
        <Pangination state={mockState} setState={mockSetState} />
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
    render(
      <MemoryRouter>
        <Pangination state={mockState} setState={mockSetState} />
      </MemoryRouter>
    );
    const nextPageButton = screen.getByText('Next page');
    fireEvent.click(nextPageButton);
    expect(mockSetState).toHaveBeenCalled();
  });
});
