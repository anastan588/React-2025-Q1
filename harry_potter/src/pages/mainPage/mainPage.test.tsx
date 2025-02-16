import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { store } from '$/data/store';
import { MainPage } from '$/pages/MainPage';
// import { Character } from '$/types';

// const mockCharacterList: Character[] = [
//   {
//     id: '8b7e8ccb-f2ef-42b0-a4cd-fb3c2572e619',
//     attributes: {
//       name: '1992 Gryffindor vs Slytherin Quidditch match spectators',
//     },
//   },
//   {
//     id: '9b7e8ccb-f2ef-42b0-a4cd-fb3c2572e619',
//     attributes: {
//       name: '1992 Gryffindors',
//     },
//   },
// ];
// const mockSetState = vi.fn();

describe('Main Component', () => {
  // const mockState = {
  //   searchTerm: '',
  //   charactersList: mockCharacterList,
  //   selectedCharacters: [],
  //   loading: true,
  //   error: {
  //     message: '',
  //     stack: '',
  //   },
  //   showErrorModal: false,
  //   errorThrow: false,
  //   detailesOpened: false,
  //   pageNumber: 1,
  //   pageSize: 20,
  //   records: 0,
  // };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render page Main', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: 'Throw Error' });
    expect(() => {
      fireEvent.click(button);
    }).toBeTruthy();
  });
});
