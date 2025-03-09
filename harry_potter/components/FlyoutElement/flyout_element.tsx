import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cleanSelectedState, RootState } from '$/components';

export function FlyoutElement() {
  const { selectedCharacters } = useSelector(
    (state: RootState) => state.potterData
  );
  const [fileUrl, setFileUrl] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fileName = `${selectedCharacters.length}_characters.csv`;
    const csvRows = [];
    for (const character of selectedCharacters) {
      csvRows.push({
        ID: character.id.toString(),
        Name: character.attributes.name,
        Species: character.attributes.species as string,
        URL: character.attributes.wiki as string,
      });
    }
    const csvData = csvRows
      .map((row) =>
        Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
      )
      .join('\n\n');
    const file = new File([csvData], fileName, {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  }, [selectedCharacters]);

  const handleDeleteAllSelectedCharacters = () => {
    dispatch(cleanSelectedState());
  };

  return (
    <div className="bg-flyout max-sm:top-0.7 max-sm:right-0.7 fixed top-5 right-7 flex flex-col items-center gap-4 rounded-lg border border-white p-4 text-white max-xl:top-4 max-xl:right-5 max-xl:p-3 max-lg:top-2 max-lg:right-2 max-lg:p-1 max-sm:p-1">
      <h3 className="text-center text-2xl max-xl:text-xl max-lg:text-lg max-sm:text-sm">{`${selectedCharacters.length} characters have been selected`}</h3>
      <div className="flex gap-4">
        <button
          className="hover:text-text-hover-secondary hover:bg-hover-flyout rounded-lg border border-white p-2 text-center"
          onClick={handleDeleteAllSelectedCharacters}
        >
          Unselect all
        </button>
        <a
          className="hover:text-text-hover-secondary hover:bg-hover-flyout rounded-lg border border-white p-2 text-center"
          href={fileUrl}
          download={`${selectedCharacters.length}_characters.csv`}
        >
          Download
        </a>
      </div>
    </div>
  );
}
