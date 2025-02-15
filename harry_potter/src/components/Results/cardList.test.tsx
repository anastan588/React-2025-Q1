import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { CardList } from '$/components/Results';
import { Character } from '$/types';
import { MemoryRouter } from 'react-router';

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

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders message about empty cards', async () => {
    const mockState = {
      searchTerm: '',
      charactersList: [],
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
    render(<CardList state={mockState} setState={mockSetState} />);
    expect(screen.getByText("Characters haven't been found")).toBeTruthy();
  });

  test('renders cards', async () => {
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
    render(
      <MemoryRouter>
        <CardList state={mockState} setState={mockSetState} />
      </MemoryRouter>
    );
    const list = screen.getAllByRole('article');
    expect(list).toHaveLength(mockCharacterList.length);
  });
});
