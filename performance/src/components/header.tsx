import { HeaderProps } from '$/types';

export function Header({ title_text }: HeaderProps) {
  return (
    <header className="bg-secondary flex w-full justify-around p-1.5 text-xl">
      <h1 className="text-text-primary">{title_text}</h1>
    </header>
  );
}
