import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../styles/globals.css';


export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%?*!';


    document.querySelectorAll<HTMLElement>('.glitch-text').forEach(el => {
      const finalText = el.dataset.text || '';
      let frame = 0;


      setInterval(() => {
  const scrambled = finalText
    .split('')
    .map((char, i) =>
      i < frame
        ? char
        : chars[Math.floor(Math.random() * chars.length)]
    )
    .join('');

  el.textContent = scrambled;

  // 🔧 HALF JITTER (±3px instead of ±6px)
  const x = Math.floor(Math.random() * 2 - 1);
  const y = Math.floor(Math.random() * 2 - 1);
  el.style.transform = `translate(${x}px, ${y}px)`;

  frame++;
  if (frame > finalText.length) frame = 0;
}, 10); // ⚡ MUCH FASTER
    });
  }, []);


  return <Component {...pageProps} />;
}