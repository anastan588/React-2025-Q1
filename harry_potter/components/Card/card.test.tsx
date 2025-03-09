import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { Card, Character, makeStore } from '$/components';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { page: '1' },
    pathname: '/',
  }),
}));

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
    const store = makeStore();
    render(
      <Provider store={store}>
        <Card key={mockCharacter.id} character={mockCharacter} />
      </Provider>
    );
    expect(screen.getByText('More...')).toBeTruthy();
  });

  test('toggles the checkbox and dispatches actions', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <Card character={mockCharacter} />
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
