import React, { useEffect, useRef } from 'react';
import styles from './Layout.module.css'; // Import CSS Module

const Layout = ({ children }) => {
  const canvasRef = useRef(null);
  const prevPositionRef = useRef(null);
  const linesRef = useRef([]);
  const totalDistanceRef = useRef(0);

  const colors = [
    { r: 255, g: 0, b: 0 }, // Red
    { r: 0, g: 255, b: 0 }, // Green
    { r: 0, g: 0, b: 255 }, // Blue
    { r: 255, g: 255, b: 0 }, // Yellow
    { r: 255, g: 0, b: 255 }, // Magenta
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawPencilLine = (line) => {
      const { start, end, color, opacity } = line;

      ctx.beginPath();

      const jitter = () => Math.random() * 3 - 1.5;
      const lineWidth = 1;

      for (let i = 0; i < 10; i++) {
        ctx.moveTo(start.x + jitter(), start.y + jitter());
        ctx.lineTo(end.x + jitter(), end.y + jitter());
      }

      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#D21F32';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      linesRef.current = linesRef.current.map((line) => ({
        ...line,
        opacity: line.opacity - 0.01,
      }));

      linesRef.current = linesRef.current.filter((line) => line.opacity > 0);
      linesRef.current.forEach(drawPencilLine);

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const currentPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    const prevPosition = prevPositionRef.current;

    if (prevPosition) {
      const distance = Math.sqrt(
        Math.pow(currentPosition.x - prevPosition.x, 2) +
          Math.pow(currentPosition.y - prevPosition.y, 2)
      );

      totalDistanceRef.current += distance;
      const colorIndex =
        Math.floor(totalDistanceRef.current / 300) % colors.length;
      const color = colors[colorIndex];

      linesRef.current.push({
        start: { ...prevPosition },
        end: { ...currentPosition },
        color,
        opacity: 1,
      });
    }

    prevPositionRef.current = currentPosition;
  };

  const handleMouseLeave = () => {
    prevPositionRef.current = null;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.canvasContainer} // Use the module CSS class for the container
    >
      <canvas ref={canvasRef} className={styles.canvas} /> {/* Canvas with module CSS */}
      <div className={styles.contentWrapper}>{children}</div> {/* Content wrapper */}
    </div>
  );
};

export default Layout;
