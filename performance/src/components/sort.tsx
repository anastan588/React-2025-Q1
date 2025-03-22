import { SortButtonProps } from '$/types';

export function SortButton({
  label,
  sortCriterion,
  sortOrder,
  setSortCriterion,
  onSort,
}: SortButtonProps) {
  const sortBy = label?.toLowerCase() || 'name';
  return (
    <div className="flex items-center justify-center gap-2">
      {label && <p>{label}</p>}
      <button
        onClick={() => {
          setSortCriterion(label?.toLowerCase() || 'name');
          onSort();
        }}
        className="flex items-center"
      >
        {sortCriterion === sortBy && sortOrder === 'ascending' ? (
          <img src="up.png" alt="Ascending" className="max-w-10" />
        ) : sortCriterion === sortBy && sortOrder === 'descending' ? (
          <img src="down.png" alt="Descending" className="max-w-10" />
        ) : (
          <img src="updown.png" alt="Default" className="max-w-10" />
        )}
      </button>
    </div>
  );
}
