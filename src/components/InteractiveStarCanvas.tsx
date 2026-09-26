import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface InteractiveStarCanvasProps {
  className?: string;
}

export const InteractiveStarCanvas: React.FC<InteractiveStarCanvasProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coordinates, setCoordinates] = useState({ lat: '19.0760° N', lng: '72.8777° E', fps: 60 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Group for the entire TST Geometric Coordinate Structure
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Hexagonal Outer Ring (representing TST Hexagon geometry)
    const hexRadius = 1.85;
    const hexPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      hexPoints.push(new THREE.Vector3(Math.cos(angle) * hexRadius, Math.sin(angle) * hexRadius, 0));
    }
    const hexGeometry = new THREE.BufferGeometry().setFromPoints(hexPoints);
    const hexMaterial = new THREE.LineBasicMaterial({
      color: 0x00C2FF,
      transparent: true,
      opacity: 0.55,
      linewidth: 1.5,
    });
    const hexLine = new THREE.Line(hexGeometry, hexMaterial);
    mainGroup.add(hexLine);

    // 2. Inner Hexagon
    const innerHexPoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      innerHexPoints.push(new THREE.Vector3(Math.cos(angle) * (hexRadius * 0.62), Math.sin(angle) * (hexRadius * 0.62), 0));
    }
    const innerHexGeometry = new THREE.BufferGeometry().setFromPoints(innerHexPoints);
    const innerHexMaterial = new THREE.LineBasicMaterial({
      color: 0x6B7280,
      transparent: true,
      opacity: 0.35,
    });
    const innerHexLine = new THREE.Line(innerHexGeometry, innerHexMaterial);
    mainGroup.add(innerHexLine);

    // 3. Central Icosahedron Geometry (Technical faceted core)
    const coreGeometry = new THREE.IcosahedronGeometry(0.9, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x080808,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 4. Glowing Cyan Vertex Nodes
    const vertices = coreGeometry.attributes.position;
    const nodeGeometry = new THREE.SphereGeometry(0.04, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00C2FF,
    });

    const nodesGroup = new THREE.Group();
    for (let i = 0; i < vertices.count; i++) {
      const x = vertices.getX(i);
      const y = vertices.getY(i);
      const z = vertices.getZ(i);
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, z);
      nodesGroup.add(node);
    }
    mainGroup.add(nodesGroup);

    // 5. Floating Ambient Data Particles
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00C2FF,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particleSystem);

    // 6. Orbital Thin Rings
    const ringGeometry = new THREE.RingGeometry(2.3, 2.315, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00C2FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2.8;
    mainGroup.add(ringMesh);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth subtle continuous rotation
      mainGroup.rotation.y += 0.0035;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;
      mainGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05;

      // Pulse nodes slightly
      const pulseScale = 1 + Math.sin(elapsedTime * 2) * 0.08;
      nodesGroup.scale.set(pulseScale, pulseScale, pulseScale);

      // Ring counter-rotation
      ringMesh.rotation.z -= 0.004;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      hexGeometry.dispose();
      hexMaterial.dispose();
      innerHexGeometry.dispose();
      innerHexMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle Technical HUD Overlays */}
      <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-neutral-500 uppercase flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-ping" />
        <span>TST // GEOMETRIC CORE [V-2.6]</span>
      </div>

      <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-widest text-neutral-500 pointer-events-none">
        <span className="text-[#00C2FF]">COORD:</span> 20.8168° N, 75.7873° E // BHUSAWAL
      </div>

      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-neutral-500 pointer-events-none hidden sm:block">
        <span>SYSTEM: OPTIMAL</span>
      </div>
    </div>
  );
};
