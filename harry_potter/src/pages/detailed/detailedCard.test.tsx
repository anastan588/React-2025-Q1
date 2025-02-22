import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { potterApi } from '$/api';
import { potterSlice } from '$/data/storeSlice';
import { DetailedCard } from '$/pages';
import { Character } from '$/types';

const mockCharacter: Character = {
  id: '8b7e8ccb-f2ef-42b0-a4cd-fb3c2572e619',
  attributes: {
    image: 'test-image.jpg',
    name: 'Harry Potter',
    height: '1.7m',
    nationality: 'British',
    house: 'Gryffindor',
    blood_status: 'Half-blood',
    alias_names: ['The Boy Who Lived', 'The Chosen One'],
    family_members: ['James Potter', 'Lily Potter', 'Albus Potter'],
    wiki: 'http://harrypotter.wikia.com',
  },
};

describe('Detailed Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    potterApi.endpoints.getCharacterById.useQuery = vi.fn().mockReturnValue({
      refetch: vi.fn(),
    });
  });

  test('shows spinner when detailedCard is not available', async () => {
    const store = configureStore({
      reducer: {
        potterData: potterSlice.reducer,
      },
    });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <DetailedCard />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeTruthy();
  });
  test('renders character details when detailedCard is available', () => {
    const store = configureStore({
      reducer: {
        potterData: potterSlice.reducer,
      },
    });
    waitFor(() => {
      store.dispatch(potterSlice.actions.updateDetailedCard(mockCharacter));
      store.dispatch(potterSlice.actions.updateDetailedId(mockCharacter.id));
      store.dispatch(potterSlice.actions.updateIsDetailedOpened(true));
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailedCard />
        </MemoryRouter>
      </Provider>
    );

    waitFor(async () => {
      expect(screen.getByText('Harry')).toBeInTheDocument();
      expect(screen.getByText('British')).toBeInTheDocument();
      expect(screen.getByText('Gryffindor')).toBeInTheDocument();
      expect(screen.getByText('Half-blood')).toBeInTheDocument();
      expect(screen.getByText('Alias names:')).toBeInTheDocument();
      expect(screen.getByText('The Boy Who Lived')).toBeInTheDocument();
      expect(screen.getByText('Family members:')).toBeInTheDocument();
      expect(screen.getByText('James Potter')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'more info' })).toHaveAttribute(
        'href',
        mockCharacter.attributes.wiki
      );
    });
  });

  test('closes the detailed card', () => {
    const store = configureStore({
      reducer: {
        potterData: potterSlice.reducer,
        [potterApi.reducerPath]: potterApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(potterApi.middleware),
    });
    waitFor(() => {
      store.dispatch(potterSlice.actions.updateDetailedCard(mockCharacter));
      store.dispatch(potterSlice.actions.updateDetailedId(mockCharacter.id));
      store.dispatch(potterSlice.actions.updateIsDetailedOpened(true));
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailedCard />
        </MemoryRouter>
      </Provider>
    );

    waitFor(() => {
      const closeButton = screen.getByRole('button', { name: 'Close' });
      fireEvent.click(closeButton);
      expect(window.location.search).toBe('/?page=1');
      expect(screen.queryByText('Harry Potter')).not.toBeInTheDocument();
    });
  });
});
