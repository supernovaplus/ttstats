import { useEffect } from 'react';
import { backgroundsList } from '@/data/backgroundsList';

export function UseBackground() {
    useEffect(() => {
        const body = document.body;
        if (!body) return;
        const bgUrl = backgroundsList[1];

        const img = new Image();
        img.src = bgUrl;
        img.onload = () => {
            body.style.setProperty('--body-bg', `url(${bgUrl})`);
            body.classList.add('bg-loaded');
        };
        img.onerror = () => {
            body.style.setProperty('--body-bg', `url(${backgroundsList[0]})`);
            body.classList.add('bg-loaded');
        };

        return () => {
            body.classList.remove('bg-loaded');
            body.style.removeProperty('--body-bg');
        };

    }, []);

    return null;
}
