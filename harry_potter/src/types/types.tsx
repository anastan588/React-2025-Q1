export interface SearchState {
  searchTerm: string;
  charactersList: Character[];
  loading: boolean;
}

interface Character {
  aliasNames: string[];
  animagus: string;
  bloodStatus: string;
  boggart: string;
  born: string;
  died: string;
  eyeColor: string;
  familyMembers: string[];
  gender: string;
  hairColor: string;
  height: string;
  house: string;
  image: string;
  jobs: string[];
  maritalStatus: string;
  name: string;
  nationality: string;
  patronus: string;
  romances: string[];
  skinColor: string;
  slug: string;
  species: string;
  titles: string[];
  wands: string[];
  weight: string;
  wiki: string;
}
