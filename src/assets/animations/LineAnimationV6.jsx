import { useEffect, useRef } from "react";

const createLineAnimation = (canvasRef) => {
  let isScrolling = false;
  let onScreen = false;
  let scrollSpeed = 0;
  let speedFactor = 0.05;
  let yPos = 0; // Initial position of the line

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    speedFactor = canvas.height * 0.002; // Adjust speed dynamically
    yPos = 0; // Reset position on resize
  };

  const handleScroll = (event) => {
    isScrolling = true;
    scrollSpeed = event.deltaY * speedFactor;
  };

  const drawLine = () => {
    if (!isScrolling) {
      requestAnimationFrame(drawLine);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#DDA95A"; // Line color
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0); // Start at the top
    ctx.lineTo(canvas.width / 2, yPos); // Draw to current position
    ctx.stroke();

    
        yPos += scrollSpeed/2; 
    // Move based on scroll speed
    scrollSpeed *= 0.1; // Smooth deceleration

    if (Math.abs(scrollSpeed) < 0.1) {
      isScrolling = false; // Stop if nearly still
    }

    requestAnimationFrame(drawLine);
  };

  return { resizeCanvas, handleScroll, drawLine };
};

const LineAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const { resizeCanvas, handleScroll, drawLine } = createLineAnimation(canvasRef);

    resizeCanvas();
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(drawLine);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block", position: "absolute", top: 0, left: 0 }} />;
};

export default LineAnimation;
