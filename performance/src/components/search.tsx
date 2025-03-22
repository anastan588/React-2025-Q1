import { SearchInputProps } from '$/types';

export function SearchInput({ searchQuery, setSearchQuery }: SearchInputProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <p>Country</p>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-[100px] p-2"
      />
    </div>
  );
}
