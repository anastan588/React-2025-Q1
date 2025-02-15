import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { Card } from '$/components/Card';
import { Character } from '$/types';

const mockCharacter: Character = {
  id: '8b7e8ccb-f2ef-42b0-a4cd-fb3c2572e619',
  attributes: {
    name: '1992 Gryffindor vs Slytherin Quidditch match spectators',
  },
};

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders Card', async () => {
    render(
      <MemoryRouter>
        <Card key={mockCharacter.id} character={mockCharacter} />
      </MemoryRouter>
    );
    expect(screen.getByText('More...')).toBeTruthy();
  });
});
