import { useEffect, useRef } from "react";

const TreeCanvas = () => {
  const canvasRef = useRef(null);
  const branchesRef = useRef([]);
  const generationRef = useRef(0);

  const START_X = window.innerWidth / 2;
  const START_Y = window.innerHeight - 50;
  const BRANCH_LENGTH = 20;
  const ANGLE = 18 * (Math.PI / 180);
  const INTERVAL = 500; // 0.5 seconds
  const MAX_GENERATIONS = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initialize first branch
    branchesRef.current = [{ x: START_X, y: START_Y, angle: -Math.PI / 2, length: BRANCH_LENGTH, thickness: 4 }];

    function drawBranch(x, y, angle, length, thickness) {
      const newX = x + length * Math.cos(angle);
      const newY = y + length * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(newX, newY);
      ctx.strokeStyle = "black";
      ctx.lineWidth = thickness;
      ctx.stroke();

      return { x: newX, y: newY, angle, length: length * 0.9, thickness: Math.max(thickness * 0.8, 1) };
    }

    function updateBranches() {
      if (generationRef.current >= MAX_GENERATIONS) return;

      let newBranches = [];
      branchesRef.current.forEach((branch) => {
        const rand = Math.random();
        if (rand < 0.33) {
          newBranches.push(drawBranch(branch.x, branch.y, branch.angle - ANGLE, branch.length, branch.thickness));
        } else if (rand < 0.66) {
          newBranches.push(drawBranch(branch.x, branch.y, branch.angle, branch.length, branch.thickness));
        } else {
          newBranches.push(drawBranch(branch.x, branch.y, branch.angle + ANGLE, branch.length, branch.thickness));
        }
      });

      branchesRef.current = newBranches;
      generationRef.current++;
    }

    const interval = setInterval(() => {
      updateBranches();
      if (generationRef.current >= MAX_GENERATIONS) clearInterval(interval);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default TreeCanvas;
