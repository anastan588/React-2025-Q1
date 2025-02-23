import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { Card } from '$/components';
import { store } from '$/data';
import { Character } from '$/types';

const mockCharacter: Character = {
  id: '8b7e8ccb-f2ef-42b0-a4cd-fb3c2572e619',
  attributes: {
    name: '1992 Gryffindor vs Slytherin Quidditch match spectators',
    gender: 'Male',
    species: 'Human',
  },
};

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders Card', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card key={mockCharacter.id} character={mockCharacter} />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('More...')).toBeTruthy();
  });

  test('toggles the checkbox and dispatches actions', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card character={mockCharacter} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox: HTMLInputElement = screen.getByRole('checkbox', {
      name: 'Add to favourite',
    });
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(store.getState().potterData.selectedCharacters).toContainEqual(
      mockCharacter
    );
    fireEvent.click(checkbox);
    expect(store.getState().potterData.selectedCharacters).not.toContainEqual(
      mockCharacter
    );
  });
});
