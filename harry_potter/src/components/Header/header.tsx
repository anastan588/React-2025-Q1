import { Icons } from '$/assets';

export function Header() {
  return (
    <header className="bg-secondary flex w-full justify-around p-1.5 text-xl text-teal-950">
      <img className="max-w-32" src={Icons.HarryTitle} alt="Harry_Potter" />
    </header>
  );
}
