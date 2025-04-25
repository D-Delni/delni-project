import { useEffect, useRef } from "react"

const LineAnimation = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const branchesRef = useRef([{ x: 0, y: 0, dx: 0, dy: 5 }])
  const isAnimating = useRef(false)
  const delayBeforeStart = 1000 // Delay in milliseconds before the first spread starts

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Adjust the initial position of branches to be in the center of the canvas
    branchesRef.current = [{
      x: canvas.width / 2,    // Horizontal center
      y: canvas.height * 0.01, // Starting from 1% of the height
      dx: 0,                  // No initial horizontal movement
      dy: 5,                  // Movement speed vertically
      main_branch: true       // This is a main branch
    }]
  }

  const drawLine = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#DDA95A" // Line color: Yellow
    ctx.lineWidth = 3

    branchesRef.current.forEach((branch) => {
      ctx.beginPath()
      ctx.moveTo(branch.startX || canvas.width / 2, branch.startY || 0) // Start point
      ctx.lineTo(branch.x, branch.y)
      ctx.stroke()

      // Update the position of the branch
      branch.x += branch.dx // Move horizontally
      branch.y += branch.dy // Move down

      if (branch.main_branch && Math.random() > 0.925) {
        branch.dx = 0
        branch.dy = 0 // Stop the main branch
        branchesRef.current.push({
          startX: branch.x, // Start position of the new branch
          startY: branch.y,
          x: branch.x, // New branch starts at the current position
          y: branch.y,
          dx: 0, // No horizontal movement initially
          dy: 5, // Move down
          main_branch: false,
        })
      }

      // Random chance to create a new branch
      if (
        Math.random() > 0.95 && // Decreased probability
        branch.y > canvas.height / 3 && // Random chance to branch
        branch.y - (branch.startY || 10) > 600 && // Increased minimum distance
        branchesRef.current.length < 70 // Reduced maximum number of branches
      ) {
        // Randomly choose an angle between 30 and 60 degrees
        const angle = 45 // Angle in degrees
        const angleInRadians = (angle * Math.PI) / 180 // Convert to radians
        const spreadFactor = Math.tan(angleInRadians) // Calculate the horizontal spread

        branchesRef.current.push({
          startX: branch.x, // Start position of the new branch
          startY: branch.y,
          x: branch.x, // New branch starts at the current position
          y: branch.y,
          dx: (Math.random() > 0.5 ? 1.5 : -1.5) * spreadFactor * branch.dy, // Calculate dx based on the angle
          dy: 5, // Move down
          main_branch: true,
        })
      }
    })

    // Continue animation if lines aren't off screen
    if (branchesRef.current.some((b) => b.y < canvas.height)) {
      animationRef.current = requestAnimationFrame(drawLine)
    } else {
      isAnimating.current = false // Stop animation if all branches are off screen
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    resizeCanvas() // Initial resize

    const handleResize = () => {
      resizeCanvas()

      // Adjust initial branches position and speed based on new size
      branchesRef.current = [{
        x: canvas.width / 2,    // Horizontal center
        y: canvas.height * 0.01, // Starting near the top
        dx: 0,                  // No horizontal movement
        dy: 5 * (canvas.height / window.innerHeight), // Adjust vertical speed proportionally
        main_branch: true
      }]
      isAnimating.current = true
      drawLine()
    }

    window.addEventListener("resize", handleResize)
    isAnimating.current = true

    const startAnimation = setTimeout(() => {
      drawLine() // Start the animation after the specified delay
    }, delayBeforeStart)

    return () => {
      clearTimeout(startAnimation) // Clear the timeout if the component unmounts
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, []) // Removed dependencies since we don't want to recreate the effect for these functions

  return <canvas ref={canvasRef} style={{display: "block", zIndex: -1}} />
}

export default LineAnimation