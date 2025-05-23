import { useEffect, useRef } from "react";

const LineAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const branchesRef = useRef([{ x: 0, y: 0, dx: 5, dy: 0 }]);
  const isAnimating = useRef(false);
  const delayBeforeStart = 1000; // Delay in milliseconds before the first spread starts

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Reset the initial position of branches
    branchesRef.current = [{ x: 0, y: canvas.height / 2, dx: 5, dy: 0 }];
  };

  const drawLine = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#68ff68"; // Line color
    ctx.lineWidth = 3;

    branchesRef.current.forEach((branch) => {
      ctx.beginPath();
      ctx.moveTo(branch.startX || 0, branch.startY || canvas.height / 2); // Start point
      ctx.lineTo(branch.x, branch.y);
      ctx.stroke();

      // Update the position of the branch
      branch.x += branch.dx; // Move right
      branch.y += branch.dy; // Move vertically

      // Check if the line has reached the middle of the screen before allowing branching
      const reachedMiddle = branch.x >= canvas.width / 2;

      // Random chance to create a new branch after reaching the middle of the screen
      if (
        reachedMiddle && // Check if the line has reached the middle
        Math.random() > 0.97 && // Random chance to branch
        branch.x - (branch.startX || 10) > 20 && // Ensure spacing
        branchesRef.current.length < 100 // Limit the number of branches
      ) {
        // Randomly choose an angle between 30 and 60 degrees
        const angle = Math.random() * (150 - 30) + 30; // Angle in degrees
        const angleInRadians = (angle * Math.PI) / 180; // Convert to radians
        const spreadFactor = Math.tan(angleInRadians); // Calculate the vertical spread

        branchesRef.current.push({
          startX: branch.x, // Start position of the new branch
          startY: branch.y,
          x: branch.x, // New branch starts at the current position
          y: branch.y,
          dx: 5, // Move right
          dy: (Math.random() > 0.5 ? 1 : -1) * spreadFactor * branch.dx // Calculate dy based on the angle
        });
      }
    });

    // Continue animation if lines aren't off screen
    if (branchesRef.current.some((b) => b.x < canvas.width)) {
      animationRef.current = requestAnimationFrame(drawLine);
    } else {
      isAnimating.current = false; // Stop animation if all branches are off screen
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    resizeCanvas(); // Initial resize

    const handleResize = () => {
      resizeCanvas();
      branchesRef.current = [{ x: 0, y: canvas.height / 2, dx: 5, dy: 0 }];
      if (!isAnimating.current) {
        isAnimating.current = true;
        drawLine();
      }
    };

    window.addEventListener("resize", handleResize);
    isAnimating.current = true;

    const startAnimation = setTimeout(() => {
      drawLine(); // Start the animation after the specified delay
    }, delayBeforeStart);

    return () => {
      clearTimeout(startAnimation); // Clear the timeout if the component unmounts
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ background: "#121212", display: "block" }} />;
};

export default LineAnimation;