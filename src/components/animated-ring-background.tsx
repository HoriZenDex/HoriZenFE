"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { gsap } from "gsap"

function AnimatedRing() {
  const ringRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  const shaderData = useMemo(
    () => ({
      uniforms: {
        color: { value: new THREE.Color("#03ceb3") },
        progress: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float progress;
        varying vec2 vUv;
        
        void main() {
          float thickness = 0.1;
          vec2 center = vec2(0.5, 0.5);
          float dist = length(vUv - center);
          float ring = smoothstep(0.3 - thickness, 0.3, dist) * smoothstep(0.4, 0.4 - thickness, dist);
          
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float normalizedAngle = (angle + 3.14159) / (2.0 * 3.14159);
          float clipMask = step(normalizedAngle, progress);
          
          gl_FragColor = vec4(color, ring * 0.4 * clipMask);
        }
      `,
      transparent: true,
    }),
    [],
  )

  useEffect(() => {
    gsap.to(materialRef.current.uniforms.progress, {
      value: 1,
      duration: 2,
      ease: "power2.inOut",
    })
  }, [])

  useFrame(() => {
    ringRef.current.rotation.z += 0.0001 // Very slow rotation
  })

  return (
    <mesh ref={ringRef} scale={[3, 3, 3]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial ref={materialRef} args={[shaderData]} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function StarfieldParticles() {
  const particlesRef = useRef<THREE.Points>(null!)
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  const [positions, sizes] = useMemo(() => {
    const positions = []
    const sizes = []
    const numParticles = 5000 // Increased number of particles

    for (let i = 0; i < numParticles; i++) {
      // Distribute particles in a spherical volume
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.cbrt(Math.random()) * 10 // Cube root for more uniform distribution

      positions.push(
        r * Math.sin(phi) * Math.cos(theta) * aspect,
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      )

      sizes.push(Math.random() * 0.03 + 0.01) // Varied sizes for depth effect
    }

    return [new Float32Array(positions), new Float32Array(sizes)]
  }, [aspect])

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime() * 0.1
      particlesRef.current.rotation.y = time * 0.05
      particlesRef.current.rotation.x = time * 0.025

      const positionAttribute = particlesRef.current.geometry.getAttribute("position") as THREE.BufferAttribute
      const sizeAttribute = particlesRef.current.geometry.getAttribute("size") as THREE.BufferAttribute

      const positions = positionAttribute.array as Float32Array
      const sizes = sizeAttribute.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        const y = positions[i + 1]
        positions[i + 1] = y + Math.sin(time + positions[i] * 0.5) * 0.01
        sizes[i / 3] = (Math.sin(time + positions[i]) * 0.01 + 0.03) * (1 - Math.abs(positions[i + 2]) / 10) // Size variation based on z-position
      }

      positionAttribute.needsUpdate = true
      sizeAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#000000" sizeAttenuation transparent opacity={0.7} depthWrite={false} />
    </points>
  )
}

function FloatingShapes() {
  const shapesRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (shapesRef.current) {
      shapesRef.current.children.forEach((child, i) => {
        const t = state.clock.getElapsedTime() + i * 100
        child.position.y = Math.sin(t * 0.5) * 0.5
        child.rotation.x = Math.sin(t * 0.3) * 0.3
        child.rotation.z = Math.sin(t * 0.2) * 0.2
      })
    }
  })

  return (
    <group ref={shapesRef}>
      <mesh position={[-2, 1, -5]}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial color="#03ceb3" wireframe />
      </mesh>
      <mesh position={[2, -1, -3]}>
        <dodecahedronGeometry args={[0.4]} />
        <meshStandardMaterial color="#3afde2" wireframe />
      </mesh>
      <mesh position={[-1, -2, -4]}>
        <icosahedronGeometry args={[0.5]} />
        <meshStandardMaterial color="#FF3366" wireframe />
      </mesh>
    </group>
  )
}

function Scene() {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.Fog("#FFFFFF", 5, 15)
  }, [scene])

  return (
    <>
      <color attach="background" args={["#FFFFFF"]} />
      <ambientLight intensity={0.1} />
      <AnimatedRing />
      <StarfieldParticles />
      <FloatingShapes />
    </>
  )
}

export function AnimatedRingBackground() {
  return (
    <div className="fixed inset-0" style={{ zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Scene />
      </Canvas>
    </div>
  )
}

