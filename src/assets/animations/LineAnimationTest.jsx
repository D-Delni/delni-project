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
    //Distancia despues del nombre: canvas.width/2.85,
    const branches = [{ x: canvas.width/2.96, y: canvas.height / 2, dx: 2, dy: 0 }];

    function drawLine() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#68ff68"; // Line color
      ctx.lineWidth = 3;

      branches.forEach((branch) => {
        ctx.beginPath();
        ctx.moveTo(branch.startX || 0, branch.startY || canvas.height / 2); // Start point
        ctx.lineTo(branch.x, branch.y);
        ctx.stroke();
        if(branch.startX < canvas.width/2.96){
          branch.push({
            startX: branch.x,
            startY: branch.y,
            x: branch.x,
            y: branch.y,
            dx: 5, // Move right
            dy: 0
          });
        }
        // Update the position of the branch
        branch.x += branch.dx;
        branch.y += branch.dy;

        // Random chance to create a new branch
        console.log("Before: "+branch.x)
        if (
          Math.random() > 0.9775 && // Random chance to branch
          branch.x - (branch.startX || 10) > 20// Ensure spacing
        ) {
          console.log("After: "+branch.x)
          branches.push({
            startX: branch.x,
            startY: branch.y,
            x: branch.x,
            y: branch.y,
            dx: 5, // Move right
            dy: Math.random() > 0.5 ? 1 : -1 // Random vertical direction
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