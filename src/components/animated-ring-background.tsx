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
          
          gl_FragColor = vec4(color, ring * 0.8 * clipMask);
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

function Scene() {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.Fog("#000000", 5, 15)
  }, [scene])

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.1} />
      <AnimatedRing />
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

