"use client"
import { useEffect, useRef, useCallback } from "react"

// 리서치 히어로용 — AI 뉴런 네트워크 시각화
// 노드들이 연결선으로 이어지고, 데이터 펄스가 흐르는 효과

interface Node {
  x: number
  y: number
  baseX: number
  baseY: number
  radius: number
  color: string
  pulsePhase: number
  pulseSpeed: number
  // 마우스 반응
  vx: number
  vy: number
}

interface Edge {
  from: number
  to: number
  pulseOffset: number
  pulseSpeed: number
}

interface DataPulse {
  edgeIdx: number
  progress: number
  speed: number
  color: string
  size: number
}

// 에메랄드/틸/블루 계열
const NODE_COLORS = [
  "#10B981", // emerald
  "#06B6D4", // cyan
  "#3B82F6", // blue
  "#14B8A6", // teal
  "#6366F1", // indigo
  "#8B5CF6", // violet
]

const PULSE_COLORS = [
  "#34D399", // emerald-400
  "#22D3EE", // cyan-400
  "#60A5FA", // blue-400
  "#2DD4BF", // teal-400
]

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const edgesRef = useRef<Edge[]>([])
  const pulsesRef = useRef<DataPulse[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animRef = useRef(0)

  const initNetwork = useCallback((w: number, h: number) => {
    // 노드 생성 (화면 크기에 비례)
    const nodeCount = Math.min(Math.floor((w * h) / 15000), 40)
    const nodes: Node[] = []
    for (let i = 0; i < nodeCount; i++) {
      const x = 40 + Math.random() * (w - 80)
      const y = 30 + Math.random() * (h - 60)
      nodes.push({
        x, y, baseX: x, baseY: y,
        radius: 2 + Math.random() * 3,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        vx: 0, vy: 0,
      })
    }
    nodesRef.current = nodes

    // 엣지 생성 (근접 노드 연결)
    const edges: Edge[] = []
    const maxDist = Math.min(w, h) * 0.3
    for (let i = 0; i < nodes.length; i++) {
      // 각 노드에서 가장 가까운 2~3개와 연결
      const distances: { idx: number; dist: number }[] = []
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX
        const dy = nodes[i].baseY - nodes[j].baseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxDist) distances.push({ idx: j, dist })
      }
      distances.sort((a, b) => a.dist - b.dist)
      const connections = Math.min(distances.length, 2 + Math.floor(Math.random() * 2))
      for (let k = 0; k < connections; k++) {
        edges.push({
          from: i, to: distances[k].idx,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.015,
        })
      }
    }
    edgesRef.current = edges
    pulsesRef.current = []
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      initNetwork(rect.width, rect.height)
    }
    resize()

    const handleMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const handleLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    canvas.addEventListener("mousemove", handleMouse)
    canvas.addEventListener("mouseleave", handleLeave)

    let time = 0
    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)
      time++

      const nodes = nodesRef.current
      const edges = edgesRef.current
      const pulses = pulsesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // 노드 업데이트 (미세한 부유 + 마우스 반응)
      for (const node of nodes) {
        // 부유 운동
        node.x = node.baseX + Math.sin(time * 0.008 + node.pulsePhase) * 3
        node.y = node.baseY + Math.cos(time * 0.006 + node.pulsePhase * 1.3) * 2

        // 마우스 인력 (살짝 끌림)
        const dx = mx - node.x
        const dy = my - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150 && dist > 0) {
          const force = (1 - dist / 150) * 0.3
          node.x += dx * force * 0.02
          node.y += dy * force * 0.02
        }
      }

      // 엣지 그리기
      for (const edge of edges) {
        const a = nodes[edge.from]
        const b = nodes[edge.to]
        if (!a || !b) continue

        const edgeAlpha = 0.08 + Math.sin(time * edge.pulseSpeed + edge.pulseOffset) * 0.04
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(100, 200, 220, ${edgeAlpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // 데이터 펄스 생성 (간헐적)
      if (time % 15 === 0 && edges.length > 0) {
        const edgeIdx = Math.floor(Math.random() * edges.length)
        pulses.push({
          edgeIdx,
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
          color: PULSE_COLORS[Math.floor(Math.random() * PULSE_COLORS.length)],
          size: 2 + Math.random() * 2,
        })
      }

      // 데이터 펄스 그리기 + 업데이트
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i]
        const edge = edges[pulse.edgeIdx]
        if (!edge) { pulses.splice(i, 1); continue }
        const a = nodes[edge.from]
        const b = nodes[edge.to]
        if (!a || !b) { pulses.splice(i, 1); continue }

        const px = a.x + (b.x - a.x) * pulse.progress
        const py = a.y + (b.y - a.y) * pulse.progress

        // 글로우
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, pulse.size * 4)
        gradient.addColorStop(0, pulse.color + "60")
        gradient.addColorStop(1, pulse.color + "00")
        ctx.beginPath()
        ctx.arc(px, py, pulse.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // 코어
        ctx.beginPath()
        ctx.arc(px, py, pulse.size, 0, Math.PI * 2)
        ctx.fillStyle = pulse.color
        ctx.fill()

        pulse.progress += pulse.speed
        if (pulse.progress > 1) pulses.splice(i, 1)
      }

      // 노드 그리기
      for (const node of nodes) {
        const pulse = 1 + Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.3

        // 글로우
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4 * pulse
        )
        gradient.addColorStop(0, node.color + "40")
        gradient.addColorStop(1, node.color + "00")
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 4 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // 코어
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = node.color + "B0"
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(animRef.current)
      canvas.removeEventListener("mousemove", handleMouse)
      canvas.removeEventListener("mouseleave", handleLeave)
      window.removeEventListener("resize", resize)
    }
  }, [initNetwork])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  )
}
