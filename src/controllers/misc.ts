import { ServerDataObject } from '../types/serverTypes';

export const generateJoinLink = (server: ServerDataObject, useEndpoint = true) =>
  `fivem://connect/${!useEndpoint && server.serverip ? server.serverip : server.endpoint}?pure_0`;

export const shortenLargeMoney = (num: number, sign = false): string => {
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
};

export const roundFixed = (num: number, dec = 1) => Number(Number(num).toFixed(dec));

export const utcDate = (timestamp: number, dateOnly = false): string =>
  !dateOnly
    ? new Date(timestamp)
      .toLocaleString('en-GB', {
        timeZone: 'UTC',
        weekday: undefined,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      })
      .replace(' at', ',') + ' (UTC)'
    : new Date(timestamp).toLocaleString('en-GB', {
      timeZone: 'UTC',
      weekday: undefined,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false,
    });

export const testingFindText = (haystack: string, needleArray: string[], label = '') => {
  for (let i = 0; i < needleArray.length; i++) {
    const needle = needleArray[i];
    if (!haystack.includes(needle)) throw new Error(`"${needle}" not found${label ? ' in ' + label : ''}`);
  }
};

export const calcLvlToEXP = (level: number) => Math.floor((5 * level * (level + 1)) / 2);
export const calcEXPToLvl = (exp: number) => Math.floor((Math.sqrt(1 + (8 * exp) / 5) - 1) / 2);

export const prettyNum = (num: number) => num.toLocaleString('en-us');

export const getCacheObj = (key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return false;

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const setLocalObj = (key: string, data: Object) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const getCacheStr = (key: string) => {
  return localStorage.getItem(key);
}

export const setCacheStr = (key: string, data: string) => {
  localStorage.setItem(key, data);
  return true;
}