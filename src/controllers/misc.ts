import { useEffect, useState } from 'react';
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
};

export const setLocalObj = (key: string, data: Object) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getCacheStr = (key: string) => {
  return localStorage.getItem(key);
};

export const setCacheStr = (key: string, data: string) => {
  localStorage.setItem(key, data);
  return true;
};

const formatTimeOrEmptyStrWithoutZero = (number: number, unit: string): string =>
  number > 0 ? `${number}${unit}` : '';

const formatTimeOrEmptyStrWithZero = (number: number, unit: string): string =>
  number > 0
    ? number > 9 || unit === 'd'
      ? `${number}${unit}`
      : `${number.toString().padStart(2, '0')}${unit}`
    : '';

/**
 * Calculates the time difference between two timestamps and formats it.
 *
 * @param {number} fromTime - The timestamp representing the starting time.
 * @param {number} [toTime=Date.now()] - The timestamp representing the ending time. Defaults to the current time.
 * @param {boolean} [showSuffix=true] - Whether to include a suffix indicating "in" for the future or "ago" for the past. Default is `true`.
 * @returns {string} - The formatted time difference string with an indication of past or future.
 */
export const timeDiff = (fromTime: number, toTime: number = Date.now(), showSuffix = true): string => {
  const time = toTime - fromTime;

  // Calculate time components
  const days = Math.floor(time / 86400000); // 1000 * 60 * 60 * 24
  const hours = Math.floor((time % 86400000) / 3600000); // 1000 * 60 * 60
  const minutes = Math.floor((time % 3600000) / 60000); // 1000 * 60
  const seconds = Math.floor((time % 60000) / 1000);

  // Format time components and remove empty strings
  const timeComponents: string[] = [
    formatTimeOrEmptyStrWithoutZero(days, 'd'),
    formatTimeOrEmptyStrWithoutZero(hours, 'h'),
    formatTimeOrEmptyStrWithoutZero(minutes, 'm'),
    formatTimeOrEmptyStrWithoutZero(seconds, 's'),
  ].filter(Boolean);

  // Join formatted time components and trim extra spaces
  const timeString: string = timeComponents.join(' ').trim();

  // Add indication of past or future
  return showSuffix ? `${timeString} ${time < 0 ? 'in' : 'ago'}` : timeString;
};

export function usePersistantState<T>(key: string, initialValue: T): [T, (value: React.SetStateAction<T>) => void] {
  const [state, setInternalState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Error reading localStorage key “' + key + '”:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setInternalState(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn('Error setting localStorage key “' + key + '”:', error);
    }
  };

  return [state, setValue];
}
