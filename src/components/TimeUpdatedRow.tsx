import { utcDate } from '../controllers/misc';

export default function TimeUpdatedRow({ updated_at }: { updated_at: number }) {
  return <div className="text-right text-xs mt-2">Updated: {utcDate(updated_at)}</div>;
}
