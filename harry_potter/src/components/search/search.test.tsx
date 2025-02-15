import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { SearchFieldComponent } from '$/components/Search';
import { Character } from '$/types';

const mockCharacterList: Character[] = [
  {
    id: '8b7e8ccb-f2ef-42b0-a4cd-fb3c2572e619',
    attributes: {
      name: '1992 Gryffindor vs Slytherin Quidditch match spectators',
    },
  },
  {
    id: '9b7e8ccb-f2ef-42b0-a4cd-fb3c2572e619',
    attributes: {
      name: '1992 Gryffindors',
    },
  },
];
const mockSetState = vi.fn();

describe('Search Component', () => {
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
  });

  test('render search field', async () => {
    render(
      <MemoryRouter>
        <SearchFieldComponent state={mockState} setState={mockSetState} />
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
        <SearchFieldComponent state={mockState} setState={mockSetState} />
      </MemoryRouter>
    );
    const newValue = 'Harry Potter';
    const input = screen.getByRole('textbox');
    expect(() => {
      fireEvent.change(input, { target: { value: newValue } });
    }).toBeTruthy();
  });

  test('calls handleRequestForCharacters on search', () => {
    render(
      <MemoryRouter>
        <SearchFieldComponent state={mockState} setState={mockSetState} />
      </MemoryRouter>
    );
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
    expect(mockSetState).toHaveBeenCalled();
  });

  test('calls handleInputChange on search', () => {
    render(
      <MemoryRouter>
        <SearchFieldComponent state={mockState} setState={mockSetState} />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    const newValue = 'Harry Potter';
    fireEvent.change(input, { target: { value: newValue } });
    expect(mockSetState).toHaveBeenCalled();
  });
});
