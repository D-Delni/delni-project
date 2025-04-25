import { useEffect, useRef } from "react"

const LineAnimationPrototype = ({
  direction = "horizontal", // "horizontal" or "vertical"
  lineColor = "#DDA95A",
  lineWidth = 3,
  initialSpeed = 5,
  branchProbability = 0.95,
  maxBranches = 70,
  minDistanceBeforeBranch = 600,
  delayBeforeStart = 1000,
  spreadAngle = 45,
}) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const branchesRef = useRef([])
  const isAnimating = useRef(false)
  const hasStarted = useRef(false)
  const observerRef = useRef(null)

  const isHorizontal = direction === "horizontal"

  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize branches based on direction
    if (isHorizontal) {
      // Horizontal: start from left, move right
      branchesRef.current = [{
        x: canvas.width * 0.01,
        y: canvas.height / 2,
        dx: initialSpeed,
        dy: 0,
        startX: canvas.width * 0.01,
        startY: canvas.height / 2,
        //main_branch: true
      }]
    } else {
      // Vertical: start from top, move down
      branchesRef.current = [{
        x: canvas.width / 2,
        y: canvas.height * 0.01,
        dx: 0,
        dy: initialSpeed,
        startX: canvas.width / 2,
        startY: canvas.height * 0.01,
        //Esto se comenta porque si no aparecen como lineas dobles al inico
        //main_branch: true
      }]
    }
  }

  const startAnimation = () => {
    if (hasStarted.current) return
    
    hasStarted.current = true
    isAnimating.current = true
    
    // Use setTimeout to add the delay before starting
    setTimeout(() => {
      // Only start if we're still supposed to be animating
      if (isAnimating.current) {
        drawLine()
      }
    }, delayBeforeStart)
  }

  const stopAnimation = () => {
    isAnimating.current = false
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }

  const drawLine = () => {
    const canvas = canvasRef.current
    if (!canvas || !isAnimating.current) return
    
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth

    branchesRef.current.forEach((branch) => {
      ctx.beginPath()
      ctx.moveTo(branch.startX, branch.startY)
      ctx.lineTo(branch.x, branch.y)
      ctx.stroke()

      // Update branch position
      branch.x += branch.dx
      branch.y += branch.dy

      // Random chance to stop main branch
      if (branch.main_branch && Math.random() > 0.925) {
        branch.dx = 0
        branch.dy = 0
        
        // Create a continuing branch
        branchesRef.current.push({
          startX: branch.x,
          startY: branch.y,
          x: branch.x,
          y: branch.y,
          dx: isHorizontal ? initialSpeed : 0,
          dy: isHorizontal ? 0 : initialSpeed,
          main_branch: false,
        })
      }

      // Check if we should create a new branch
      const distanceTraveled = isHorizontal 
        ? branch.x - branch.startX 
        : branch.y - branch.startY
      
      const reachedMinDistance = distanceTraveled > minDistanceBeforeBranch
      const notTooManyBranches = branchesRef.current.length < maxBranches
      const passedFirstThird = isHorizontal 
        ? branch.x > canvas.width / 3 
        : branch.y > canvas.height / 3
      
      if (
        Math.random() > branchProbability && 
        passedFirstThird &&
        reachedMinDistance &&
        notTooManyBranches
      ) {
        const angleInRadians = (spreadAngle * Math.PI) / 180
        const spreadFactor = Math.tan(angleInRadians)
        const spreadDirection = Math.random() > 0.5 ? 1.5 : -1.5

        if (isHorizontal) {
          // In horizontal mode, branches spread vertically
          branchesRef.current.push({
            startX: branch.x,
            startY: branch.y,
            x: branch.x,
            y: branch.y,
            dx: initialSpeed,
            dy: spreadDirection * spreadFactor * initialSpeed,
            main_branch: true,
          })
        } else {
          // In vertical mode, branches spread horizontally
          branchesRef.current.push({
            startX: branch.x,
            startY: branch.y,
            x: branch.x,
            y: branch.y,
            dx: spreadDirection * spreadFactor * initialSpeed,
            dy: initialSpeed,
            main_branch: true,
          })
        }
      }
    })

    // Check if animation should continue
    const stillAnimating = isHorizontal
      ? branchesRef.current.some(b => b.x < canvas.width)
      : branchesRef.current.some(b => b.y < canvas.height)

    if (stillAnimating && isAnimating.current) {
      animationRef.current = requestAnimationFrame(drawLine)
    } else {
      isAnimating.current = false
    }
  }

  useEffect(() => {
    resizeCanvas()

    const handleResize = () => {
      resizeCanvas()
      
      // Only restart animation if it was already started and visible
      if (hasStarted.current && isAnimating.current) {
        drawLine()
      }
    }

    // Set up intersection observer to detect when canvas is visible
    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    }

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Canvas is visible, start animation
          startAnimation()
        } else {
          // Canvas is not visible, stop animation to save resources
          stopAnimation()
        }
      })
    }

    // Create and set up the observer
    observerRef.current = new IntersectionObserver(handleIntersection, options)
    
    // Start observing the canvas
    if (canvasRef.current) {
      observerRef.current.observe(canvasRef.current)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      // Clean up
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      stopAnimation()
      window.removeEventListener("resize", handleResize)
    }
  }, [direction]) // Re-initialize when direction changes

  return <canvas ref={canvasRef} style={{display: "block", zIndex: -1}} />
}

export default LineAnimationPrototype