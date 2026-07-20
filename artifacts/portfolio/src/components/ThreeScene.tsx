import { useRef, useMemo, useCallback, useState, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';

/** Detect WebGL support before even creating a Canvas */
function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}
import { Stars, OrbitControls, Sphere, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── Interactive distorted globe ─────────────────────────────────────────────

function AnimatedGlobe() {
  const meshRef   = useRef<THREE.Mesh>(null);
  const matRef    = useRef<any>(null);
  const [burst, setBurst] = useState(false);
  const scaleRef  = useRef(1);

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.12;

    // Animate distort & emissive
    const targetDistort   = burst ? 1.2 : 0.45;
    const targetEmissive  = burst ? 3.0 : 1.0;
    matRef.current.distort         += (targetDistort  - matRef.current.distort)        * 0.08;
    matRef.current.emissiveIntensity += (targetEmissive - matRef.current.emissiveIntensity) * 0.1;

    // Scale pulse
    const targetScale = burst ? 1.22 : 1;
    scaleRef.current += (targetScale - scaleRef.current) * 0.12;
    meshRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <Sphere
      args={[1.7, 64, 64]}
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={() => { document.body.style.cursor = 'grab'; }}
      onPointerOut={() =>  { document.body.style.cursor = 'default'; }}
    >
      <MeshDistortMaterial
        ref={matRef}
        color="#00b8d9"
        emissive="#00f5ff"
        emissiveIntensity={1.0}
        distort={0.45}
        speed={3}
        roughness={0.1}
        metalness={0.85}
      />
    </Sphere>
  );
}

// ─── Orbit rings ──────────────────────────────────────────────────────────────

function OrbitRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * speed;
      ref.current.rotation.x = 0.48;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.01, 8, 140]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

// ─── Floating gems ────────────────────────────────────────────────────────────

function FloatingGems() {
  const groupRef = useRef<THREE.Group>(null);

  const items = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => {
      const angle  = (i / 12) * Math.PI * 2;
      const radius = 3.0 + (i % 3) * 0.5;
      return {
        i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle * 0.7) * 1.3,
        z: Math.sin(angle) * radius,
        color: i % 2 === 0 ? '#00f5ff' : '#a78bfa',
      };
    }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.07;
    }
  });

  return (
    <group ref={groupRef}>
      {items.map(({ i, x, y, z, color }) => (
        <Icosahedron key={i} args={[0.14, 0]} position={[x, y, z]}>
          <meshBasicMaterial color={color} />
        </Icosahedron>
      ))}
    </group>
  );
}

// ─── CSS fallback (no WebGL) ──────────────────────────────────────────────────

function CSSFallback() {
  const [ripple, setRipple] = useState(false);
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#050816] cursor-pointer select-none"
      onClick={() => { setRipple(true); setTimeout(() => setRipple(false), 700); }}
    >
      <div className="absolute inset-0" style={{
        backgroundImage: [
          'radial-gradient(1px 1px at  8% 18%, rgba(255,255,255,.9) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 22% 52%, rgba(255,255,255,.6) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 38% 12%, rgba(255,255,255,.8) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 58% 73%, rgba(255,255,255,.6) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 73% 33%, rgba(255,255,255,.9) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 83% 58%, rgba(255,255,255,.7) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 92%  8%, rgba(255,255,255,.8) 0%,transparent 100%)',
          'radial-gradient(1px 1px at  4% 78%, rgba(255,255,255,.6) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 48% 88%, rgba(255,255,255,.7) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 28% 38%, rgba(255,255,255,.9) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 63% 18%, rgba(167,139,250,.7) 0%,transparent 100%)',
          'radial-gradient(1px 1px at 88% 38%, rgba(0,245,255,.5)   0%,transparent 100%)',
        ].join(', '),
      }} />
      {/* Glowing orb */}
      <div className="absolute left-1/2 top-1/2 w-64 h-64 rounded-full transition-all duration-500"
        style={{
          transform: 'translate(-50%, -50%)',
          background: ripple
            ? 'radial-gradient(circle, rgba(0,245,255,.5) 0%, rgba(124,58,237,.25) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,245,255,.25) 0%, rgba(124,58,237,.12) 40%, transparent 70%)',
          boxShadow: ripple
            ? '0 0 90px 30px rgba(0,245,255,.3), 0 0 180px 50px rgba(124,58,237,.18)'
            : '0 0 60px 14px rgba(0,245,255,.15), 0 0 120px 30px rgba(124,58,237,.08)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div className="absolute left-1/2 top-1/2 w-80 h-80 rounded-full"
        style={{ transform: 'translate(-50%, -50%)', border: '1px solid rgba(0,245,255,.2)', animation: 'spin 14s linear infinite' }} />
      <div className="absolute left-1/2 top-1/2 w-[28rem] h-[28rem] rounded-full"
        style={{ transform: 'translate(-50%, -50%)', border: '1px solid rgba(167,139,250,.12)', animation: 'spin 22s linear infinite reverse' }} />
      <div className="absolute left-1/2 top-1/2 w-80 h-80"
        style={{ transform: 'translate(-50%, -50%)', animation: 'spin 14s linear infinite' }}>
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400"
          style={{ boxShadow: '0 0 12px 3px rgba(0,245,255,.9)' }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </div>
  );
}

// ─── WebGL error boundary (fallback if pre-check missed something) ────────────

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  componentDidCatch(err: Error, _info: ErrorInfo) {
    if (err.message.toLowerCase().includes('webgl') || err.message.toLowerCase().includes('canvas')) {
      this.setState({ failed: true });
    }
  }
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <CSSFallback />;
    return this.props.children;
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ThreeScene() {
  const webgl = useMemo(() => isWebGLAvailable(), []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050816]" style={{ zIndex: 0 }}>
      {!webgl ? <CSSFallback /> : (
      <WebGLBoundary>
        <Canvas camera={{ position: [0, 0, 7], fov: 48 }} gl={{ antialias: true, alpha: false }}>
          <color attach="background" args={['#050816']} />
          <ambientLight intensity={1.2} />
          <pointLight position={[6, 6, 6]}   intensity={8}  color="#00f5ff" />
          <pointLight position={[-6, -6, -4]} intensity={4}  color="#7c3aed" />
          <pointLight position={[0, 4, -6]}   intensity={3}  color="#ffffff" />
          <Stars radius={130} depth={60} count={7000} factor={4} saturation={0} fade speed={0.7} />
          <Suspense fallback={null}>
            <AnimatedGlobe />
          </Suspense>
          <OrbitRing radius={2.5}  speed={0.28}  color="#00f5ff" />
          <OrbitRing radius={3.1}  speed={-0.18} color="#7c3aed" />
          <FloatingGems />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
            minPolarAngle={Math.PI / 3.5}
            maxPolarAngle={(Math.PI * 2) / 3}
          />
          <EffectComposer>
            <Bloom luminanceThreshold={0.05} luminanceSmoothing={0.9} intensity={1.8} mipmapBlur />
          </EffectComposer>
        </Canvas>
      </WebGLBoundary>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </div>
  );
}
