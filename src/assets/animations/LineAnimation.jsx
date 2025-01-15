// src/LineAnimation.js
import { useEffect, useRef } from "react";

const LineAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initial position and branches
    const branches = [{ x: 0, y: canvas.height / 2, dx: 5, dy: 0 }];

    function drawLine() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#68ff68"; // Line color
      ctx.lineWidth = 3;

      branches.forEach((branch) => {
        ctx.beginPath();
        ctx.moveTo(branch.startX || 0, branch.startY || canvas.height / 2); // Start point
        ctx.lineTo(branch.x, branch.y);
        ctx.stroke();

        // Update the position of the branch
        branch.x += branch.dx;
        branch.y += branch.dy;

        // Random chance to create a new branch
        if (
          Math.random() > 0.97 && // Random chance to branch
          branch.x - (branch.startX || 10) > 20 // Ensure spacing
        ) {
          branches.push({
            startX: branch.x,
            startY: branch.y,
            x: branch.x,
            y: branch.y,
            dx: 5, // Move right
            dy: Math.random() > 0.5 ? 2 : -2 // Random vertical direction
          });
        }
      });

      // Continue animation if lines aren't off screen
      if (branches.some((b) => b.x < canvas.width)) {
        requestAnimationFrame(drawLine);
      }
    }

    drawLine();
  }, []);

  return <canvas ref={canvasRef} style={{ background: "#121212" }} />;
};

export default LineAnimation;