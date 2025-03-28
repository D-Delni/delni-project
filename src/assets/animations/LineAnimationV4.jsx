import { useEffect, useRef } from "react"

const LineAnimation = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const branchesRef = useRef([{ x: 0, y: 0, dx: 5, dy: 0 }])
  const isAnimating = useRef(false)
  const delayBeforeStart = 1000 // Delay in milliseconds before the first spread starts

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Adjust the initial position of branches to be in the center of the canvas
    branchesRef.current = [{
      x: canvas.width * 0.01,  // Starting from 10% of the width
      y: canvas.height / 2,   // Vertical center
      dx: 5,                  // Movement speed horizontally
      dy: 0                   // No initial vertical movement
    }]
  }

  const drawLine = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#DDA95A" // Line color: Yellow; Green 68ff68 -> #121212 fondo
    ctx.lineWidth = 3

    branchesRef.current.forEach((branch) => {
      ctx.beginPath()
      ctx.moveTo(branch.startX || 0, branch.startY || canvas.height / 2) // Start point
      ctx.lineTo(branch.x, branch.y)
      ctx.stroke()

      // Update the position of the branch
      branch.x += branch.dx // Move right
      branch.y += branch.dy // Move vertically

      if (branch.main_branch && Math.random(0, 1) > 0.925) {
        branch.dy = 0
        branch.dx = 0 // Stop the main branch
        branchesRef.current.push({
          startX: branch.x, // Start position of the new branch
          startY: branch.y,
          x: branch.x, // New branch starts at the current position
          y: branch.y,
          dx: 5, // Move right
          dy: 0, // Calculate dy based on the angle
          main_branch: false,
        })
      }

      // Random chance to create a new branch
      if (
        Math.random() > 0.95 && // Decreased probability
        branch.x > canvas.width / 3 && // Random chance to branch
        branch.x - (branch.startX || 10) > 600 && // Increased minimum distance
        branchesRef.current.length < 70 // Reduced maximum number of branches
      ) {
        // Randomly choose an angle between 30 and 60 degrees
        const angle = 45 // Angle in degrees
        const angleInRadians = (angle * Math.PI) / 180 // Convert to radians
        const spreadFactor = Math.tan(angleInRadians) // Calculate the vertical spread

        branchesRef.current.push({
          startX: branch.x, // Start position of the new branch
          startY: branch.y,
          x: branch.x, // New branch starts at the current position
          y: branch.y,
          dx: 5, // Move right
          dy: (Math.random() > 0.5 ? 1.5 : -1.5) * spreadFactor * branch.dx,
          main_branch: true,
          // Calculate dy based on the angle
        })
      }
    })

    // Continue animation if lines aren't off screen
    if (branchesRef.current.some((b) => b.x < canvas.width)) {
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
        x: canvas.width * 0.1,  // Adjust initial X position proportionally
        y: canvas.height / 2,   // Vertical center
        dx: 5 * (canvas.width / window.innerWidth), // Adjust horizontal speed proportionally
        dy: 0 // Vertical speed remains unchanged
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
  }, [drawLine, resizeCanvas]) // Added dependencies to useEffect

  return <canvas ref={canvasRef} style={{display: "block" ,zIndex: -1, }} />
}

export default LineAnimation
