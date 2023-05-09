import { ServerDataObject } from "../types/serverTypes";

export const generateJoinLink = (server: ServerDataObject) => `fivem://connect/${server.endpoint}?pure_1`;

export function shortenLargeMoney (num: number, sign = false): string {
    const absNum = Math.abs(num);
    let numString = String(absNum);
    if(absNum >= 1_000_000_000_000){
      numString = Number(Number(absNum / 1_000_000_000_000).toFixed(2)) + 'Tril';
    }else if(absNum >= 1_000_000_000){
      numString = Number(Number(absNum / 1_000_000_000).toFixed(2)) + 'Bil';
    }else if(absNum >= 1_000_000){
      numString = Number(Number(absNum / 1_000_000).toFixed(2)) + 'Mil';
    }else if(absNum >= 1_000){
      numString = Number(Number(absNum / 1_000).toFixed(2)) + 'K';
    }
    return (num === 0 ? '' : num < 0 ? '-' : (sign ? '+' : '')) + numString;
  }