import { ErrorProps } from '$/types';

export function ErrorModal({ error, onClose }: ErrorProps) {
  return (
    <div className="bg-secondary text-text-primary flex w-full flex-col gap-2.5 rounded-lg p-12 text-center">
      <p className="text-[130%]">{error.message}</p>
      <button
        className="hover:text-text-hover hover:bg-hover-primary rounded-lg border-2 border-white p-2.5 text-[120%]"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
