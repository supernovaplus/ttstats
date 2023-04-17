import { ReactNode, ComponentType } from 'react';

export const repeatComponentForDebug = (component: ComponentType, num: number) => {
  return <>{new Array(num).fill(1).map((item) => component)}</>;
};

export function shortenLargeMoney(num: number, sign = false): string {
  const absNum = Math.abs(num);
  let numString = String(absNum);
  if (absNum >= 1_000_000_000_000) {
    numString = Number(Number(absNum / 1_000_000_000_000).toFixed(2)) + 'Tril';
  } else if (absNum >= 1_000_000_000) {
    numString = Number(Number(absNum / 1_000_000_000).toFixed(2)) + 'Bil';
  } else if (absNum >= 1_000_000) {
    numString = Number(Number(absNum / 1_000_000).toFixed(2)) + 'Mil';
  } else if (absNum >= 1_000) {
    numString = Number(Number(absNum / 1_000).toFixed(2)) + 'K';
  }
  return (num === 0 ? '' : num < 0 ? '-' : sign ? '+' : '') + numString;
}

export const importDelay =
  (importFn: () => Promise<any>, delayMs = 500) =>
  async () => {
    const [result] = await Promise.all([importFn(), new Promise((resolve) => setTimeout(resolve, delayMs))]);
    return result as { default: ComponentType<any> };
  };
