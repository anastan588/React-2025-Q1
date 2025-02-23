import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { FlyoutElement } from '$/components';
import { addSelectedCharacters, store } from '$/data';

describe('Flyout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => 'mockedUrl');
  });

  test('renders Flyout with correct content', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <FlyoutElement />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Unselect all'));
    expect(screen.getByText('Download'));
  });

  test('calls createObjectURL', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <FlyoutElement />
        </Provider>
      </MemoryRouter>
    );
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  test('calls cleanSelectedState when "Unselect all" button is clicked', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <FlyoutElement />
        </Provider>
      </MemoryRouter>
    );
    const unselectButton = screen.getByText('Unselect all');

    fireEvent.click(unselectButton);
    const selectedItems = store.getState().potterData.selectedCharacters;
    expect(selectedItems).toEqual([]);
  });
  test('generates the correct CSV file link', () => {
    const selectedCharacter = {
      id: '1',
      attributes: {
        name: 'Hermione Granger',
        species: 'Human',
        wiki: 'http://hermione.com',
      },
    };

    render(
      <MemoryRouter>
        <Provider store={store}>
          <FlyoutElement />
        </Provider>
      </MemoryRouter>
    );
    store.dispatch(addSelectedCharacters(selectedCharacter));
    const downloadLink = screen.getByRole('link', { name: 'Download' });
    fireEvent.click(downloadLink);
    waitFor(() => {
      expect(downloadLink).toHaveAttribute(
        'href',
        expect.stringContaining('.csv')
      );
      expect(downloadLink).toHaveAttribute('download', '1_characters.csv');
    });
  });
});
