export default function Uptime({ time }: { time: string }) {
  const timeObj = { h: 0, m: 0 };

  time.split(' ').forEach((t) => {
    if (t.endsWith('m')) {
      timeObj.m = parseInt(t.replace('m', ''));
    } else if (t.endsWith('h')) {
      timeObj.h = parseInt(t.replace('h', ''));
    }
  });

  const colorClass =
    timeObj.h === 17 && timeObj.m < 45
      ? 'text-yellow-400 text-shadow-2'
      : timeObj.h >= 17
      ? 'text-red-400 text-shadow-2'
      : '';

  return <span className={colorClass}>{time}</span>;
}
