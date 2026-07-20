import { useEffect } from 'react';

const COLORS = ['#00f5ff', '#a78bfa', '#ffffff', '#f0abfc', '#7ee8fa', '#fbbf24'];

function star(size: number): string {
  // 4-pointed star clip-path string
  return `polygon(50% 0%, 61% 38%, 98% 38%, 68% 59%, 79% 98%, 50% 73%, 21% 98%, 32% 59%, 2% 38%, 39% 38%)`;
}

function spawnSparkles(x: number, y: number) {
  const count = 10 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const dist  = 28 + Math.random() * 48;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size  = 4 + Math.random() * 6;
    const dur   = 500 + Math.random() * 300;

    Object.assign(el.style, {
      position:       'fixed',
      pointerEvents:  'none',
      zIndex:         '9999',
      left:           `${x}px`,
      top:            `${y}px`,
      width:          `${size}px`,
      height:         `${size}px`,
      background:     color,
      clipPath:       star(size),
      boxShadow:      `0 0 ${size * 1.5}px ${color}`,
      transform:      'translate(-50%, -50%) scale(1)',
      opacity:        '1',
      transition:     `transform ${dur}ms ease-out, opacity ${dur}ms ease-out`,
      willChange:     'transform, opacity',
    });

    document.body.appendChild(el);

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0) rotate(${Math.random() * 360}deg)`;
        el.style.opacity   = '0';
      });
    });

    setTimeout(() => el.remove(), dur + 50);
  }
}

export default function SparkleEffect() {
  useEffect(() => {
    const handler = (e: MouseEvent) => spawnSparkles(e.clientX, e.clientY);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return null;
}
