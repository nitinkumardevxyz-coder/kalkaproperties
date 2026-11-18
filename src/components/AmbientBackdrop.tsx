import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface WireCube {
  x: number;
  y: number;
  z: number;
  size: number;
  rotY: number;
  rotX: number;
  speedY: number;
  speedX: number;
  driftPhase: number;
  tone: 'amber' | 'crimson' | 'slate';
}

const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

const UNIT_VERTS: Array<[number, number, number]> = [
  [-0.5, -0.45, -0.5],
  [0.5, -0.45, -0.5],
  [0.5, 0.45, -0.5],
  [-0.5, 0.45, -0.5],
  [-0.5, -0.45, 0.5],
  [0.5, -0.45, 0.5],
  [0.5, 0.45, 0.5],
  [-0.5, 0.45, 0.5],
];

export function AmbientBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const cubes: WireCube[] = [
      { x: 0.12, y: 0.22, z: 0.2, size: 78, rotY: 0.5, rotX: 0.35, speedY: 0.16, speedX: 0.06, driftPhase: 0.2, tone: 'crimson' },
      { x: 0.86, y: 0.18, z: 0.35, size: 92, rotY: 1.1, rotX: 0.28, speedY: -0.13, speedX: 0.05, driftPhase: 1.4, tone: 'amber' },
      { x: 0.18, y: 0.76, z: 0.3, size: 84, rotY: 0.8, rotX: 0.42, speedY: 0.12, speedX: -0.04, driftPhase: 2.3, tone: 'slate' },
      { x: 0.82, y: 0.74, z: 0.25, size: 72, rotY: 1.7, rotX: 0.31, speedY: -0.15, speedX: 0.05, driftPhase: 3.1, tone: 'crimson' },
      { x: 0.5, y: 0.48, z: 0.5, size: 118, rotY: 0.3, rotX: 0.24, speedY: 0.08, speedX: 0.03, driftPhase: 0.9, tone: 'amber' },
    ];

    let rafId = 0;
    let lastTs = performance.now();
    let elapsed = 0;

    const drawFrame = (timeSec: number) => {
      ctx.clearRect(0, 0, width, height);

      // Perspective architectural blueprint grid in lower half
      const horizonY = height * 0.54;
      const vanishX = width * 0.5;
      ctx.save();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.075)';
      ctx.lineWidth = 1;

      const gridCols = 14;
      for (let i = -gridCols; i <= gridCols; i++) {
        const bottomX = vanishX + i * (width / 10);
        const topX = vanishX + i * 24;
        ctx.beginPath();
        ctx.moveTo(topX, horizonY);
        ctx.lineTo(bottomX, height + 20);
        ctx.stroke();
      }

      const scrollOffset = prefersReduced ? 0 : (timeSec * 0.22) % 1;
      for (let r = 0; r < 11; r++) {
        const progress = (r + scrollOffset) / 11;
        const y = horizonY + Math.pow(progress, 2.05) * (height - horizonY + 10);
        ctx.strokeStyle = `rgba(148, 163, 184, ${0.025 + progress * 0.07})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Subtle drifting 3D architectural wireframe volumes
      for (const cube of cubes) {
        const cx = cube.x * width + Math.sin(timeSec * 0.35 + cube.driftPhase) * 14;
        const cy = cube.y * height + Math.cos(timeSec * 0.28 + cube.driftPhase) * 12;
        const ry = cube.rotY + timeSec * cube.speedY;
        const rx = cube.rotX + timeSec * cube.speedX;
        const cosY = Math.cos(ry);
        const sinY = Math.sin(ry);
        const cosX = Math.cos(rx);
        const sinX = Math.sin(rx);

        const projected: Array<[number, number]> = UNIT_VERTS.map(([vx, vy, vz]) => {
          const x1 = vx * cosY - vz * sinY;
          const z1 = vx * sinY + vz * cosY;
          const y2 = vy * cosX - z1 * sinX;
          const z2 = vy * sinX + z1 * cosX;
          const scale = cube.size / (1.8 - z2 * 0.45);
          return [cx + x1 * scale, cy + y2 * scale];
        });

        ctx.strokeStyle =
          cube.tone === 'crimson'
            ? 'rgba(220, 38, 38, 0.22)'
            : cube.tone === 'amber'
              ? 'rgba(245, 158, 11, 0.19)'
              : 'rgba(148, 163, 184, 0.16)';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        for (const [a, b] of EDGES) {
          ctx.moveTo(projected[a][0], projected[a][1]);
          ctx.lineTo(projected[b][0], projected[b][1]);
        }
        ctx.stroke();

        // Corner node ticks
        ctx.fillStyle =
          cube.tone === 'crimson'
            ? 'rgba(248, 113, 113, 0.38)'
            : cube.tone === 'amber'
              ? 'rgba(251, 191, 36, 0.34)'
              : 'rgba(203, 213, 225, 0.28)';
        for (const [px, py] of projected) {
          ctx.fillRect(px - 1.25, py - 1.25, 2.5, 2.5);
        }
      }
    };

    drawFrame(0);
    if (prefersReduced) {
      return () => window.removeEventListener('resize', resize);
    }

    const tick = (now: number) => {
      const dt = Math.min((now - lastTs) / 1000, 0.08);
      lastTs = now;
      if (!document.hidden) {
        elapsed += dt;
        drawFrame(elapsed);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0B0E14]"
    >
      {/* Atmospheric Radial Architectural Glows */}
      <div
        className="absolute -top-36 -left-24 h-[540px] w-[540px] rounded-full opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(185,28,28,0.42) 0%, rgba(185,28,28,0.06) 48%, transparent 72%)',
        }}
      />
      <div
        className="absolute top-[24%] -right-28 h-[560px] w-[560px] rounded-full opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(217,119,6,0.34) 0%, rgba(217,119,6,0.05) 50%, transparent 72%)',
        }}
      />
      <div
        className="absolute -bottom-40 left-[28%] h-[500px] w-[620px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(15,23,42,0.04) 55%, transparent 75%)',
        }}
      />

      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
