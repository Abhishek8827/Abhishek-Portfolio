import { useRef, useMemo, useState, useCallback, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/** Lightweight WebGL check — no canvas allocation on failure */
function isWebGLAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch { return false; }
}

// ─── Ultra-light geometry (meshBasicMaterial = zero lighting cost) ────────────

function GeometryScene() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef  = useRef<THREE.Mesh>(null);
  const [clicked, setClicked] = useState(false);
  const scaleRef = useRef(1);

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.14;
      outerRef.current.rotation.y = t * 0.20;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.22;
      innerRef.current.rotation.y = -t * 0.16;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.09;
      ringRef.current.rotation.x = 0.42 + Math.sin(t * 0.2) * 0.06;
    }
    // Click burst scale
    if (outerRef.current) {
      const target = clicked ? 1.2 : 1;
      scaleRef.current += (target - scaleRef.current) * 0.12;
      outerRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return (
    <>
      {/* Outer low-poly icosahedron — wireframe, no lighting needed */}
      <mesh ref={outerRef} onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() =>  { document.body.style.cursor = 'default'; }}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#00c8ff" wireframe transparent opacity={0.40} />
      </mesh>
      {/* Inner counter-rotating gem */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.70} />
      </mesh>
      {/* Orbit ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.9, 0.012, 8, 120]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.55} />
      </mesh>
    </>
  );
}

// ─── CSS fallback ─────────────────────────────────────────────────────────────

function CSSFallback() {
  const [pop, setPop] = useState(false);
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#050816] cursor-pointer"
      onClick={() => { setPop(true); setTimeout(() => setPop(false), 600); }}
    >
      {/* Stars via CSS radial gradients */}
      <div className="absolute inset-0" style={{ backgroundImage: [
        'radial-gradient(1px 1px at  8% 16%, rgba(255,255,255,.9) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 22% 52%, rgba(255,255,255,.6) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 37% 11%, rgba(255,255,255,.8) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 58% 73%, rgba(255,255,255,.6) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 73% 33%, rgba(255,255,255,.9) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 84% 58%, rgba(255,255,255,.7) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 92%  8%, rgba(255,255,255,.8) 0%,transparent 100%)',
        'radial-gradient(1px 1px at  4% 78%, rgba(255,255,255,.6) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 48% 88%, rgba(255,255,255,.7) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 28% 38%, rgba(255,255,255,.9) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 64% 19%, rgba(167,139,250,.7) 0%,transparent 100%)',
        'radial-gradient(1px 1px at 88% 38%, rgba(0,245,255,.5)   0%,transparent 100%)',
      ].join(', ') }} />
      {/* Glow orb */}
      <div className="absolute left-1/2 top-1/2 w-64 h-64 rounded-full transition-all duration-500"
        style={{ transform:'translate(-50%,-50%)',
          background: pop
            ? 'radial-gradient(circle,rgba(0,245,255,.45) 0%,rgba(124,58,237,.22) 42%,transparent 70%)'
            : 'radial-gradient(circle,rgba(0,245,255,.22) 0%,rgba(124,58,237,.10) 42%,transparent 70%)',
          boxShadow: pop ? '0 0 90px 28px rgba(0,245,255,.28)' : '0 0 60px 12px rgba(0,245,255,.13)',
          animation: 'float 6s ease-in-out infinite' }} />
      {/* Rings */}
      <div className="absolute left-1/2 top-1/2 w-80 h-80 rounded-full"
        style={{ transform:'translate(-50%,-50%)', border:'1px solid rgba(0,245,255,.2)', animation:'spin 14s linear infinite' }} />
      <div className="absolute left-1/2 top-1/2 w-[28rem] h-[28rem] rounded-full"
        style={{ transform:'translate(-50%,-50%)', border:'1px solid rgba(167,139,250,.12)', animation:'spin 22s linear infinite reverse' }} />
      <div className="absolute left-1/2 top-1/2 w-80 h-80"
        style={{ transform:'translate(-50%,-50%)', animation:'spin 14s linear infinite' }}>
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400"
          style={{ boxShadow:'0 0 12px 3px rgba(0,245,255,.9)' }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </div>
  );
}

// ─── Error boundary ───────────────────────────────────────────────────────────

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(_e: Error, _i: ErrorInfo) { this.setState({ failed: true }); }
  render() { return this.state.failed ? <CSSFallback /> : this.props.children; }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ThreeScene() {
  const webgl = useMemo(() => isWebGLAvailable(), []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050816]" style={{ zIndex: 0 }}>
      {!webgl ? <CSSFallback /> : (
        <WebGLBoundary>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 48 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: false, powerPreference: 'default' }}
            frameloop="always"
          >
            <color attach="background" args={['#050816']} />
            {/* Stars — reduced count for performance */}
            <Stars radius={110} depth={50} count={1800} factor={3} saturation={0} fade speed={0.6} />
            <Suspense fallback={null}>
              <GeometryScene />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.35}
              minPolarAngle={Math.PI / 3.5}
              maxPolarAngle={(Math.PI * 2) / 3}
            />
          </Canvas>
        </WebGLBoundary>
      )}
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />
    </div>
  );
}
