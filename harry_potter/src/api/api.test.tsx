import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import { requestForCharacters } from '$/api';
import { handleRequestCharacterDetails } from '$/api';
import { CharactersResponse, StateProps } from '$/types';

import { handleRequestForCharacters } from './api';

global.fetch = vi.fn();

describe('requestForCharacters', () => {
  const mockSetState = vi.fn();
  const initialState: StateProps = {
    state: {
      searchTerm: 'Harry',
      pageNumber: 1,
      pageSize: 10,
      loading: false,
      records: 0,
      charactersList: [],
      showErrorModal: false,
      error: { message: '', stack: '' },
      errorThrow: false,
      detailesOpened: false,
    },
    setState: mockSetState,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches characters successfully and updates state', async () => {
    const mockResponse: CharactersResponse = {
      meta: {
        pagination: {
          records: 1,
          current: 1,
          last: 1,
          next: 1,
        },
        copyright: '',
        generated_at: '',
      },
      data: [
        {
          id: '1',
          attributes: {
            name: 'Harry Potter',
            slug: null,
            alias_names: [],
            animagus: null,
            blood_status: null,
            boggart: null,
            born: null,
            died: null,
            eye_color: null,
            family_members: [],
            gender: null,
            hair_color: null,
            height: null,
            house: null,
            image: null,
            jobs: [],
            marital_status: null,
            nationality: null,
            patronus: null,
            romances: null,
            skin_color: null,
            species: null,
            titles: [],
            wands: [],
            weight: null,
            wiki: '',
          },
          type: '',
          links: {
            self: '',
          },
        },
      ],
      links: {
        self: '',
        current: '',
        next: '',
        last: '',
      },
    };

    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });
    const result = await requestForCharacters(initialState);
    console.log(mockSetState.mock.calls);
    expect(result).toEqual(mockResponse.data);
  });

  it('handles fetch error gracefully', async () => {
    (fetch as Mock).mockResolvedValueOnce({ ok: false });

    const result = await requestForCharacters(initialState);

    expect(result).toEqual(['error']);
    expect(mockSetState).not.toHaveBeenCalled();
  });
});

describe('handleRequestCharacterDetails', () => {
  const characterId = '1';
  const mockResponse = {
    data: {
      id: '1',
      name: 'Harry Potter',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches character details successfully', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await handleRequestCharacterDetails(characterId);

    expect(fetch as Mock).toHaveBeenCalledWith(
      `https://api.potterdb.com/v1/characters/${characterId}`
    );
    expect(result).toEqual(mockResponse.data);
  });

  it('handles errors gracefully', async () => {
    (fetch as Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await handleRequestCharacterDetails(characterId);

    expect(fetch as Mock).toHaveBeenCalledWith(
      `https://api.potterdb.com/v1/characters/${characterId}`
    );
    expect(result).toBeUndefined();
  });
});

const mockRequestForCharacters = vi.fn();

vi.mock('./requestForCharacters', () => ({
  requestForCharacters: mockRequestForCharacters,
}));

describe('handleRequestForCharacters', () => {
  const mockSetState = vi.fn();
  const initialState: StateProps = {
    state: {
      searchTerm: 'Harry',
      pageNumber: 1,
      pageSize: 10,
      loading: false,
      records: 0,
      charactersList: [],
      showErrorModal: false,
      error: { message: '', stack: '' },
      errorThrow: false,
      detailesOpened: false,
    },
    setState: mockSetState,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches characters successfully and updates state', async () => {
    const mockResponse = [{ id: '1', name: 'Harry Potter' }];
    mockRequestForCharacters.mockResolvedValueOnce(mockResponse);
    await handleRequestForCharacters(initialState);
    const charactersListCall = mockSetState.mock.calls.find(
      (call) => call[0](initialState.state).charactersList !== undefined
    );

    expect(charactersListCall).toBeTruthy();
    const loadingFalseCall = mockSetState.mock.calls.find(
      (call) => call[0](initialState.state).loading !== undefined
    );
    expect(loadingFalseCall).toBeTruthy();
  });
});
