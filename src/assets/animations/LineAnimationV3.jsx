import React, { useEffect, useRef } from "react";
//DIGITAL CUBITOS COMO ELECTRICIDAD EN MICROCHIP

const LineAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const branchesRef = useRef([{ x: 0, y: window.innerHeight / 2, dx: 2, dy: 0 }]); // Initial line
  const MAX_BRANCHES = 200; // Set a maximum number of branches

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const drawLines = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#68ff68"; // Line color
    ctx.lineWidth = 2;

    branchesRef.current.forEach((branch) => {
      ctx.beginPath();
      ctx.moveTo(branch.startX || 0, branch.startY || canvas.height / 2); // Start point
      ctx.lineTo(branch.x, branch.y);
      ctx.stroke();

      // Update the position of the branch
      branch.x += branch.dx; // Move right

      // Randomly spread vertically
      if (Math.random() < 0.02) { // Adjust the probability for spreading
        const spreadDirection = Math.random() < 0.5 ? -1 : 1; // Randomly choose up or down
        const newY = branch.y + spreadDirection * (Math.random() * 50); // Increased vertical spread distance
        branchesRef.current.push({
          startX: branch.x,
          startY: branch.y,
          x: branch.x,
          y: newY,
          dx: 0, // No horizontal movement
          dy: 0,
        });
      }

      // Create horizontal lines from vertical lines
      if (branch.dy === 0 && Math.random() < 0.01) { // Adjust the probability for horizontal lines
        const horizontalOffset = 50; // Space between horizontal lines
        branchesRef.current.push({
          startX: branch.x,
          startY: branch.y,
          x: branch.x + horizontalOffset, // Start further to the right
          y: branch.y,
          dx: 2, // Move right
          dy: 0, // No vertical movement
        });
      }
    });

    // Limit the number of branches
    if (branchesRef.current.length > MAX_BRANCHES) {
      branchesRef.current.splice(0, branchesRef.current.length - MAX_BRANCHES); // Remove oldest branches
    }

    // Continue animation if lines aren't off screen
    if (branchesRef.current.some((b) => b.x < canvas.width)) {
      animationRef.current = requestAnimationFrame(drawLines);
    } else {
      cancelAnimationFrame(animationRef.current); // Stop animation if all branches are off screen
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    resizeCanvas(); // Initial resize

    const handleResize = () => {
      resizeCanvas();
      branchesRef.current = [{ x: 0, y: canvas.height / 2, dx: 2, dy: 0 }]; // Reset the branches
      drawLines(); // Restart drawing
    };

    window.addEventListener("resize", handleResize);
    drawLines(); // Start the animation

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ background: "#121212", display: "block" }} />;
};

export default LineAnimation;