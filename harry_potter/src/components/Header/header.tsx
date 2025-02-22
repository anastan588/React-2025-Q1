import { HarryTitle } from '$/assets/assetsExport';

export function Header() {
  return (
    <header className="bg-secondary flex w-full justify-around p-1.5 text-xl text-teal-950">
      <img className="max-w-32" src={HarryTitle} alt="Harry_Potter" />
    </header>
  );
}
