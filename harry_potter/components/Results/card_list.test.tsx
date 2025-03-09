import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import {
  CardList,
  Character,
  makeStore,
  updateCharactersList,
} from '$/components';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: { page: '1' },
    pathname: '/',
  }),
}));

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

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders message about empty cards', async () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );
    expect(screen.getByText("Characters haven't been found")).toBeTruthy();
  });

  test('renders cards', async () => {
    const store = makeStore();
    store.dispatch(updateCharactersList(mockCharacterList));
    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );
    const list = screen.getAllByRole('article');
    expect(list).toHaveLength(mockCharacterList.length);
  });
});
