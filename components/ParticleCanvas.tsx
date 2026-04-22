'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleCanvasProps {
  className?: string;
  particleCount?: number;
  accentColor?: string;
  baseColor?: string;
}

export default function ParticleCanvas({
  className = '',
  particleCount = 60,
  accentColor = '#D4AF37',
  baseColor = '#003366',
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Floating particles (small dots)
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities: THREE.Vector3[] = [];

    const accent = new THREE.Color(accentColor);
    const base = new THREE.Color(baseColor);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = Math.random() > 0.7 ? accent : base;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        )
      );
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating geometric shapes
    const shapes: { mesh: THREE.Mesh; rotSpeed: THREE.Vector3; floatSpeed: number; floatOffset: number }[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(0.9, 0),
      new THREE.TorusGeometry(0.8, 0.3, 8, 12),
      new THREE.DodecahedronGeometry(0.8, 0),
    ];

    for (let i = 0; i < 7; i++) {
      const geo = geometries[i % geometries.length];
      const isGold = i % 3 === 0;
      const mat = new THREE.MeshBasicMaterial({
        color: isGold ? accentColor : baseColor,
        wireframe: true,
        transparent: true,
        opacity: isGold ? 0.3 : 0.15,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15 - 5
      );
      mesh.scale.setScalar(Math.random() * 1.5 + 0.5);

      scene.add(mesh);
      shapes.push({
        mesh,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005
        ),
        floatSpeed: Math.random() * 0.5 + 0.3,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }


    // Mouse interaction
    const mouse = new THREE.Vector2(0, 0);
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      // Update particles
      const posArray = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Boundary wrap
        if (Math.abs(posArray[i * 3]) > 25) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 25) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 15) velocities[i].z *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Update shapes
      shapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotSpeed.x;
        shape.mesh.rotation.y += shape.rotSpeed.y;
        shape.mesh.rotation.z += shape.rotSpeed.z;
        shape.mesh.position.y += Math.sin(time * shape.floatSpeed + shape.floatOffset) * 0.01;
      });

      // Subtle camera follow mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvas.parentElement) return;
      const width = canvas.parentElement.clientWidth;
      const height = canvas.parentElement.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      shapes.forEach(({ mesh }) => {
        (mesh.geometry as THREE.BufferGeometry).dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [particleCount, accentColor, baseColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
