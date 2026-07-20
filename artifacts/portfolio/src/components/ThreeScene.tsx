import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { Stars, OrbitControls, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

/** Detect WebGL support without crashing */
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

// ─── Interactive Globe ────────────────────────────────────────────────────────

function AnimatedGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef  = useRef<THREE.MeshStandardMaterial>(null);
  const [burst, setBurst] = useState(false);
  const scaleRef = useRef(1);

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setBurst(true);
    setTimeout(() => setBurst(false), 600);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;

    // Slow auto-rotation
    meshRef.current.rotation.y += 0.004;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;

    // Pulse emissive on burst
    const targetEmissive = burst ? 2.5 : 0.6;
    matRef.current.emissiveIntensity += (targetEmissive - matRef.current.emissiveIntensity) * 0.12;

    // Pulse scale on burst
    const targetScale = burst ? 1.18 : 1;
    scaleRef.current += (targetScale - scaleRef.current) * 0.1;
    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Sphere
      args={[1.6, 48, 48]}
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={() => { document.body.style.cursor = 'grab'; }}
      onPointerOut={() =>  { document.body.style.cursor = 'default'; }}
    >
      <meshStandardMaterial
        ref={matRef}
        color="#00b4d8"
        emissive="#00f5ff"
        emissiveIntensity={0.6}
        wireframe
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  );
}

// ─── Orbit ring ───────────────────────────────────────────────────────────────

function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * speed;
      ref.current.rotation.x = 0.5;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 8, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

// ─── Floating icosahedra ──────────────────────────────────────────────────────

function FloatingGems() {
  const groupRef = useRef<THREE.Group>(null);

  const items = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const radius = 3.2 + (i % 3) * 0.6;
        const angle  = (i / 10) * Math.PI * 2;
        return {
          i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle * 0.7) * 1.4,
          z: Math.sin(angle) * radius,
          color: i % 2 === 0 ? '#00f5ff' : '#a78bfa',
        };
      }),
    [],
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map(({ i, x, y, z, color }) => (
        <Icosahedron key={i} args={[0.15, 0]} position={[x, y, z]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            wireframe
          />
        </Icosahedron>
      ))}
    </group>
  );
}

// ─── CSS fallback ─────────────────────────────────────────────────────────────

function CSSFallback() {
  const [ripple, setRipple] = useState(false);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#050816] cursor-pointer select-none"
      onClick={() => { setRipple(true); setTimeout(() => setRipple(false), 700); }}
    >
      {/* Stars */}
      <div className="absolute inset-0" style={{
        backgroundImage: [
          'radial-gradient(1px 1px at 8% 18%, rgba(255,255,255,.8) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 22% 52%, rgba(255,255,255,.55) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 38% 12%, rgba(255,255,255,.7) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 58% 73%, rgba(255,255,255,.5) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 73% 33%, rgba(255,255,255,.8) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 83% 58%, rgba(255,255,255,.6) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 92% 8%, rgba(255,255,255,.7) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 4% 78%, rgba(255,255,255,.5) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 48% 88%, rgba(255,255,255,.6) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 28% 38%, rgba(255,255,255,.8) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 63% 18%, rgba(167,139,250,.6) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 88% 38%, rgba(0,245,255,.4) 0%,transparent 100%)',
        ].join(', '),
      }} />

      {/* Orb */}
      <div
        className="absolute left-1/2 top-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
        style={{
          background: ripple
            ? 'radial-gradient(circle, rgba(0,245,255,.35) 0%, rgba(124,58,237,.18) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,245,255,.15) 0%, rgba(124,58,237,.08) 45%, transparent 70%)',
          boxShadow: ripple
            ? '0 0 80px 20px rgba(0,245,255,.25), 0 0 160px 40px rgba(124,58,237,.15)'
            : '0 0 50px 10px rgba(0,245,255,.12), 0 0 100px 25px rgba(124,58,237,.07)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      {/* Rings */}
      <div className="absolute left-1/2 top-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: '1px solid rgba(0,245,255,.18)', animation: 'spin 14s linear infinite' }} />
      <div className="absolute left-1/2 top-1/2 w-[26rem] h-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: '1px solid rgba(167,139,250,.1)', animation: 'spin 22s linear infinite reverse' }} />

      {/* Dot on ring */}
      <div className="absolute left-1/2 top-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2"
        style={{ animation: 'spin 14s linear infinite' }}>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400"
          style={{ boxShadow: '0 0 8px 2px rgba(0,245,255,.8)' }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ThreeScene() {
  const webgl = useMemo(() => isWebGLAvailable(), []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#050816]">
      {webgl ? (
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#00f5ff" />
          <pointLight position={[-5, -5, -5]} intensity={1} color="#7c3aed" />
          <Stars radius={120} depth={60} count={6000} factor={3.5} saturation={0} fade speed={0.8} />
          <AnimatedGlobe />
          <OrbitRing radius={2.4} speed={0.3}  color="#00f5ff" />
          <OrbitRing radius={2.9} speed={-0.2} color="#7c3aed" />
          <FloatingGems />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI * 2 / 3}
          />
        </Canvas>
      ) : (
        <CSSFallback />
      )}
      <div className="absolute inset-0 bg-[#050816]/35 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </div>
  );
}
