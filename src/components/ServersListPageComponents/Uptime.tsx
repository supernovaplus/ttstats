export default function Uptime({ time }: { time: string }) {
  const timeObj = { h: 0, m: 0 };

  time.split(' ').forEach((t) => {
    if (t.endsWith('m')) {
      timeObj.m = parseInt(t.replace('m', ''));
    } else if (t.endsWith('h')) {
      timeObj.h = parseInt(t.replace('h', ''));
    }
  });

  // const color = timeObj.h === 17 && timeObj.m < 45 ? 'yellow' : timeObj.h >= 17 ? 'red' : null;

  //text-red-600 dark:text-red-400
  //text-yellow-400 text-shadow-2

  return (
    <span className="text-red-600 text-shadow-2">
    {/* <span className={color ? color : ''}> */}
      {time}
    </span>
  );
}
