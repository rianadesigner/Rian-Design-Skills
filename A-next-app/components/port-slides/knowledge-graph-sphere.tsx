"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer.js"
import {
  getRelatedNodeIds,
  KNOWLEDGE_EDGES,
  KNOWLEDGE_NODES,
} from "./knowledge-graph-data"

type NodeVisual = {
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>
  label: HTMLButtonElement
  dot: HTMLSpanElement
  delay: number
  degreeScale: number
  gridIndex: number
}

type RelationPathVisual = {
  fromId: string
  toId: string
  gridPath: number[]
  halo?: SVGPolylineElement
  line: SVGPolylineElement
  flow?: SVGPolylineElement
  delay: number
}

type ScreenPoint = { x: number; y: number }
type ScreenBox = ScreenPoint & { width: number; height: number }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)
const GRID_LINE_OPACITY = 0.54
const pointKey = (point: THREE.Vector3) =>
  `${point.x.toFixed(4)},${point.y.toFixed(4)},${point.z.toFixed(4)}`

export default function KnowledgeGraphSphere({
  selectedId,
  onSelect,
  onOpen,
  interactionMode = "select",
  lineIntensity = 1,
  ambientIntensity = 1,
  detailLevel = "standard",
  filterToRelated = false,
  clearSelectionOnBackground = false,
}: {
  selectedId: string
  onSelect?: (id: string) => void
  onOpen?: (id: string) => void
  interactionMode?: "select" | "scroll"
  lineIntensity?: number
  ambientIntensity?: number
  detailLevel?: "standard" | "rich"
  filterToRelated?: boolean
  clearSelectionOnBackground?: boolean
}) {
  const scrollOnly = interactionMode === "scroll"
  const richDetail = detailLevel === "rich"
  const resolvedLineIntensity = THREE.MathUtils.clamp(lineIntensity, 0, 1)
  const resolvedAmbientIntensity = THREE.MathUtils.clamp(ambientIntensity, 0, 1)
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
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches
    const isIPad =
      navigator.maxTouchPoints > 1 &&
      /Macintosh|iPad/i.test(navigator.userAgent)
    const constrainedDevice = coarsePointer || isIPad
    const targetFrameInterval = constrainedDevice ? 1000 / 30 : 1000 / 60
    const gridLineOpacity = Math.min(
      0.68,
      GRID_LINE_OPACITY *
        resolvedLineIntensity *
        resolvedAmbientIntensity *
        (richDetail ? 1.08 : 1)
    )
    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50)
    camera.position.set(0, 0.08, 8.18)

    const renderer = new THREE.WebGLRenderer({
      antialias: !constrainedDevice,
      alpha: true,
      powerPreference: constrainedDevice ? "low-power" : "high-performance",
    })
    renderer.setClearColor(0xffffff, 0)
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, constrainedDevice ? 1 : 1.5)
    )
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.inset = "0"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.cursor = scrollOnly ? "ns-resize" : "grab"
    renderer.domElement.style.userSelect = "none"
    renderer.domElement.style.touchAction = scrollOnly ? "pan-y" : "none"
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
    controls.enabled = !scrollOnly

    const graph = new THREE.Group()
    graph.rotation.set(-0.08, -0.12, 0.025)
    const defaultGraphQuaternion = graph.quaternion.clone()
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
    const nodeDegreeById = new Map(KNOWLEDGE_NODES.map((node) => [node.id, 0]))
    KNOWLEDGE_EDGES.forEach(([fromId, toId]) => {
      nodeDegreeById.set(fromId, (nodeDegreeById.get(fromId) ?? 0) + 1)
      nodeDegreeById.set(toId, (nodeDegreeById.get(toId) ?? 0) + 1)
    })

    const gridGeometry = new THREE.WireframeGeometry(latticeGeometry)
    latticeGeometry.dispose()
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x858d99,
      transparent: true,
      opacity: reducedMotion ? gridLineOpacity : 0,
      depthWrite: false,
      depthTest: false,
    })
    const sphereGrid = new THREE.LineSegments(gridGeometry, gridMaterial)
    graph.add(sphereGrid)

    // Rich compiler views add a quiet semantic chord layer. Unlike the
    // icosahedron lattice, these lines represent the authored knowledge edges,
    // which gives the globe more internal structure without competing with the
    // selected purple routes drawn above in SVG.
    let semanticEdgeMaterial: THREE.LineBasicMaterial | null = null
    if (richDetail) {
      const semanticPositions: number[] = []
      KNOWLEDGE_EDGES.forEach(([fromId, toId]) => {
        const from = positionMap.get(fromId)
        const to = positionMap.get(toId)
        if (!from || !to) return
        semanticPositions.push(from.x, from.y, from.z, to.x, to.y, to.z)
      })
      const semanticGeometry = new THREE.BufferGeometry()
      semanticGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(semanticPositions, 3)
      )
      semanticEdgeMaterial = new THREE.LineBasicMaterial({
        color: 0x8d93be,
        transparent: true,
        opacity: reducedMotion ? 0.15 * resolvedAmbientIntensity : 0,
        depthWrite: false,
        depthTest: false,
      })
      const semanticEdges = new THREE.LineSegments(
        semanticGeometry,
        semanticEdgeMaterial
      )
      graph.add(semanticEdges)
    }

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
      relationPaths.forEach(({ halo, line, flow }) => {
        halo?.remove()
        line.remove()
        flow?.remove()
      })
      relationPaths = []
      highlightedSelection = nodeId

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
          line.setAttribute("stroke-width", richDetail ? "1.55" : "1.35")
          line.setAttribute("stroke-linecap", "round")
          line.setAttribute("stroke-linejoin", "round")
          line.setAttribute("pathLength", "1")
          line.setAttribute("stroke-dasharray", "1")
          line.setAttribute("stroke-dashoffset", reducedMotion ? "0" : "1")
          line.style.opacity = reducedMotion
            ? String(0.82 * resolvedLineIntensity)
            : "0"

          let halo: SVGPolylineElement | undefined
          let flow: SVGPolylineElement | undefined
          if (richDetail) {
            halo = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "polyline"
            )
            halo.setAttribute("fill", "none")
            halo.setAttribute("stroke", "#7777ff")
            halo.setAttribute("stroke-width", "6")
            halo.setAttribute("stroke-linecap", "round")
            halo.setAttribute("stroke-linejoin", "round")
            halo.setAttribute("pathLength", "1")
            halo.setAttribute("stroke-dasharray", "1")
            halo.setAttribute("stroke-dashoffset", reducedMotion ? "0" : "1")
            halo.style.filter = "blur(3px)"
            halo.style.opacity = reducedMotion
              ? String(0.12 * resolvedLineIntensity)
              : "0"
            relationLayer.appendChild(halo)
          }
          relationLayer.appendChild(line)

          if (richDetail) {
            flow = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "polyline"
            )
            flow.setAttribute("fill", "none")
            flow.setAttribute("stroke", "#ffffff")
            flow.setAttribute("stroke-width", "0.72")
            flow.setAttribute("stroke-linecap", "round")
            flow.setAttribute("stroke-linejoin", "round")
            flow.setAttribute("pathLength", "1")
            flow.setAttribute("stroke-dasharray", "0.022 0.078")
            flow.style.opacity = reducedMotion
              ? String(0.54 * resolvedLineIntensity)
              : "0"
            relationLayer.appendChild(flow)
          }

          relationPaths.push({
            fromId: nodeId,
            toId: relatedId,
            gridPath,
            halo,
            line,
            flow,
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
        color: richDetail ? 0x737b91 : 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
      })
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
          0.075,
          constrainedDevice ? 12 : 18,
          constrainedDevice ? 8 : 14
        ),
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
      labelElement.style.gap = richDetail ? "4.5px" : "4px"
      labelElement.style.padding = richDetail
        ? "4.5px 8px 4.5px 5.5px"
        : "4px 7px 4px 5px"
      labelElement.style.border = "1px solid rgba(218,222,228,0.86)"
      labelElement.style.borderRadius = "999px"
      labelElement.style.color = "#505761"
      labelElement.style.background = "rgba(255,255,255,0.9)"
      labelElement.style.boxShadow = "0 5px 14px rgba(24,29,37,0.055)"
      labelElement.style.font = `600 ${richDetail ? 9 : 8.3}px 'PingFang SC', 'Noto Sans SC', sans-serif`
      labelElement.style.letterSpacing = "0.01em"
      labelElement.style.whiteSpace = "nowrap"
      labelElement.style.cursor = scrollOnly ? "default" : "pointer"
      labelElement.style.pointerEvents = scrollOnly ? "none" : "auto"
      labelElement.style.userSelect = "none"
      labelElement.style.outline = "none"
      labelElement.style.opacity = "0"
      labelElement.style.transformOrigin = "center"
      labelElement.style.transform = "scale(1)"
      labelElement.style.transition =
        "color 160ms ease, background 160ms ease, border-color 160ms ease, box-shadow 160ms ease, transform 190ms cubic-bezier(0.2, 0.8, 0.2, 1)"

      const labelDot = document.createElement("span")
      labelDot.setAttribute("aria-hidden", "true")
      labelDot.style.width = richDetail ? "5px" : "4px"
      labelDot.style.height = richDetail ? "5px" : "4px"
      labelDot.style.borderRadius = "50%"
      labelDot.style.background = "#1f2227"
      labelDot.style.boxShadow = "0 0 0 2px rgba(31,34,39,0.05)"
      labelDot.style.flex = "0 0 auto"
      labelDot.style.transition = "background 160ms ease, box-shadow 160ms ease"
      labelElement.append(labelDot)

      const labelText = document.createElement("span")
      labelText.textContent = node.label
      labelElement.append(labelText)

      if (scrollOnly) {
        labelElement.tabIndex = -1
        labelElement.setAttribute("aria-hidden", "true")
        labelElement.removeAttribute("title")
      } else {
        labelElement.addEventListener("pointerdown", (event) => {
          event.stopPropagation()
        })
        labelElement.addEventListener("click", (event) => {
          event.stopPropagation()
          onSelect?.(node.id)
        })
        labelElement.addEventListener("dblclick", (event) => {
          event.preventDefault()
          event.stopPropagation()
          onOpen?.(node.id)
        })
      }

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
        degreeScale:
          0.84 + Math.min(1, (nodeDegreeById.get(node.id) ?? 0) / 8) * 0.34,
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
    const getVisibleHit = () => {
      const currentId = selectedIdRef.current
      const relatedIds =
        filterToRelated && currentId ? getRelatedNodeIds(currentId) : null

      return raycaster
        .intersectObjects(nodeMeshes, false)
        .find(({ object }) => {
          const nodeId = object.userData.nodeId as string | undefined
          return Boolean(
            nodeId &&
            (!filterToRelated ||
              !currentId ||
              nodeId === currentId ||
              relatedIds?.has(nodeId))
          )
        })
    }
    const onPointerDown = (event: PointerEvent) => {
      pointerDown = { x: event.clientX, y: event.clientY }
      renderer.domElement.style.cursor = "grabbing"
    }
    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event)
      raycaster.setFromCamera(pointer, camera)
      const hit = getVisibleHit()
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
      const hit = getVisibleHit()
      const nodeId = hit?.object.userData.nodeId as string | undefined
      if (nodeId) onSelect?.(nodeId)
      else if (clearSelectionOnBackground) onSelect?.("")
    }
    const onDoubleClick = (event: MouseEvent) => {
      updatePointer(event)
      raycaster.setFromCamera(pointer, camera)
      const hit = getVisibleHit()
      const nodeId = hit?.object.userData.nodeId as string | undefined
      if (nodeId) onOpen?.(nodeId)
    }
    let scrollRotationTargetX = 0
    let scrollRotationTargetY = 0
    let scrollRotationX = 0
    let scrollRotationY = 0
    const onWheelRotate = (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()
      scrollRotationTargetY += event.deltaY * 0.0015
      scrollRotationTargetX = THREE.MathUtils.clamp(
        scrollRotationTargetX + event.deltaX * 0.001,
        -0.42,
        0.42
      )
    }
    const blockPointerInteraction = (event: PointerEvent) => {
      event.stopPropagation()
    }

    if (scrollOnly) {
      renderer.domElement.addEventListener("wheel", onWheelRotate, {
        passive: false,
      })
      renderer.domElement.addEventListener(
        "pointerdown",
        blockPointerInteraction
      )
    } else {
      renderer.domElement.addEventListener("pointerdown", onPointerDown)
      renderer.domElement.addEventListener("pointermove", onPointerMove)
      renderer.domElement.addEventListener("pointerup", onPointerUp)
      renderer.domElement.addEventListener("dblclick", onDoubleClick)
    }

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

    let isInViewport = true
    let isDocumentVisible = !document.hidden
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting
      },
      { rootMargin: "120px", threshold: 0.01 }
    )
    intersectionObserver.observe(host)
    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

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
    const scrollQuaternion = new THREE.Quaternion()
    const scrollEuler = new THREE.Euler(0, 0, 0, "YXZ")
    let focusedSelection = selectedIdRef.current
    let focusStartedAt = Number.NEGATIVE_INFINITY
    let animationFrame = 0

    const updateFocusTarget = (nodeId: string) => {
      const position = positionMap.get(nodeId)
      if (!position) {
        focusTargetQuaternion.copy(defaultGraphQuaternion)
        return
      }
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
    if (focusedSelection) updateFocusTarget(focusedSelection)
    else focusTargetQuaternion.copy(graph.quaternion)
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
      if (relationPaths.length === 0) return
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

      relationPaths.forEach(
        ({ fromId, toId, gridPath, halo, line, flow, delay }) => {
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

          const pointString = points
            .map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`)
            .join(" ")
          halo?.setAttribute("points", pointString)
          line.setAttribute("points", pointString)
          flow?.setAttribute("points", pointString)
          const progress = reducedMotion
            ? 1
            : easeOutCubic(
                clamp01((elapsed - highlightStartedAt - delay) / 0.58)
              )
          halo?.setAttribute("stroke-dashoffset", String(1 - progress))
          line.setAttribute("stroke-dashoffset", String(1 - progress))
          if (flow) {
            flow.setAttribute(
              "stroke-dashoffset",
              reducedMotion ? "0" : String(-((elapsed - delay) * 0.16) % 1)
            )
            flow.style.opacity = String(0.54 * resolvedLineIntensity * progress)
          }
          if (halo)
            halo.style.opacity = String(0.12 * resolvedLineIntensity * progress)
          line.style.opacity = String(
            (richDetail ? 0.9 : 0.82) * resolvedLineIntensity * progress
          )
        }
      )
    }

    let lastFrameAt = Number.NEGATIVE_INFINITY
    const animate = (frameTime = performance.now()) => {
      animationFrame = requestAnimationFrame(animate)
      if (!isInViewport || !isDocumentVisible) return
      if (frameTime - lastFrameAt < targetFrameInterval) return
      lastFrameAt = frameTime

      const elapsed = clock.getElapsedTime()
      const globeProgress = reducedMotion
        ? 1
        : easeOutCubic(clamp01(elapsed / 0.78))
      gridMaterial.opacity = gridLineOpacity * globeProgress
      if (semanticEdgeMaterial)
        semanticEdgeMaterial.opacity =
          (filterToRelated && selectedIdRef.current ? 0 : 0.15) *
          resolvedAmbientIntensity *
          globeProgress

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
      if (scrollOnly) {
        scrollRotationX = THREE.MathUtils.lerp(
          scrollRotationX,
          scrollRotationTargetX,
          0.08
        )
        scrollRotationY = THREE.MathUtils.lerp(
          scrollRotationY,
          scrollRotationTargetY,
          0.08
        )
        // Slow ambient spin is always active; wheel input accumulates on top.
        scrollEuler.set(
          scrollRotationX + Math.sin(elapsed * 0.22) * 0.055,
          scrollRotationY + elapsed * 0.068,
          Math.sin(elapsed * 0.17) * 0.012
        )
        scrollQuaternion.setFromEuler(scrollEuler)
        graph.quaternion
          .copy(scrollQuaternion)
          .multiply(rollQuaternion)
          .multiply(focusQuaternion)
      } else {
        graph.quaternion.copy(rollQuaternion).multiply(focusQuaternion)
      }
      const globeScale = reducedMotion
        ? 1
        : 1 + Math.sin(elapsed * 0.54) * 0.006
      graph.scale.setScalar(globeScale)

      graph.updateMatrixWorld(true)

      const hasSelection = Boolean(selectedIdRef.current)
      const relatedIds = getRelatedNodeIds(selectedIdRef.current)
      nodeVisuals.forEach(({ mesh, label, delay, degreeScale }, nodeId) => {
        const entrance = reducedMotion
          ? 1
          : easeOutCubic(clamp01((elapsed - delay) / 0.42))
        const active = nodeId === selectedIdRef.current
        const related = relatedIds.has(nodeId)
        const visible = !filterToRelated || !hasSelection || active || related
        mesh.scale.setScalar(
          entrance *
            (active ? 1.22 : related ? 1.08 : 1) *
            (richDetail ? degreeScale : 1)
        )
        mesh.getWorldPosition(worldPosition)
        const facing = surfaceNormal
          .copy(worldPosition)
          .normalize()
          .dot(cameraDirection)
        const depthVisibility = clamp01((facing + 0.5) / 1.25)
        const depthAdjusted = !hasSelection
          ? 0.16 + depthVisibility * 0.84
          : active
            ? Math.max(0.78, depthVisibility)
            : related
              ? Math.max(0.68, depthVisibility)
              : richDetail
                ? 0.18 + depthVisibility * 0.82
                : 0.07 + depthVisibility * 0.93
        const stateOpacity = !visible
          ? 0
          : !hasSelection
            ? 0.88 * resolvedAmbientIntensity
            : active
              ? 1
              : related
                ? 0.96
                : (richDetail ? 0.54 : 0.34) * resolvedAmbientIntensity
        label.style.visibility = visible ? "visible" : "hidden"
        label.style.opacity = String(entrance * stateOpacity * depthAdjusted)
        mesh.material.opacity = richDetail
          ? entrance *
            depthAdjusted *
            (!visible
              ? 0
              : active
                ? 0.92
                : related
                  ? 0.68
                  : 0.22 * resolvedAmbientIntensity)
          : 0
        if (!hasSelection)
          label.style.transform = `scale(${0.88 + depthVisibility * 0.18})`
        label.style.pointerEvents =
          scrollOnly || !visible
            ? "none"
            : active || related || depthVisibility > 0.22
              ? "auto"
              : "none"
      })

      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
      updateRelationPathGeometry(elapsed)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (scrollOnly) {
        renderer.domElement.removeEventListener("wheel", onWheelRotate)
        renderer.domElement.removeEventListener(
          "pointerdown",
          blockPointerInteraction
        )
      } else {
        renderer.domElement.removeEventListener("pointerdown", onPointerDown)
        renderer.domElement.removeEventListener("pointermove", onPointerMove)
        renderer.domElement.removeEventListener("pointerup", onPointerUp)
        renderer.domElement.removeEventListener("dblclick", onDoubleClick)
      }
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
  }, [
    clearSelectionOnBackground,
    filterToRelated,
    interactionMode,
    onOpen,
    onSelect,
    resolvedAmbientIntensity,
    resolvedLineIntensity,
    richDetail,
    scrollOnly,
  ])

  useEffect(() => {
    const relatedIds = getRelatedNodeIds(selectedId)
    const ambient = !selectedId

    nodeVisualsRef.current.forEach(({ mesh, label, dot }, nodeId) => {
      const active = nodeId === selectedId
      const related = relatedIds.has(nodeId)
      mesh.scale.setScalar(active ? 1.22 : related ? 1.08 : 1)
      if (richDetail)
        mesh.material.color.setHex(
          active ? 0xffffff : related ? 0x5c5cff : 0x737b91
        )
      label.style.color = ambient
        ? "#555d68"
        : active
          ? "#ffffff"
          : related
            ? "#4646bd"
            : "#69717c"
      label.style.background = active
        ? "#5c5cff"
        : related
          ? "rgba(244,244,255,0.96)"
          : ambient
            ? "rgba(255,255,255,0.92)"
            : richDetail
              ? "rgba(255,255,255,0.92)"
              : "rgba(255,255,255,0.84)"
      label.style.borderColor = active
        ? "#5c5cff"
        : related
          ? "rgba(92,92,255,0.34)"
          : ambient
            ? "rgba(174,180,192,0.72)"
            : richDetail
              ? "rgba(188,194,205,0.72)"
              : "rgba(218,222,228,0.52)"
      label.style.boxShadow = active
        ? richDetail
          ? "0 0 0 1px rgba(255,255,255,0.28) inset, 0 10px 28px rgba(92,92,255,0.34), 0 0 28px rgba(92,92,255,0.16)"
          : "0 8px 22px rgba(92,92,255,0.26)"
        : related
          ? richDetail
            ? "0 0 0 1px rgba(255,255,255,0.5) inset, 0 7px 18px rgba(92,92,255,0.14)"
            : "0 6px 16px rgba(92,92,255,0.11)"
          : ambient
            ? "0 5px 14px rgba(24,29,37,0.075)"
            : richDetail
              ? "0 0 0 1px rgba(255,255,255,0.5) inset, 0 5px 15px rgba(24,29,37,0.07)"
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
          : ambient
            ? "#737b86"
            : "#24282e"
      dot.style.boxShadow = active
        ? richDetail
          ? "0 0 0 2px rgba(255,255,255,0.2), 0 0 8px rgba(255,255,255,0.72)"
          : "0 0 0 2px rgba(255,255,255,0.18)"
        : related
          ? richDetail
            ? "0 0 0 2px rgba(92,92,255,0.12), 0 0 7px rgba(92,92,255,0.28)"
            : "0 0 0 2px rgba(92,92,255,0.1)"
          : "0 0 0 2px rgba(31,34,39,0.05)"
    })
  }, [richDetail, selectedId])

  return <div ref={hostRef} className="absolute inset-0 overflow-hidden" />
}
