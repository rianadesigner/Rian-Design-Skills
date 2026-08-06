"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js"
import { getRelatedNodeIds, KNOWLEDGE_NODES } from "./knowledge-graph-data"

type NodeVisual = {
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
  label: HTMLButtonElement
  dot: HTMLSpanElement
  delay: number
  gridIndex: number
}

type RelationPathVisual = {
  fromId: string
  toId: string
  gridPath: number[]
  line: SVGPolylineElement
  delay: number
}

type ScreenPoint = { x: number; y: number }
type ScreenBox = ScreenPoint & { width: number; height: number }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)
const GRID_LINE_OPACITY = 0.3
const pointKey = (point: THREE.Vector3) =>
  `${point.x.toFixed(4)},${point.y.toFixed(4)},${point.z.toFixed(4)}`

export default function KnowledgeGraphSphere({
  selectedId,
  onSelect,
  onOpen,
}: {
  selectedId: string
  onSelect: (id: string) => void
  onOpen: (id: string) => void
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const nodeVisualsRef = useRef(new Map<string, NodeVisual>())
  const selectedIdRef = useRef(selectedId)

  useEffect(() => {
    selectedIdRef.current = selectedId
  }, [selectedId])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50)
    camera.position.set(0, 0.08, 8.55)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0xffffff, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.inset = "0"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.cursor = "grab"
    renderer.domElement.style.zIndex = "1"
    host.appendChild(renderer.domElement)

    // Relationship paths live in the same authored slide coordinate system as
    // the DOM labels. This keeps the path endpoints locked to their labels even
    // when the whole 1440 x 900 slide is scaled by an outer CSS transform.
    const relationLayer = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    )
    relationLayer.setAttribute("aria-hidden", "true")
    relationLayer.setAttribute("preserveAspectRatio", "none")
    relationLayer.style.position = "absolute"
    relationLayer.style.inset = "0"
    relationLayer.style.width = "100%"
    relationLayer.style.height = "100%"
    relationLayer.style.overflow = "visible"
    relationLayer.style.pointerEvents = "none"
    relationLayer.style.zIndex = "2"
    host.appendChild(relationLayer)

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.domElement.style.position = "absolute"
    labelRenderer.domElement.style.inset = "0"
    labelRenderer.domElement.style.pointerEvents = "none"
    labelRenderer.domElement.style.zIndex = "3"
    host.appendChild(labelRenderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.065
    controls.enablePan = false
    controls.minDistance = 7.4
    controls.maxDistance = 11.5
    controls.rotateSpeed = 0.42
    controls.zoomSpeed = 0.58

    const graph = new THREE.Group()
    graph.rotation.set(-0.08, -0.12, 0.025)
    scene.add(graph)

    const latticeGeometry = new THREE.IcosahedronGeometry(2.63, 1)
    const latticePosition = latticeGeometry.getAttribute("position")
    const uniqueGridPoints = new Map<string, THREE.Vector3>()
    for (let index = 0; index < latticePosition.count; index += 1) {
      const point = new THREE.Vector3(
        latticePosition.getX(index),
        latticePosition.getY(index),
        latticePosition.getZ(index)
      )
      const key = pointKey(point)
      if (!uniqueGridPoints.has(key)) uniqueGridPoints.set(key, point)
    }

    const gridPoints = Array.from(uniqueGridPoints.values())
    const positionMap = new Map<string, THREE.Vector3>()
    const nodeGridIndexById = new Map<string, number>()
    KNOWLEDGE_NODES.forEach((node, index) => {
      nodeGridIndexById.set(node.id, index)
      positionMap.set(node.id, gridPoints[index].clone())
    })

    const gridGeometry = new THREE.WireframeGeometry(latticeGeometry)
    latticeGeometry.dispose()
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0xb0b6bf,
      transparent: true,
      opacity: reducedMotion ? GRID_LINE_OPACITY : 0,
      depthWrite: false,
      depthTest: false,
    })
    const sphereGrid = new THREE.LineSegments(gridGeometry, gridMaterial)
    graph.add(sphereGrid)

    const gridIndexByKey = new Map(
      gridPoints.map((point, index) => [pointKey(point), index])
    )
    const gridAdjacency = gridPoints.map(() => new Set<number>())
    const wirePositions = gridGeometry.getAttribute("position")
    for (let index = 0; index < wirePositions.count; index += 2) {
      const start = new THREE.Vector3(
        wirePositions.getX(index),
        wirePositions.getY(index),
        wirePositions.getZ(index)
      )
      const end = new THREE.Vector3(
        wirePositions.getX(index + 1),
        wirePositions.getY(index + 1),
        wirePositions.getZ(index + 1)
      )
      const startIndex = gridIndexByKey.get(pointKey(start))
      const endIndex = gridIndexByKey.get(pointKey(end))
      if (startIndex === undefined || endIndex === undefined) continue
      gridAdjacency[startIndex].add(endIndex)
      gridAdjacency[endIndex].add(startIndex)
    }

    const findGridPath = (startIndex: number, endIndex: number) => {
      const queue = [startIndex]
      const visited = new Set([startIndex])
      const previous = new Map<number, number>()
      while (queue.length) {
        const current = queue.shift()!
        if (current === endIndex) break
        gridAdjacency[current].forEach((next) => {
          if (visited.has(next)) return
          visited.add(next)
          previous.set(next, current)
          queue.push(next)
        })
      }
      if (!visited.has(endIndex)) return []
      const path = [endIndex]
      while (path[0] !== startIndex) path.unshift(previous.get(path[0])!)
      return path
    }

    let highlightedSelection = ""
    let highlightStartedAt = 0
    let relationPaths: RelationPathVisual[] = []
    const rebuildHighlightedGridPaths = (nodeId: string, elapsed: number) => {
      relationPaths.forEach(({ line }) => line.remove())
      relationPaths = []

      const startIndex = nodeGridIndexById.get(nodeId)
      if (startIndex === undefined) return

      Array.from(getRelatedNodeIds(nodeId)).forEach(
        (relatedId, relatedIndex) => {
          const endIndex = nodeGridIndexById.get(relatedId)
          if (endIndex === undefined) return
          const gridPath = findGridPath(startIndex, endIndex)
          if (gridPath.length < 2) return

          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline"
          )
          line.setAttribute("fill", "none")
          line.setAttribute("stroke", "#5C5CFF")
          line.setAttribute("stroke-width", "1.35")
          line.setAttribute("stroke-linecap", "round")
          line.setAttribute("stroke-linejoin", "round")
          line.setAttribute("pathLength", "1")
          line.setAttribute("stroke-dasharray", "1")
          line.setAttribute("stroke-dashoffset", reducedMotion ? "0" : "1")
          line.style.opacity = reducedMotion ? "0.8" : "0"
          relationLayer.appendChild(line)

          relationPaths.push({
            fromId: nodeId,
            toId: relatedId,
            gridPath,
            line,
            delay: relatedIndex * 0.045,
          })
        }
      )

      highlightStartedAt = elapsed
      highlightedSelection = nodeId
    }

    const nodeVisuals = new Map<string, NodeVisual>()
    const nodeMeshes: THREE.Mesh[] = []
    KNOWLEDGE_NODES.forEach((node, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 22, 18),
        material
      )
      mesh.position.copy(positionMap.get(node.id)!)
      mesh.userData.nodeId = node.id
      if (!reducedMotion) mesh.scale.setScalar(0)
      graph.add(mesh)
      nodeMeshes.push(mesh)

      const labelElement = document.createElement("button")
      labelElement.type = "button"
      labelElement.setAttribute("aria-label", `选择节点：${node.label}`)
      labelElement.title = "双击进入下一页"
      labelElement.dataset.nodeId = node.id
      labelElement.style.display = "inline-flex"
      labelElement.style.alignItems = "center"
      labelElement.style.justifyContent = "center"
      labelElement.style.gap = "4px"
      labelElement.style.padding = "4px 7px 4px 5px"
      labelElement.style.border = "1px solid rgba(218,222,228,0.86)"
      labelElement.style.borderRadius = "999px"
      labelElement.style.color = "#505761"
      labelElement.style.background = "rgba(255,255,255,0.9)"
      labelElement.style.boxShadow = "0 5px 14px rgba(24,29,37,0.055)"
      labelElement.style.font =
        "600 8.3px 'PingFang SC', 'Noto Sans SC', sans-serif"
      labelElement.style.letterSpacing = "0.01em"
      labelElement.style.whiteSpace = "nowrap"
      labelElement.style.cursor = "pointer"
      labelElement.style.pointerEvents = "auto"
      labelElement.style.outline = "none"
      labelElement.style.opacity = "0"
      labelElement.style.transformOrigin = "center"
      labelElement.style.transform = "scale(1)"
      labelElement.style.transition =
        "color 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 190ms cubic-bezier(0.2, 0.8, 0.2, 1)"

      const labelDot = document.createElement("span")
      labelDot.setAttribute("aria-hidden", "true")
      labelDot.style.width = "4px"
      labelDot.style.height = "4px"
      labelDot.style.borderRadius = "50%"
      labelDot.style.background = "#1f2227"
      labelDot.style.boxShadow = "0 0 0 2px rgba(31,34,39,0.05)"
      labelDot.style.flex = "0 0 auto"
      labelDot.style.transition = "background 160ms ease, box-shadow 160ms ease"
      labelElement.append(labelDot)

      const labelText = document.createElement("span")
      labelText.textContent = node.label
      labelElement.append(labelText)

      labelElement.addEventListener("pointerdown", (event) => {
        event.stopPropagation()
      })
      labelElement.addEventListener("click", (event) => {
        event.stopPropagation()
        onSelect(node.id)
      })
      labelElement.addEventListener("dblclick", (event) => {
        event.preventDefault()
        event.stopPropagation()
        onOpen(node.id)
      })

      // CSS2DRenderer owns the anchor's transform for screen positioning. The
      // visual button is nested inside it so enlarging an active label never
      // scales the renderer's translate() and drifts the label off its vertex.
      const labelAnchor = document.createElement("div")
      labelAnchor.style.pointerEvents = "none"
      labelAnchor.append(labelElement)
      const label = new CSS2DObject(labelAnchor)
      label.position.set(0, 0, 0)
      mesh.add(label)

      nodeVisuals.set(node.id, {
        mesh,
        label: labelElement,
        dot: labelDot,
        delay: 0.18 + index * 0.022,
        gridIndex: index,
      })
    })
    nodeVisualsRef.current = nodeVisuals

    const raycaster = new THREE.Raycaster()
    raycaster.params.Points = { threshold: 0.2 }
    const pointer = new THREE.Vector2()
    let pointerDown = { x: 0, y: 0 }

    const updatePointer = (event: { clientX: number; clientY: number }) => {
      const bounds = renderer.domElement.getBoundingClientRect()
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
    }
    const onPointerDown = (event: PointerEvent) => {
      pointerDown = { x: event.clientX, y: event.clientY }
      renderer.domElement.style.cursor = "grabbing"
    }
    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event)
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(nodeMeshes, false)[0]
      if (renderer.domElement.style.cursor !== "grabbing")
        renderer.domElement.style.cursor = hit ? "pointer" : "grab"
    }
    const onPointerUp = (event: PointerEvent) => {
      renderer.domElement.style.cursor = "grab"
      if (
        Math.hypot(
          event.clientX - pointerDown.x,
          event.clientY - pointerDown.y
        ) > 5
      )
        return
      updatePointer(event)
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(nodeMeshes, false)[0]
      const nodeId = hit?.object.userData.nodeId as string | undefined
      if (nodeId) onSelect(nodeId)
    }
    const onDoubleClick = (event: MouseEvent) => {
      updatePointer(event)
      raycaster.setFromCamera(pointer, camera)
      const hit = raycaster.intersectObjects(nodeMeshes, false)[0]
      const nodeId = hit?.object.userData.nodeId as string | undefined
      if (nodeId) onOpen(nodeId)
    }
    renderer.domElement.addEventListener("pointerdown", onPointerDown)
    renderer.domElement.addEventListener("pointermove", onPointerMove)
    renderer.domElement.addEventListener("pointerup", onPointerUp)
    renderer.domElement.addEventListener("dblclick", onDoubleClick)

    const resize = () => {
      // The slide is uniformly scaled by its viewport wrapper. Using
      // getBoundingClientRect() here returns the post-transform size and makes
      // the CSS2D labels drift away from the WebGL lattice. clientWidth /
      // clientHeight keep both renderers in the same authored-canvas space.
      const width = host.clientWidth
      const height = host.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      labelRenderer.setSize(width, height)
      relationLayer.setAttribute("viewBox", `0 0 ${width} ${height}`)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    const clock = new THREE.Clock()
    const worldPosition = new THREE.Vector3()
    const surfaceNormal = new THREE.Vector3()
    const cameraDirection = new THREE.Vector3()
    const projectedPoint = new THREE.Vector3()
    const selectedDirection = new THREE.Vector3()
    const focusFromQuaternion = new THREE.Quaternion()
    const focusTargetQuaternion = new THREE.Quaternion()
    const focusQuaternion = new THREE.Quaternion()
    const rollQuaternion = new THREE.Quaternion()
    let focusedSelection = selectedIdRef.current
    let focusStartedAt = Number.NEGATIVE_INFINITY
    let animationFrame = 0

    const updateFocusTarget = (nodeId: string) => {
      const position = positionMap.get(nodeId)
      if (!position) return
      selectedDirection.copy(position).normalize()
      cameraDirection.copy(camera.position).sub(controls.target).normalize()
      focusTargetQuaternion.setFromUnitVectors(
        selectedDirection,
        cameraDirection
      )
    }

    // Start with the default node facing the camera so its label is centered
    // from the first visible frame rather than drifting in from the sphere edge.
    controls.update()
    updateFocusTarget(focusedSelection)
    focusFromQuaternion.copy(focusTargetQuaternion)
    focusQuaternion.copy(focusTargetQuaternion)
    graph.quaternion.copy(focusTargetQuaternion)

    const projectGridPoint = (
      gridIndex: number,
      width: number,
      height: number
    ): ScreenPoint => {
      projectedPoint
        .copy(gridPoints[gridIndex])
        .applyMatrix4(graph.matrixWorld)
        .project(camera)
      return {
        x: (projectedPoint.x * 0.5 + 0.5) * width,
        y: (-projectedPoint.y * 0.5 + 0.5) * height,
      }
    }

    const clipToLabelEdge = (
      labelBox: ScreenBox,
      toward: ScreenPoint
    ): ScreenPoint => {
      const deltaX = toward.x - labelBox.x
      const deltaY = toward.y - labelBox.y
      const halfWidth = Math.max(1, labelBox.width / 2 + 1)
      const halfHeight = Math.max(1, labelBox.height / 2 + 1)
      const denominator = Math.max(
        Math.abs(deltaX) / halfWidth,
        Math.abs(deltaY) / halfHeight
      )
      if (denominator <= 1) return { x: labelBox.x, y: labelBox.y }
      const ratio = 1 / denominator
      return {
        x: labelBox.x + deltaX * ratio,
        y: labelBox.y + deltaY * ratio,
      }
    }

    const updateRelationPathGeometry = (elapsed: number) => {
      const width = host.clientWidth
      const height = host.clientHeight
      const hostBounds = host.getBoundingClientRect()
      if (!width || !height || !hostBounds.width || !hostBounds.height) return

      const authoredScaleX = width / hostBounds.width
      const authoredScaleY = height / hostBounds.height
      const labelBoxes = new Map<string, ScreenBox>()
      const getLabelBox = (nodeId: string) => {
        const existing = labelBoxes.get(nodeId)
        if (existing) return existing
        const label = nodeVisuals.get(nodeId)?.label
        if (!label) return undefined
        const bounds = label.getBoundingClientRect()
        const box = {
          x:
            (bounds.left + bounds.width / 2 - hostBounds.left) * authoredScaleX,
          y: (bounds.top + bounds.height / 2 - hostBounds.top) * authoredScaleY,
          width: bounds.width * authoredScaleX,
          height: bounds.height * authoredScaleY,
        }
        labelBoxes.set(nodeId, box)
        return box
      }

      relationPaths.forEach(({ fromId, toId, gridPath, line, delay }) => {
        const points = gridPath.map((gridIndex) =>
          projectGridPoint(gridIndex, width, height)
        )
        const fromBox = getLabelBox(fromId)
        const toBox = getLabelBox(toId)
        if (fromBox && points.length > 1)
          points[0] = clipToLabelEdge(fromBox, points[1])
        if (toBox && points.length > 1)
          points[points.length - 1] = clipToLabelEdge(
            toBox,
            points[points.length - 2]
          )

        line.setAttribute(
          "points",
          points.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ")
        )
        const progress = reducedMotion
          ? 1
          : easeOutCubic(clamp01((elapsed - highlightStartedAt - delay) / 0.58))
        line.setAttribute("stroke-dashoffset", String(1 - progress))
        line.style.opacity = String(0.82 * progress)
      })
    }

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const globeProgress = reducedMotion
        ? 1
        : easeOutCubic(clamp01(elapsed / 0.78))
      gridMaterial.opacity = GRID_LINE_OPACITY * globeProgress

      if (highlightedSelection !== selectedIdRef.current)
        rebuildHighlightedGridPaths(selectedIdRef.current, elapsed)

      controls.update()
      cameraDirection.copy(camera.position).sub(controls.target).normalize()

      if (focusedSelection !== selectedIdRef.current) {
        focusFromQuaternion.copy(graph.quaternion)
        updateFocusTarget(selectedIdRef.current)
        focusStartedAt = elapsed
        focusedSelection = selectedIdRef.current
      }

      const focusProgress = reducedMotion
        ? 1
        : easeOutCubic(clamp01((elapsed - focusStartedAt) / 0.58))
      focusQuaternion.slerpQuaternions(
        focusFromQuaternion,
        focusTargetQuaternion,
        focusProgress
      )

      // A tiny roll keeps the globe alive without pulling the selected node
      // away from the camera axis (and therefore away from the canvas center).
      const roll = reducedMotion ? 0 : Math.sin(elapsed * 0.31) * 0.006
      rollQuaternion.setFromAxisAngle(cameraDirection, roll)
      graph.quaternion.copy(rollQuaternion).multiply(focusQuaternion)
      const globeScale = reducedMotion
        ? 1
        : 1 + Math.sin(elapsed * 0.54) * 0.006
      graph.scale.setScalar(globeScale)

      graph.updateMatrixWorld(true)

      const relatedIds = getRelatedNodeIds(selectedIdRef.current)
      nodeVisuals.forEach(({ mesh, label, delay }, nodeId) => {
        const entrance = reducedMotion
          ? 1
          : easeOutCubic(clamp01((elapsed - delay) / 0.42))
        const active = nodeId === selectedIdRef.current
        const related = relatedIds.has(nodeId)
        mesh.scale.setScalar(entrance * (active ? 1.22 : related ? 1.08 : 1))
        mesh.getWorldPosition(worldPosition)
        const facing = surfaceNormal
          .copy(worldPosition)
          .normalize()
          .dot(cameraDirection)
        const depthVisibility = clamp01((facing + 0.5) / 1.25)
        const depthAdjusted = active
          ? Math.max(0.78, depthVisibility)
          : related
            ? Math.max(0.68, depthVisibility)
            : 0.07 + depthVisibility * 0.93
        const stateOpacity = active ? 1 : related ? 0.96 : 0.34
        label.style.opacity = String(entrance * stateOpacity * depthAdjusted)
        label.style.pointerEvents =
          active || related || depthVisibility > 0.22 ? "auto" : "none"
      })

      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
      updateRelationPathGeometry(elapsed)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      renderer.domElement.removeEventListener("pointerdown", onPointerDown)
      renderer.domElement.removeEventListener("pointermove", onPointerMove)
      renderer.domElement.removeEventListener("pointerup", onPointerUp)
      renderer.domElement.removeEventListener("dblclick", onDoubleClick)
      controls.dispose()
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.LineSegments
        ) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
      relationLayer.remove()
      labelRenderer.domElement.remove()
      nodeVisualsRef.current.clear()
    }
  }, [onOpen, onSelect])

  useEffect(() => {
    const relatedIds = getRelatedNodeIds(selectedId)

    nodeVisualsRef.current.forEach(({ mesh, label, dot }, nodeId) => {
      const active = nodeId === selectedId
      const related = relatedIds.has(nodeId)
      mesh.scale.setScalar(active ? 1.22 : related ? 1.08 : 1)
      label.style.color = active ? "#ffffff" : related ? "#4646bd" : "#69717c"
      label.style.background = active
        ? "#5c5cff"
        : related
          ? "rgba(244,244,255,0.96)"
          : "rgba(255,255,255,0.84)"
      label.style.borderColor = active
        ? "#5c5cff"
        : related
          ? "rgba(92,92,255,0.34)"
          : "rgba(218,222,228,0.52)"
      label.style.boxShadow = active
        ? "0 8px 22px rgba(92,92,255,0.26)"
        : related
          ? "0 6px 16px rgba(92,92,255,0.11)"
          : "0 5px 14px rgba(24,29,37,0.055)"
      label.style.transform = active
        ? "scale(1.3)"
        : related
          ? "scale(1.14)"
          : "scale(1)"
      dot.style.background = active
        ? "#ffffff"
        : related
          ? "#5c5cff"
          : "#24282e"
      dot.style.boxShadow = active
        ? "0 0 0 2px rgba(255,255,255,0.18)"
        : related
          ? "0 0 0 2px rgba(92,92,255,0.1)"
          : "0 0 0 2px rgba(31,34,39,0.05)"
    })
  }, [selectedId])

  return <div ref={hostRef} className="absolute inset-0 overflow-hidden" />
}
