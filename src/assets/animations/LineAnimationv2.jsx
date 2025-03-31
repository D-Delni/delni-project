import { useEffect, useRef } from "react";

const LineAnimation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const branchesRef = useRef([{ x: 0, y: 0, dx: 0, dy: 5 }]);
  const isAnimating = useRef(false);
  const delayBeforeStart = 1700; // Delay in milliseconds before the first spread starts

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Reset the initial position of branches
    branchesRef.current = [{ x: canvas.width / 3, y: canvas.height / 2, dx: 0, dy: 5 }];
    if (!isAnimating.current) {
      setTimeout(drawLine, delayBeforeStart); // Restart animation on resize with delay
    }
  };

  const drawLine = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#DDA95A"; // Line color
    ctx.lineWidth = 3;

    let x = canvas.width / 3;
    let y = canvas.height / 2; // Start from the top
    const step = 5; // Step size per frame
    const bifurcation = canvas.height * 0.9; // Bifurcate before reaching full height

    const animate = () => {
      if (y < canvas.height) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        y += step;
        ctx.lineTo(x, y);
        ctx.stroke();


        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  useEffect(() => {
    resizeCanvas(); // Initial resize

    const handleResize = () => {
      cancelAnimationFrame(animationRef.current); // Cancel current animation
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    isAnimating.current = true;
    setTimeout(drawLine, delayBeforeStart); // Start drawing after delay

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default LineAnimation;
