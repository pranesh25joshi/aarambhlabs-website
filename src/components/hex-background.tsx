'use client'

import { useEffect, useRef, useState } from 'react'

interface HexBackgroundProps {
  onScoreUpdate: (score: number) => void;
}

export function HexBackground({ onScoreUpdate }: HexBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const hexSize = 30
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexagons: { 
      center: [number, number]; 
      lines: { 
        start: [number, number]; 
        end: [number, number]; 
        progress: number; 
        color: string;
        clicked: boolean;
      }[] 
    }[] = []
    const colors = [
      'rgba(238, 110, 115, 0.4)',
      'rgba(130, 170, 255, 0.4)',
      'rgba(145, 215, 145, 0.4)',
      'rgba(200, 200, 200, 0.4)'
    ]

    for (let y = -hexHeight; y < canvas.height + hexHeight; y += hexHeight * 0.75) {
      for (let x = -hexWidth; x < canvas.width + hexWidth; x += hexWidth * 0.75) {
        const centerX = x + (Math.floor(y / (hexHeight * 0.75)) % 2 ? hexWidth * 0.5 : 0)
        const centerY = y
        hexagons.push({ center: [centerX, centerY], lines: [] })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      hexagons.forEach(hexagon => {
        if (Math.random() < 0.1 && hexagon.lines.length < 6) {
          const angle = Math.floor(Math.random() * 6) * (Math.PI / 3)
          const startX = hexagon.center[0] + hexSize * Math.cos(angle)
          const startY = hexagon.center[1] + hexSize * Math.sin(angle)
          const endX = hexagon.center[0] + hexSize * Math.cos(angle + Math.PI / 3)
          const endY = hexagon.center[1] + hexSize * Math.sin(angle + Math.PI / 3)
          hexagon.lines.push({
            start: [startX, startY],
            end: [endX, endY],
            progress: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
            clicked: false
          })
        }

        hexagon.lines.forEach((line, index) => {
          ctx.beginPath()
          ctx.strokeStyle = line.clicked ? 'rgba(255, 255, 255, 0.8)' : line.color
          ctx.lineWidth = line.clicked ? 3 : 2
          ctx.lineCap = 'round'
          ctx.moveTo(line.start[0], line.start[1])
          const currentX = line.start[0] + (line.end[0] - line.start[0]) * line.progress
          const currentY = line.start[1] + (line.end[1] - line.start[1]) * line.progress
          ctx.lineTo(currentX, currentY)
          ctx.stroke()

          line.progress += 0.03
          if (line.progress >= 1) {
            hexagon.lines.splice(index, 1)
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      hexagons.forEach(hexagon => {
        hexagon.lines.forEach(line => {
          if (!line.clicked && line.progress > 0.5 && line.progress < 1) {
            const dx = line.end[0] - line.start[0]
            const dy = line.end[1] - line.start[1]
            const lineLength = Math.sqrt(dx * dx + dy * dy)
            const t = ((x - line.start[0]) * dx + (y - line.start[1]) * dy) / (lineLength * lineLength)
            const closestX = line.start[0] + t * dx
            const closestY = line.start[1] + t * dy
            const distance = Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2)

            if (distance < 10) {
              line.clicked = true
              setScore(prevScore => {
                const newScore = prevScore + 1
                onScoreUpdate(newScore)
                return newScore
              })
            }
          }
        })
      })
    }

    canvas.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('click', handleClick)
    }
  }, [onScoreUpdate])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full cursor-pointer" 
      style={{ transform: 'translate(4.23px, -0.99px) scale(1.06793)' }}
      aria-label="Hexagonal background game. Click on lines to score points."
    />
  )
}

