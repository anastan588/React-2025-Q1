import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '$/data';
import { cleanSelectedState } from '$/data/storeSlice';

export function FlyoutElement() {
  const { selectedCharacters } = useSelector(
    (state: RootState) => state.potterData
  );
  const [fileUrl, setFileUrl] = useState<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fileName = `${selectedCharacters.length}_characters.csv`;
    const csvRows = [['ID', 'Name', `Species`, 'More details URL']];
    for (const character of selectedCharacters) {
      csvRows.push([
        character.id.toString(),
        character.attributes.name,
        character.attributes.species as string,
        character.attributes.wiki as string,
      ]);
    }
    const csvData = csvRows.map((row) => row.join(',')).join('\n');
    const file = new File([csvData], fileName, {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(file);
    console.log(url);
    setFileUrl(url);
  }, [selectedCharacters]);

  const handleDeleteAllSelectedCharacters = () => {
    dispatch(cleanSelectedState());
  };

  return (
    <div className="bg-dark-red fixed top-7 right-7 flex flex-col items-center gap-4 rounded-lg border border-white p-4">
      <h3 className="text-center text-2xl">{`${selectedCharacters.length} characters have been selected`}</h3>
      <div className="flex gap-4">
        <button
          className="hover:text-dark-red rounded-lg border border-white p-2 text-center hover:bg-white"
          onClick={handleDeleteAllSelectedCharacters}
        >
          Unselect all
        </button>
        <a
          className="hover:text-dark-red rounded-lg border border-white p-2 text-center hover:bg-white"
          href={fileUrl}
          download={`${selectedCharacters.length}_characters.csv`}
        >
          Download
        </a>
      </div>
    </div>
  );
}
