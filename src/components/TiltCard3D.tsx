import { ReactNode, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TiltCard3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  delay?: number;
}

export function TiltCard3D({
  children,
  className = '',
  intensity = 5,
  delay = 0,
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hovered: false });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.pointerType === 'touch') return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -py * intensity,
      ry: px * intensity,
      hovered: true,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, hovered: false });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReduced ? false : { opacity: 0.85, y: 12, rotateX: 3 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.24,
        delay: Math.min(delay, 0.14),
        ease: [0.16, 1, 0.3, 1],
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: prefersReduced
          ? undefined
          : `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${
              tilt.hovered ? '6px' : '0px'
            })`,
        transition: tilt.hovered
          ? 'transform 90ms cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
