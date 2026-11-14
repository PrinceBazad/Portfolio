import React, { useEffect, useRef } from 'react';

const ParticleCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas && canvas.getContext('2d');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canvas || !context || !finePointer || reducedMotion) return undefined;

    const particles = [];
    let frameId = 0;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityX *= 0.985;
        particle.velocityY *= 0.985;
        particle.life -= 0.018;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        context.globalAlpha = particle.life * 0.65;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
        context.fill();
      }

      context.globalCompositeOperation = 'source-over';
      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const a = particles[first];
          const b = particles[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 70) {
            context.strokeStyle = `rgba(182, 255, 108, ${(1 - distance / 70) * Math.min(a.life, b.life) * 0.22})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }

      if (particles.length) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        frameId = 0;
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      for (let index = 0; index < 3; index += 1) {
        particles.push({
          x: event.clientX + (Math.random() - 0.5) * 8,
          y: event.clientY + (Math.random() - 0.5) * 8,
          velocityX: (Math.random() - 0.5) * 1.8,
          velocityY: (Math.random() - 0.5) * 1.8,
          life: 1,
          size: 1 + Math.random() * 2,
          color: index === 0 ? '#b6ff6c' : '#a78bfa',
        });
      }

      if (particles.length > 54) particles.splice(0, particles.length - 54);
      if (!frameId) frameId = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-cursor" aria-hidden="true" />;
};

export default ParticleCursor;
