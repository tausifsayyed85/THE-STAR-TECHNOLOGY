import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { RotateCw, Sparkles, Eye, Maximize2, ShieldCheck, Compass, Zap } from 'lucide-react';

interface InteractiveStarCanvasProps {
  className?: string;
}

type StarVisualMode = 'crystal' | 'wireframe' | 'radiant';

export const InteractiveStarCanvas: React.FC<InteractiveStarCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visualMode, setVisualMode] = useState<StarVisualMode>('crystal');
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  // References to communicate with the render loop without re-renders
  const modeRef = useRef<StarVisualMode>(visualMode);
  modeRef.current = visualMode;

  const interactionState = useRef({
    isDragging: false,
    previousMouseX: 0,
    previousMouseY: 0,
    targetRotX: 0.3,
    targetRotY: 0.4,
    currentRotX: 0.3,
    currentRotY: 0.4,
    velX: 0.003,
    velY: 0.005,
    cursorNormalizedX: 0,
    cursorNormalizedY: 0,
    burstPulse: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // --- Three.js Scene Setup ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // --- Geometry: Stellated Icosahedral Star (Matching sculpture in photo) ---
    function createStellatedStarGeometry(radius = 1.35, spikeHeight = 0.85): THREE.BufferGeometry {
      const baseIco = new THREE.IcosahedronGeometry(radius, 0);
      const posAttr = baseIco.getAttribute('position');
      const vertices: number[] = [];

      // Loop through each triangular face (every 3 vertices)
      for (let i = 0; i < posAttr.count; i += 3) {
        const vA = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
        const vB = new THREE.Vector3(posAttr.getX(i + 1), posAttr.getY(i + 1), posAttr.getZ(i + 1));
        const vC = new THREE.Vector3(posAttr.getX(i + 2), posAttr.getY(i + 2), posAttr.getZ(i + 2));

        // Centroid of face
        const centroid = new THREE.Vector3()
          .add(vA)
          .add(vB)
          .add(vC)
          .divideScalar(3);

        // Normal direction pointing outward
        const normal = centroid.clone().normalize();
        const apex = centroid.clone().add(normal.multiplyScalar(spikeHeight));

        // Create 3 triangular faces connecting apex to edges
        // Triangle 1: apex, vA, vB
        vertices.push(apex.x, apex.y, apex.z, vA.x, vA.y, vA.z, vB.x, vB.y, vB.z);
        // Triangle 2: apex, vB, vC
        vertices.push(apex.x, apex.y, apex.z, vB.x, vB.y, vB.z, vC.x, vC.y, vC.z);
        // Triangle 3: apex, vC, vA
        vertices.push(apex.x, apex.y, apex.z, vC.x, vC.y, vC.z, vA.x, vA.y, vA.z);
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geom.computeVertexNormals();
      return geom;
    }

    const starGroup = new THREE.Group();
    scene.add(starGroup);

    // 1. Outer Glass/Chrome Stellated Star Mesh
    const starGeometry = createStellatedStarGeometry(1.2, 0.78);

    // Crystal material with glass refraction aesthetic
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f0f9ff'),
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.12,
      roughness: 0.12,
      metalness: 0.25,
      transmission: 0.72,
      ior: 1.52,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    });

    // Wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#06b6d4'),
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    // Radiant material
    const radiantMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38bdf8'),
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
    });

    const starMesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material> = new THREE.Mesh(starGeometry, crystalMaterial);
    starGroup.add(starMesh);

    // 2. Shiny Metallic Chrome Edges (Beveled Polished Struts matching image.png)
    const edgesGeometry = new THREE.EdgesGeometry(starGeometry, 15);
    const edgesMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color('#bae6fd'),
      linewidth: 2,
      transparent: true,
      opacity: 0.95,
    });
    const starEdges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    starGroup.add(starEdges);

    // 3. Inner Luminous Core (Glowing central geometric core as in the photo)
    const coreGeometry = new THREE.OctahedronGeometry(0.55, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fbbf24'),
      emissive: new THREE.Color('#f59e0b'),
      emissiveIntensity: 1.2,
      roughness: 0.3,
      metalness: 0.5,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    starGroup.add(coreMesh);

    const coreEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreGeometry),
      new THREE.LineBasicMaterial({ color: new THREE.Color('#fef08a'), linewidth: 2 })
    );
    coreMesh.add(coreEdges);

    // 4. Floating Stardust Particles
    const particleCount = 75;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 2.0 + Math.random() * 1.6;
      particlePositions[i] = rad * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = rad * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = rad * Math.cos(phi);
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#38bdf8'),
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleCloud);

    // --- Dynamic Lighting (Tracks cursor coordinates) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainPointLight = new THREE.PointLight(0x38bdf8, 3.2, 10);
    mainPointLight.position.set(2, 3, 3);
    scene.add(mainPointLight);

    const warmCoreLight = new THREE.PointLight(0xf59e0b, 2.5, 4);
    warmCoreLight.position.set(0, 0, 0);
    starGroup.add(warmCoreLight);

    const fillLight = new THREE.DirectionalLight(0x6366f1, 1.2);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    // --- Interaction Listeners ---
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      interactionState.current.isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      interactionState.current.previousMouseX = clientX;
      interactionState.current.previousMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      interactionState.current.cursorNormalizedX = normX;
      interactionState.current.cursorNormalizedY = normY;

      if (interactionState.current.isDragging) {
        const deltaX = clientX - interactionState.current.previousMouseX;
        const deltaY = clientY - interactionState.current.previousMouseY;
        interactionState.current.velX = deltaX * 0.007;
        interactionState.current.velY = deltaY * 0.007;
        interactionState.current.targetRotY += interactionState.current.velX;
        interactionState.current.targetRotX += interactionState.current.velY;
        interactionState.current.previousMouseX = clientX;
        interactionState.current.previousMouseY = clientY;
      }
    };

    const handlePointerUp = () => {
      interactionState.current.isDragging = false;
      setIsInteracting(false);
    };

    const handleClick = () => {
      // Trigger a light refraction burst pulse
      interactionState.current.burstPulse = 1.0;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    container.addEventListener('click', handleClick);

    // --- Resize Observer ---
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Animation Render Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Apply Material according to current mode
      if (modeRef.current === 'crystal') {
        starMesh.material = crystalMaterial;
        starMesh.visible = true;
        starEdges.visible = true;
        edgesMaterial.color.set('#bae6fd');
      } else if (modeRef.current === 'wireframe') {
        starMesh.material = wireframeMaterial;
        starMesh.visible = true;
        starEdges.visible = true;
        edgesMaterial.color.set('#06b6d4');
      } else if (modeRef.current === 'radiant') {
        starMesh.material = radiantMaterial;
        starMesh.visible = true;
        starEdges.visible = true;
        edgesMaterial.color.set('#e0f2fe');
      }

      // Smooth inertia & rotation
      if (!interactionState.current.isDragging) {
        // Natural ambient float
        interactionState.current.targetRotY += 0.0035;
        interactionState.current.targetRotX += 0.0015;

        // Subtle tilt tracking cursor position
        const cursorInfluenceX = interactionState.current.cursorNormalizedY * 0.45;
        const cursorInfluenceY = interactionState.current.cursorNormalizedX * 0.55;

        interactionState.current.currentRotX += (interactionState.current.targetRotX + cursorInfluenceX - interactionState.current.currentRotX) * 0.08;
        interactionState.current.currentRotY += (interactionState.current.targetRotY + cursorInfluenceY - interactionState.current.currentRotY) * 0.08;
      } else {
        interactionState.current.currentRotX += (interactionState.current.targetRotX - interactionState.current.currentRotX) * 0.2;
        interactionState.current.currentRotY += (interactionState.current.targetRotY - interactionState.current.currentRotY) * 0.2;
      }

      starGroup.rotation.x = interactionState.current.currentRotX;
      starGroup.rotation.y = interactionState.current.currentRotY;

      // Inner Core counter-rotates and breathes
      coreMesh.rotation.x = -elapsed * 0.5;
      coreMesh.rotation.y = elapsed * 0.7;
      const coreScale = 0.95 + Math.sin(elapsed * 2) * 0.08;
      coreMesh.scale.set(coreScale, coreScale, coreScale);

      // Light tracks the cursor
      mainPointLight.position.x = interactionState.current.cursorNormalizedX * 3.5;
      mainPointLight.position.y = interactionState.current.cursorNormalizedY * 3.5;
      mainPointLight.position.z = 2.5 + Math.cos(elapsed) * 0.5;

      // Particles orbit softly
      particleCloud.rotation.y = elapsed * 0.05;
      particleCloud.rotation.x = Math.sin(elapsed * 0.03) * 0.2;

      // Burst pulse decay
      if (interactionState.current.burstPulse > 0.01) {
        interactionState.current.burstPulse *= 0.92;
        mainPointLight.intensity = 3.2 + interactionState.current.burstPulse * 5;
        crystalMaterial.emissiveIntensity = 0.12 + interactionState.current.burstPulse * 0.8;
      } else {
        mainPointLight.intensity = 3.2;
        crystalMaterial.emissiveIntensity = 0.12;
      }

      // Update degrees indicator for UI
      const deg = Math.round(((starGroup.rotation.y * 180) / Math.PI) % 360);
      setRotationDegrees(deg < 0 ? deg + 360 : deg);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      container.removeEventListener('click', handleClick);

      starGeometry.dispose();
      crystalMaterial.dispose();
      wireframeMaterial.dispose();
      radiantMaterial.dispose();
      edgesGeometry.dispose();
      edgesMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      coreEdges.geometry.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const resetOrientation = () => {
    interactionState.current.targetRotX = 0.2;
    interactionState.current.targetRotY = 0.3;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="3d-star"
      className={`relative w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-white/95 via-sky-50/40 to-slate-100/90 border border-slate-200/90 shadow-2xl shadow-cyan-900/10 select-none group cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Subtle Background Radial Caustic Flare */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.18),transparent_70%)] pointer-events-none" />

      {/* Floating Top Left Badge: Dynamic IT Architecture */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-md text-xs font-bold text-slate-800 flex items-center gap-2 pointer-events-none"
      >
        <Zap className="w-3.5 h-3.5 text-cyan-600" />
        <span>Dynamic 3D Architecture</span>
      </motion.div>

      {/* Floating Top Right Badge: Mode Selector */}
      <div className="absolute top-3.5 right-3.5 flex items-center gap-1 p-1 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-md z-10">
        <button
          type="button"
          onClick={() => setVisualMode('crystal')}
          title="Prism Glass Mode"
          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
            visualMode === 'crystal'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Glass
        </button>
        <button
          type="button"
          onClick={() => setVisualMode('wireframe')}
          title="Vector Wireframe Mode"
          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
            visualMode === 'wireframe'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Mesh
        </button>
        <button
          type="button"
          onClick={() => setVisualMode('radiant')}
          title="Chrome Radiant Mode"
          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
            visualMode === 'radiant'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Chrome
        </button>
      </div>

      {/* Bottom Center Interactive Cursor Guide (Pill) */}
      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md border border-cyan-400/40 shadow-xl flex items-center gap-2 text-[11px] font-mono font-bold tracking-wider">
          <Compass className={`w-3.5 h-3.5 text-cyan-400 ${isInteracting ? 'animate-spin' : ''}`} />
          <span>{isInteracting ? `ROTATING ${rotationDegrees}°` : 'DRAG TO ROTATE 360°'}</span>
        </div>
      </div>

      {/* Bottom Left Badge: Reset Button */}
      <div className="absolute bottom-3.5 left-3.5 z-10">
        <button
          type="button"
          onClick={resetOrientation}
          title="Reset orientation"
          className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 backdrop-blur-md border border-slate-200 shadow-md transition-all active:scale-95"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Right Badge: Verified Production */}
      <div className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-cyan-300/60 shadow-md text-[11px] font-bold text-cyan-800 flex items-center gap-1.5 pointer-events-none">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
        <span>EST. 2025 • BHUSAWAL</span>
      </div>

      {/* Floating Animated Cursor Indicator on Hover */}
      {isHovered && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-24 h-24 rounded-full border border-cyan-400/40 animate-ping" />
        </div>
      )}
    </div>
  );
};
