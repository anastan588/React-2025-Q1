export type State = {
  searchTerm: string;
  charactersList: Character[];
  selectedCharacters: Character[];
  loading: boolean;
  error: ErrorDetails;
  showErrorModal: boolean;
  detailesOpened: boolean;
  errorThrow: boolean;
  pageSize: number;
  pageNumber: number;
  records: number;
};

export interface StateProps {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

export interface SearchPropsForCharacters {
  searchTerm: string;
  pageSize: number;
  pageNumber: number;
}

export interface ErrorDetails {
  message: string;
  stack?: string;
}

export interface ErrorProps {
  error: ErrorDetails;
  onClose: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface CharactersResponse {
  data: Character[];
  links: { self: string; current: string; next: string; last: string };
  meta: {
    copyright: string;
    generated_at: string;
    pagination: {
      current: number;
      next: number;
      last: number;
      records: number;
    };
  };
}

export interface CharacterResponse {
  data: Character;
  links: { self: string; current: string; next: string; last: string };
  meta: {
    copyright: string;
    generated_at: string;
    pagination: {
      current: number;
      next: number;
      last: number;
      records: number;
    };
  };
}

export interface Character {
  id: string;
  type?: string;
  attributes: {
    slug?: string | null;
    alias_names?: [];
    animagus?: string | null;
    blood_status?: string | null;
    boggart?: string | null;
    born?: string | null;
    died?: string | null;
    eye_color?: string | null;
    family_members?: [];
    gender?: string | null;
    hair_color?: string | null;
    height?: string | null;
    house?: string | null;
    image?: string | null;
    jobs?: [];
    marital_status?: string | null;
    name: string;
    nationality?: string | null;
    patronus?: string | null;
    romances?: string | null;
    skin_color?: string | null;
    species?: string | null;
    titles?: [];
    wands?: [];
    weight?: string | null;
    wiki?: string;
  };
  links?: { self: string };
}
