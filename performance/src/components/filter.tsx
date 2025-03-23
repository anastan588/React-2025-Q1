import { RegionSelectorProps } from '$/types';

export function RegionSelector({
  selectedRegion,
  setSelectedRegion,
  uniqueRegions,
}: RegionSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <label htmlFor="region-select" className="text-white">
        Region:
      </label>
      <select
        id="region-select"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="bg-dark-green ml-2 p-2"
      >
        {uniqueRegions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
