import React, { useEffect, useRef, useState } from "react";

const CircleWithParticles = () => {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particleCount = 20; // Number of particles around the circle
  const circleRadius = 50; // Main circle radius
  const particleDistance = 70; // Distance of particles from the center of the circle

  // Update mouse position on mouse move
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Particle class to handle individual particles
  class Particle {
    constructor(mouseX, mouseY, angle, radius) {
      this.radius = 3; // Radius of each particle
      this.angle = angle; // Angle for positioning around the circle
      this.x = mouseX + Math.cos(this.angle) * radius;
      this.y = mouseY + Math.sin(this.angle) * radius;
      this.color = "#DDA95A"; // Color of the particles
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create the particles in a circle around the mouse position
    const particles = [];
    const generateParticles = (mouseX, mouseY) => {
      particles.length = 0; // Clear particles when generating new ones
      for (let i = 0; i < particleCount; i++) {
        const angle = (i * Math.PI * 2) / particleCount;
        particles.push(new Particle(mouseX, mouseY, angle, particleDistance));
      }
    };

    // Draw the main circle and the particles around it
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before each draw

      // Draw the main circle following the mouse
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, circleRadius, 0, Math.PI * 2, false);
      ctx.fillStyle = "#DDA95A"; // Circle color
      ctx.fill();
      ctx.closePath();

      // Draw particles around the circle
      particles.forEach((particle) => particle.draw(ctx));

      requestAnimationFrame(draw);
    };

    generateParticles(mousePos.x, mousePos.y);
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mousePos]); // Only rerun the effect when the mouse position changes

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0"></canvas>;
};

export default CircleWithParticles;


