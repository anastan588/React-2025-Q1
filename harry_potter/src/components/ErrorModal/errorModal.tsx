import { ErrorProps } from '$/types';

export function ErrorModal({ error, onClose }: ErrorProps) {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-lg bg-rose-400 p-12 text-center">
      <p className="text-[130%] text-white">{error.message}</p>
      <button
        className="rounded-lg border-2 border-white p-2.5 text-[120%] text-white hover:bg-white hover:text-rose-500"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
