import { useState, useEffect } from 'react';
import { DXP } from '../../types/serverTypes';

export default function DxpClock({ dxp, timestamp }: { dxp?: DXP; timestamp: number | null }) {
  if (!dxp || !timestamp) return <></>;
  const [time, setTime] = useState(Math.round((timestamp + dxp[2]! + dxp[3]! - Date.now()) / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) clearInterval(interval);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const HH = Math.floor(time / 3600);
  const divisor_for_minutes = time % 3600;
  const MM = Math.floor(divisor_for_minutes / 60);
  const SS = Math.ceil(divisor_for_minutes % 60);
  return (
    <>
      {time < 1 ? (
        '-'
      ) : (
        <span>
          {HH ? HH + 'h ' : ''}
          {MM ? MM + 'm ' : HH ? '0m ' : ''}
          {SS ? SS + 's' : '0s'}
        </span>
      )}
    </>
  );
}
