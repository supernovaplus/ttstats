import { useState, useEffect } from 'react';

let isWebpSupportedCache: boolean | null = null;

export function checkWebpSupport(): boolean {
    if (isWebpSupportedCache !== null) return isWebpSupportedCache;
    if (typeof window === 'undefined') return false;

    try {
        const elem = document.createElement('canvas');
        isWebpSupportedCache =
            elem.getContext && elem.getContext('2d')
                ? elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
                : false;

    } catch (err) {
        console.error(err);
        return false;
    }

    return isWebpSupportedCache;
}
