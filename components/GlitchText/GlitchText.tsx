import { useEffect, useRef, useState } from 'react';


type GlitchTextProps = {
  text: string;
};


const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789@#$%?*!';


export default function GlitchText({ text }: GlitchTextProps) {
  // ✅ stable initial render (SSR-safe)
  const [output, setOutput] = useState(text.split(''));
  const [offset, setOffset] = useState({ x: 0, y: 0 });


  // store per-character timers
  const timers = useRef<number[]>([]);


  useEffect(() => {
    const chars = text.split('');


    // clear any existing timers
    timers.current.forEach(clearInterval);
    timers.current = [];


    chars.forEach((_, index) => {
      const speed = Math.floor(Math.random() * 40) + 100; // 20–60ms PER CHAR


      const timer = window.setInterval(() => {
        setOutput(prev => {
          const next = [...prev];
          next[index] =
            CHARS[Math.floor(Math.random() * CHARS.length)];
          return next;
        });


        // small random jitter per update
        setOffset({
          x: Math.floor(Math.random() * 4 - 1),
          y: Math.floor(Math.random() * 4 - 1),
        });
      }, speed);


      timers.current.push(timer);
    });


    return () => {
      timers.current.forEach(clearInterval);
    };
  }, [text]);


  return (
    <span
      style={{
        display: 'inline-block',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        fontFamily: 'monospace',
        color: '#555',
        letterSpacing: '0.2em',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {output.join('')}
    </span>
  );
}