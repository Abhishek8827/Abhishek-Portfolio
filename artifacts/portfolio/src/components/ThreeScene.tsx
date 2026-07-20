import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, Sphere, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/** Test WebGL availability without throwing — returns true if supported */
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere args={[1.5, 32, 32]} ref={meshRef}>
      <MeshDistortMaterial
        color="#00f5ff"
        attach="material"
        distort={0.4}
        speed={2}
        wireframe
        emissive="#00f5ff"
        emissiveIntensity={2}
      />
    </Sphere>
  );
}

function FloatingGeometries() {
  const groupRef = useRef<THREE.Group>(null);

  const items = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const radius = 3 + (i % 3) * 0.8;
        const angle = (i / 8) * Math.PI * 2;
        return {
          i,
          x: Math.cos(angle) * radius,
          y: ((i % 5) - 2) * 0.8,
          z: Math.sin(angle) * radius,
        };
      }),
    [],
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map(({ i, x, y, z }) => (
        <Icosahedron key={i} args={[0.2, 0]} position={[x, y, z]}>
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00f5ff' : '#7c3aed'}
            wireframe
            emissive={i % 2 === 0 ? '#00f5ff' : '#7c3aed'}
            emissiveIntensity={1}
          />
        </Icosahedron>
      ))}
    </group>
  );
}

/** CSS-only animated background used when WebGL is unavailable */
function CSSFallbackScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050816]">
      {/* Twinkling stars via layered radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(1px 1px at 8% 18%, rgba(255,255,255,0.8) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 22% 52%, rgba(255,255,255,0.6) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 38% 12%, rgba(255,255,255,0.7) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 58% 73%, rgba(255,255,255,0.5) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 73% 33%, rgba(255,255,255,0.8) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 83% 58%, rgba(255,255,255,0.6) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 92% 8%,  rgba(255,255,255,0.7) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 4%  78%, rgba(255,255,255,0.5) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 48% 88%, rgba(255,255,255,0.6) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 28% 38%, rgba(255,255,255,0.8) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 68% 48%, rgba(255,255,255,0.5) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 13% 63%, rgba(255,255,255,0.7) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 53% 28%, rgba(255,255,255,0.6) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 43% 68%, rgba(255,255,255,0.8) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 78% 83%, rgba(255,255,255,0.5) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 18% 43%, rgba(0,245,255,0.6) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 63% 18%, rgba(124,58,237,0.5) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 88% 38%, rgba(0,245,255,0.4) 0%, transparent 100%)',
          ].join(', '),
        }}
      />

      {/* Central glowing orb */}
      <div
        className="absolute left-1/2 top-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0,245,255,0.18) 0%, rgba(124,58,237,0.1) 45%, transparent 70%)',
          boxShadow:
            '0 0 60px 10px rgba(0,245,255,0.15), 0 0 120px 30px rgba(124,58,237,0.08)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      {/* Orbit ring 1 */}
      <div
        className="absolute left-1/2 top-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          border: '1px solid rgba(0,245,255,0.2)',
          animation: 'spin 14s linear infinite',
        }}
      />
      {/* Orbit ring 2 */}
      <div
        className="absolute left-1/2 top-1/2 w-[28rem] h-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          border: '1px solid rgba(124,58,237,0.12)',
          animation: 'spin 22s linear infinite reverse',
        }}
      />

      {/* Floating dot on orbit ring 1 */}
      <div
        className="absolute left-1/2 top-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2"
        style={{ animation: 'spin 14s linear infinite' }}
      >
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400"
          style={{ boxShadow: '0 0 8px 2px rgba(0,245,255,0.8)' }}
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </div>
  );
}

export default function ThreeScene() {
  const webgl = useMemo(() => isWebGLAvailable(), []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#050816]">
      {webgl ? (
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <AnimatedSphere />
          <FloatingGeometries />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      ) : (
        <CSSFallbackScene />
      )}
      <div className="absolute inset-0 bg-[#050816]/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </div>
  );
}
