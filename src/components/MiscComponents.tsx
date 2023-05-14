import { utcDate } from '../controllers/misc';

export function TimeUpdatedRow({ updated_at }: { updated_at: number }) {
  if (!updated_at) return <></>;
  return <div className="text-right text-xs mt-2">Updated: {utcDate(updated_at)}</div>;
}

export const ErrorRow = ({ children }: { children: string }) => (
  <div className="text-white bg-red-600 text-shadow-1 p-2 text-center">Error: {children}</div>
);

export const LoadingRow = () => (
  <div className="p-2 text-center">Loading...</div>
);
