import React, { useEffect, useRef } from 'react';

interface HeroMotionCanvasProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
}

interface GridPulse {
  axis: 'x' | 'y';
  index: number;
  pos: number;
  speed: number;
  length: number;
  alpha: number;
}

interface FluidOrb {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  angle: number;
  speed: number;
}

export const HeroMotionCanvas: React.FC<HeroMotionCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const checkReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (checkReducedMotion) return;

    // Handle high-DPI retina screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mouse coordinates tracking
    let mouseX = width * 0.45;
    let mouseY = height * 0.45;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Grid sizing representing 600×1200 tile ratio
    const gridTileW = 72;
    const gridTileH = 144;

    // Particles (crystalline marble motes)
    const particleCount = 45;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.2 - Math.random() * 0.4,
        size: 1 + Math.random() * 2,
        alpha: Math.random() * 0.5,
        maxAlpha: 0.35 + Math.random() * 0.55,
        pulseSpeed: 0.015 + Math.random() * 0.02
      });
    }

    // Grid light pulses
    const pulses: GridPulse[] = [];
    const pulseCount = 7;
    for (let i = 0; i < pulseCount; i++) {
      pulses.push({
        axis: Math.random() > 0.5 ? 'x' : 'y',
        index: Math.floor(Math.random() * 20),
        pos: Math.random() * (Math.random() > 0.5 ? width : height),
        speed: 1.2 + Math.random() * 1.8,
        length: 80 + Math.random() * 120,
        alpha: 0.3 + Math.random() * 0.5
      });
    }

    // Fluid Orbs for Ambient Aurora Mesh
    const orbs: FluidOrb[] = [
      {
        x: width * 0.2,
        y: height * 0.35,
        baseX: width * 0.2,
        baseY: height * 0.35,
        radius: Math.min(width, height) * 0.45,
        color: 'rgba(59, 130, 246, 0.16)', // Sapphire Blue
        vx: 0,
        vy: 0,
        angle: 0,
        speed: 0.006
      },
      {
        x: width * 0.75,
        y: height * 0.5,
        baseX: width * 0.75,
        baseY: height * 0.5,
        radius: Math.min(width, height) * 0.5,
        color: 'rgba(37, 99, 235, 0.14)', // Cobalt Navy
        vx: 0,
        vy: 0,
        angle: Math.PI,
        speed: 0.005
      },
      {
        x: width * 0.5,
        y: height * 0.8,
        baseX: width * 0.5,
        baseY: height * 0.8,
        radius: Math.min(width, height) * 0.38,
        color: 'rgba(96, 165, 250, 0.10)', // Azure Glaze
        vx: 0,
        vy: 0,
        angle: Math.PI / 2,
        speed: 0.008
      }
    ];

    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!canvas) return;
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Fluid Aurora Mesh Gradients
      orbs.forEach((orb) => {
        orb.angle += orb.speed;
        orb.x = orb.baseX + Math.sin(orb.angle) * 70;
        orb.y = orb.baseY + Math.cos(orb.angle * 0.8) * 50;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'rgba(7, 10, 18, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Interactive Cursor Lighting Spotlight
      const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 280);
      mouseGrad.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
      mouseGrad.addColorStop(0.5, 'rgba(37, 99, 235, 0.04)');
      mouseGrad.addColorStop(1, 'rgba(7, 10, 18, 0)');
      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 280, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Architectural Tile Layout Grid Lines
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      const cols = Math.ceil(width / gridTileW) + 1;
      const rows = Math.ceil(height / gridTileH) + 1;

      for (let c = 0; c < cols; c++) {
        const x = c * gridTileW;
        const distToMouse = Math.abs(x - mouseX);
        const mouseProximity = Math.max(0, 1 - distToMouse / 260);
        const alpha = 0.035 + mouseProximity * 0.08;

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let r = 0; r < rows; r++) {
        const y = r * gridTileH;
        const distToMouse = Math.abs(y - mouseY);
        const mouseProximity = Math.max(0, 1 - distToMouse / 260);
        const alpha = 0.035 + mouseProximity * 0.08;

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 4. Subtle Tile Joint Intersection Crosshairs (+)
      for (let c = 1; c < cols - 1; c += 2) {
        for (let r = 1; r < rows - 1; r += 2) {
          const ix = c * gridTileW;
          const iy = r * gridTileH;
          const dist = Math.hypot(ix - mouseX, iy - mouseY);
          if (dist < 320) {
            const crossAlpha = Math.max(0, (1 - dist / 320) * 0.28);
            ctx.strokeStyle = `rgba(96, 165, 250, ${crossAlpha})`;
            ctx.beginPath();
            ctx.moveTo(ix - 5, iy);
            ctx.lineTo(ix + 5, iy);
            ctx.moveTo(ix, iy - 5);
            ctx.lineTo(ix, iy + 5);
            ctx.stroke();
          }
        }
      }

      // 5. Grid Light Pulses Traveling Along Axes
      pulses.forEach((p) => {
        p.pos += p.speed;
        const maxBound = p.axis === 'x' ? height : width;
        if (p.pos > maxBound + p.length) {
          p.pos = -p.length;
          p.index = Math.floor(Math.random() * (p.axis === 'x' ? cols : rows));
          p.speed = 1.2 + Math.random() * 2.2;
        }

        ctx.lineWidth = 1.5;
        if (p.axis === 'x') {
          const gx = p.index * gridTileW;
          const pulseGrad = ctx.createLinearGradient(gx, p.pos - p.length, gx, p.pos);
          pulseGrad.addColorStop(0, 'rgba(59, 130, 246, 0)');
          pulseGrad.addColorStop(0.8, `rgba(96, 165, 250, ${p.alpha})`);
          pulseGrad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
          ctx.strokeStyle = pulseGrad;
          ctx.beginPath();
          ctx.moveTo(gx, Math.max(0, p.pos - p.length));
          ctx.lineTo(gx, Math.min(height, p.pos));
          ctx.stroke();
        } else {
          const gy = p.index * gridTileH;
          const pulseGrad = ctx.createLinearGradient(p.pos - p.length, gy, p.pos, gy);
          pulseGrad.addColorStop(0, 'rgba(59, 130, 246, 0)');
          pulseGrad.addColorStop(0.8, `rgba(96, 165, 250, ${p.alpha})`);
          pulseGrad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
          ctx.strokeStyle = pulseGrad;
          ctx.beginPath();
          ctx.moveTo(Math.max(0, p.pos - p.length), gy);
          ctx.lineTo(Math.min(width, p.pos), gy);
          ctx.stroke();
        }
      });

      // 6. Draw Crystalline Micro-Particles (Marble Dust)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.pulseSpeed;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = Math.abs(Math.sin(p.alpha)) * p.maxAlpha;

        // Subtle soft glow around particles
        ctx.fillStyle = `rgba(248, 250, 252, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Blue glow aura for larger particles
        if (p.size > 1.8) {
          ctx.fillStyle = `rgba(59, 130, 246, ${currentAlpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
      aria-hidden="true"
    />
  );
};
