import React, { useEffect, useRef } from 'react';

interface GlobalMotionCanvasProps {
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

export const GlobalMotionCanvas: React.FC<GlobalMotionCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const checkReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (checkReducedMotion) return;

    // Handle high-DPI retina screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mouse coordinates tracking across whole window
    let mouseX = width * 0.5;
    let mouseY = height * 0.4;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll parallax tracking
    let currentScrollY = window.scrollY;
    let targetScrollY = currentScrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Grid sizing representing 600×1200 architectural tile ratio
    const gridTileW = 80;
    const gridTileH = 160;

    // Crystalline marble motes
    const particleCount = 55;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: -0.25 - Math.random() * 0.45,
        size: 1 + Math.random() * 2.2,
        alpha: Math.random() * 0.6,
        maxAlpha: 0.35 + Math.random() * 0.55,
        pulseSpeed: 0.012 + Math.random() * 0.022
      });
    }

    // Grid light pulses
    const pulses: GridPulse[] = [];
    const pulseCount = 8;
    for (let i = 0; i < pulseCount; i++) {
      pulses.push({
        axis: Math.random() > 0.5 ? 'x' : 'y',
        index: Math.floor(Math.random() * 24),
        pos: Math.random() * (Math.random() > 0.5 ? width : height),
        speed: 1.4 + Math.random() * 2.2,
        length: 90 + Math.random() * 140,
        alpha: 0.35 + Math.random() * 0.55
      });
    }

    // Ambient Aurora Fluid Mesh Orbs
    const orbs: FluidOrb[] = [
      {
        x: width * 0.22,
        y: height * 0.3,
        baseX: width * 0.22,
        baseY: height * 0.3,
        radius: Math.min(width, height) * 0.5,
        color: 'rgba(59, 130, 246, 0.16)', // Electric Sapphire
        vx: 0,
        vy: 0,
        angle: 0,
        speed: 0.005
      },
      {
        x: width * 0.8,
        y: height * 0.55,
        baseX: width * 0.8,
        baseY: height * 0.55,
        radius: Math.min(width, height) * 0.55,
        color: 'rgba(37, 99, 235, 0.14)', // Cobalt Navy
        vx: 0,
        vy: 0,
        angle: Math.PI,
        speed: 0.004
      },
      {
        x: width * 0.45,
        y: height * 0.85,
        baseX: width * 0.45,
        baseY: height * 0.85,
        radius: Math.min(width, height) * 0.42,
        color: 'rgba(96, 165, 250, 0.11)', // Azure Glaze
        vx: 0,
        vy: 0,
        angle: Math.PI / 2,
        speed: 0.007
      }
    ];

    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!canvas) return;
        width = window.innerWidth;
        height = window.innerHeight;
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
      mouseX += (targetMouseX - mouseX) * 0.055;
      mouseY += (targetMouseY - mouseY) * 0.055;

      // Smooth scroll parallax damping
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      const scrollOffset = (currentScrollY * 0.18) % gridTileH;

      ctx.clearRect(0, 0, width, height);

      // Check current theme
      const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
      const baseLineAlpha = isLightMode ? 0.04 : 0.038;
      const baseLineColor = isLightMode ? '29, 78, 216' : '255, 255, 255';

      // 1. Draw Fluid Aurora Mesh Gradients
      orbs.forEach((orb) => {
        orb.angle += orb.speed;
        orb.x = orb.baseX + Math.sin(orb.angle) * 80;
        orb.y = orb.baseY + Math.cos(orb.angle * 0.75) * 60;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'rgba(7, 10, 18, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Interactive Cursor Lighting Spotlight
      const mouseGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 320);
      mouseGrad.addColorStop(0, 'rgba(59, 130, 246, 0.14)');
      mouseGrad.addColorStop(0.5, 'rgba(37, 99, 235, 0.05)');
      mouseGrad.addColorStop(1, 'rgba(7, 10, 18, 0)');
      ctx.fillStyle = mouseGrad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 320, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Architectural Tile Layout Grid Lines
      ctx.lineWidth = 1;
      const cols = Math.ceil(width / gridTileW) + 1;
      const rows = Math.ceil(height / gridTileH) + 2;

      // Vertical grid lines
      for (let c = 0; c < cols; c++) {
        const x = c * gridTileW;
        const distToMouse = Math.abs(x - mouseX);
        const mouseProximity = Math.max(0, 1 - distToMouse / 280);
        const alpha = baseLineAlpha + mouseProximity * 0.09;

        ctx.strokeStyle = `rgba(${baseLineColor}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal grid lines with scroll parallax
      for (let r = 0; r < rows; r++) {
        const y = r * gridTileH - scrollOffset;
        if (y < -10 || y > height + 10) continue;
        const distToMouse = Math.abs(y - mouseY);
        const mouseProximity = Math.max(0, 1 - distToMouse / 280);
        const alpha = baseLineAlpha + mouseProximity * 0.09;

        ctx.strokeStyle = `rgba(${baseLineColor}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 4. Tile Joint Intersection Crosshairs (+)
      for (let c = 1; c < cols - 1; c += 2) {
        for (let r = 0; r < rows; r += 2) {
          const ix = c * gridTileW;
          const iy = r * gridTileH - scrollOffset;
          if (iy < -10 || iy > height + 10) continue;
          const dist = Math.hypot(ix - mouseX, iy - mouseY);
          if (dist < 340) {
            const crossAlpha = Math.max(0, (1 - dist / 340) * 0.32);
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
          p.speed = 1.4 + Math.random() * 2.2;
        }

        ctx.lineWidth = 1.5;
        if (p.axis === 'x') {
          const gx = p.index * gridTileW;
          const pulseGrad = ctx.createLinearGradient(gx, p.pos - p.length, gx, p.pos);
          pulseGrad.addColorStop(0, 'rgba(59, 130, 246, 0)');
          pulseGrad.addColorStop(0.8, `rgba(96, 165, 250, ${p.alpha})`);
          pulseGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
          ctx.strokeStyle = pulseGrad;
          ctx.beginPath();
          ctx.moveTo(gx, Math.max(0, p.pos - p.length));
          ctx.lineTo(gx, Math.min(height, p.pos));
          ctx.stroke();
        } else {
          const gy = p.index * gridTileH - scrollOffset;
          if (gy >= 0 && gy <= height) {
            const pulseGrad = ctx.createLinearGradient(p.pos - p.length, gy, p.pos, gy);
            pulseGrad.addColorStop(0, 'rgba(59, 130, 246, 0)');
            pulseGrad.addColorStop(0.8, `rgba(96, 165, 250, ${p.alpha})`);
            pulseGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
            ctx.strokeStyle = pulseGrad;
            ctx.beginPath();
            ctx.moveTo(Math.max(0, p.pos - p.length), gy);
            ctx.lineTo(Math.min(width, p.pos), gy);
            ctx.stroke();
          }
        }
      });

      // 6. Draw Crystalline Micro-Particles (Marble Motes)
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

        ctx.fillStyle = `rgba(248, 250, 252, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.size > 1.8) {
          ctx.fillStyle = `rgba(59, 130, 246, ${currentAlpha * 0.45})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
};
