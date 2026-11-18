import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  ChevronDown,
  ChevronUp,
  Layers,
  Sun,
  Moon,
  RotateCw,
  ShieldAlert,
} from 'lucide-react';
import { Language, MEDIA_ASSETS } from '../data/kalkaData';
import { buildKalkaDiorama, KalkaDioramaRig } from '../three/buildKalkaDiorama';
import {
  CAMERA_PRESETS,
  CameraPresetId,
  computeFloorTargetY,
  computeMcdCapTargetY,
  computePresetFraming,
  FLOOR_SPECS,
  FloorId,
  LightingPresetId,
} from '../utils/scene3dLogic';

const PRESET_LABELS: Record<CameraPresetId, string> = {
  isometric: 'Isometric',
  shopfront: 'Shopfront',
  top: 'Top',
};

interface Kalka3DViewportProps {
  lang: Language;
  active: boolean;
  onSelectFloorForConsult?: (floorId: FloorId) => void;
}

const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _pointerNdc = new THREE.Vector2();

function detectSoftwareGl(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function Kalka3DViewport({
  lang,
  active,
  onSelectFloorForConsult,
}: Kalka3DViewportProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<FloorId | null>('shop');
  const [exploded, setExploded] = useState(false);
  const [showMcdCap, setShowMcdCap] = useState(false);
  const [lighting, setLighting] = useState<LightingPresetId>('day');
  const [cameraPreset, setCameraPreset] = useState<CameraPresetId>('isometric');
  const [autoOrbit, setAutoOrbit] = useState(true);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  // Refs synced into the WebGL loop without tearing down the canvas
  const stateRef = useRef({
    exploded,
    showMcdCap,
    lighting,
    autoOrbit,
    active,
    selectedFloor,
    cameraTransitioning: false,
    presetId: cameraPreset,
  });

  const requestRenderRef = useRef<(() => void) | null>(null);
  const dioramaRef = useRef<KalkaDioramaRig | null>(null);
  const onSelectFloorRef = useRef(onSelectFloorForConsult);
  onSelectFloorRef.current = onSelectFloorForConsult;

  const prevStackStateRef = useRef({ exploded, showMcdCap });

  useEffect(() => {
    const stackChanged =
      prevStackStateRef.current.exploded !== exploded ||
      prevStackStateRef.current.showMcdCap !== showMcdCap;
    prevStackStateRef.current = { exploded, showMcdCap };

    stateRef.current.exploded = exploded;
    stateRef.current.showMcdCap = showMcdCap;
    stateRef.current.lighting = lighting;
    stateRef.current.autoOrbit = autoOrbit;
    stateRef.current.active = active;
    stateRef.current.selectedFloor = selectedFloor;

    if (stackChanged) {
      stateRef.current.cameraTransitioning = true;
    }

    if (dioramaRef.current) {
      dioramaRef.current.mcdCap.visible = showMcdCap;
      dioramaRef.current.highlightFloor(selectedFloor);
    }

    if (active) {
      requestRenderRef.current?.();
    }
  }, [exploded, showMcdCap, lighting, autoOrbit, active, selectedFloor]);

  const handleCameraPreset = (presetId: CameraPresetId) => {
    setCameraPreset(presetId);
    stateRef.current.presetId = presetId;
    stateRef.current.cameraTransitioning = true;
    requestRenderRef.current?.();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const dayBg = new THREE.Color(0x161b24);
    const eveningBg = new THREE.Color(0x0c1018);
    scene.background = dayBg.clone();
    scene.fog = new THREE.FogExp2(0x161b24, 0.022);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    const initialPreset = CAMERA_PRESETS.isometric;
    camera.position.set(...initialPreset.position);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...initialPreset.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.07;
    controls.minDistance = 7;
    controls.maxDistance = 38;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.autoRotate = false;
    controls.update();

    // 3-Point Warm/Cool Architectural Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x334155, 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1d6, 2.2);
    keyLight.position.set(10, 15, 9);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 40;
    keyLight.shadow.camera.left = -9;
    keyLight.shadow.camera.right = 9;
    keyLight.shadow.camera.top = 12;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xfbbf24, 0.75);
    rimLight.position.set(-9, 8, -10);
    scene.add(rimLight);

    const maxAnisotropy = isSoftwareGl
      ? 1
      : Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    const diorama = buildKalkaDiorama(isSoftwareGl, maxAnisotropy);
    diorama.highlightFloor(stateRef.current.selectedFloor);
    scene.add(diorama.root);
    dioramaRef.current = diorama;

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Frame pacing & coalesced on-demand render + software-WebGL afterDraw sync
    let disposed = false;
    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext | null;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const status = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function applyLighting(dt: number): boolean {
      const isEvening = stateRef.current.lighting === 'evening';
      const targetBg = isEvening ? eveningBg : dayBg;
      const currentBg = scene.background as THREE.Color;
      currentBg.lerp(targetBg, 1 - Math.exp(-6 * dt));
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.copy(currentBg);
      }

      const targetKey = isEvening ? 1.05 : 2.2;
      const targetHemi = isEvening ? 0.52 : 0.9;
      const targetShopGlow = isEvening ? 2.8 : 1.5;

      keyLight.intensity = THREE.MathUtils.damp(keyLight.intensity, targetKey, 6, dt);
      hemiLight.intensity = THREE.MathUtils.damp(hemiLight.intensity, targetHemi, 6, dt);
      diorama.interiorLight.intensity = THREE.MathUtils.damp(
        diorama.interiorLight.intensity,
        targetShopGlow,
        6,
        dt
      );

      return (
        Math.abs(keyLight.intensity - targetKey) > 0.015 ||
        Math.abs(hemiLight.intensity - targetHemi) > 0.015
      );
    }

    function stepScene(dt: number): boolean {
      let needsAnotherFrame = false;

      // Exploded floor vertical damping
      (['shop', 'floor1', 'floor2', 'floor3'] as FloorId[]).forEach((fid) => {
        const group = diorama.floors[fid];
        const targetY = computeFloorTargetY(fid, stateRef.current.exploded);
        group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 7.5, dt);
        if (Math.abs(group.position.y - targetY) > 0.005) {
          needsAnotherFrame = true;
        }
      });

      const capTargetY = computeMcdCapTargetY(stateRef.current.exploded);
      diorama.mcdCap.position.y = THREE.MathUtils.damp(
        diorama.mcdCap.position.y,
        capTargetY,
        7.5,
        dt
      );
      if (diorama.mcdCap.visible && Math.abs(diorama.mcdCap.position.y - capTargetY) > 0.005) {
        needsAnotherFrame = true;
      }

      // Lighting interpolation
      if (applyLighting(dt)) {
        needsAnotherFrame = true;
      }

      // Camera preset damping (cancelled immediately on user OrbitControls 'start')
      if (stateRef.current.cameraTransitioning) {
        const framing = computePresetFraming(
          stateRef.current.presetId,
          stateRef.current.exploded,
          stateRef.current.showMcdCap
        );
        _targetCamPos.set(...framing.position);
        _targetLookAt.set(...framing.target);

        const alpha = 1 - Math.exp(-6.5 * dt);
        camera.position.lerp(_targetCamPos, alpha);
        controls.target.lerp(_targetLookAt, alpha);

        if (
          camera.position.distanceTo(_targetCamPos) < 0.05 &&
          controls.target.distanceTo(_targetLookAt) < 0.05
        ) {
          camera.position.copy(_targetCamPos);
          controls.target.copy(_targetLookAt);
          stateRef.current.cameraTransitioning = false;
        } else {
          needsAnotherFrame = true;
        }
      }

      // Gentle auto-orbit when active and enabled
      if (stateRef.current.active && stateRef.current.autoOrbit && !stateRef.current.cameraTransitioning) {
        const angle = dt * (isSoftwareGl ? 0.3 : 0.28);
        const offsetX = camera.position.x - controls.target.x;
        const offsetZ = camera.position.z - controls.target.z;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        camera.position.x = controls.target.x + offsetX * cosA - offsetZ * sinA;
        camera.position.z = controls.target.z + offsetX * sinA + offsetZ * cosA;
        needsAnotherFrame = true;
      }

      controls.update();
      return needsAnotherFrame;
    }

    function requestRender() {
      if (disposed || !stateRef.current.active) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        if (disposed) return;
        renderDirty = false;
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        const keepGoing = stepScene(dt);
        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (!disposed && (renderDirty || keepGoing)) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    requestRenderRef.current = requestRender;

    const handleControlsStart = () => {
      stateRef.current.cameraTransitioning = false;
      setAutoOrbit(false);
    };
    const handleControlsChange = () => {
      requestRender();
    };

    controls.addEventListener('start', handleControlsStart);
    controls.addEventListener('change', handleControlsChange);

    // Raycasting on pointer click (distinguish clicks from drags)
    const raycaster = new THREE.Raycaster();
    let downX = 0;
    let downY = 0;

    const onPointerDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dist > 6) return;

      const rect = renderer.domElement.getBoundingClientRect();
      _pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(_pointerNdc, camera);
      const hits = raycaster.intersectObjects(diorama.interactables, false);
      if (hits.length > 0) {
        const floorId = hits[0].object.userData.floorId as FloorId | undefined;
        if (floorId) {
          setSelectedFloor(floorId);
          onSelectFloorRef.current?.(floorId);
          requestRender();
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // ResizeObserver so tab changes or responsive reflow stay sharp
    const resizeObserver = new ResizeObserver(() => {
      if (disposed) return;
      const w = Math.max(container.clientWidth, 320);
      const h = Math.max(container.clientHeight, 320);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    });
    resizeObserver.observe(container);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    const onContextRestored = () => {
      setWebglFailed(false);
      requestRender();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);

    // Initial render
    requestRender();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', handleControlsStart);
      controls.removeEventListener('change', handleControlsChange);
      controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      diorama.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      dioramaRef.current = null;
      requestRenderRef.current = null;
    };
  }, []);

  const currentFloorSpec = selectedFloor ? FLOOR_SPECS[selectedFloor] : FLOOR_SPECS.shop;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-[#161B24]">
      {/* Dedicated empty mount div for Three.js canvas */}
      {!webglFailed ? (
        <div
          ref={mountRef}
          data-testid="kalka-3d-canvas-container"
          aria-label="Interactive 3D architectural model of Kalka Properties Shop No. 10 and Builder Floors"
          className="h-full w-full cursor-grab active:cursor-grabbing"
        />
      ) : (
        <img
          src={MEDIA_ASSETS.storefrontPhoto}
          alt="Kalka Properties Storefront fallback"
          className="h-full w-full object-contain"
        />
      )}

      {/* Compact Top-Left Floor Readout (No backdrop-blur, no pulsing dots) */}
      <div className="pointer-events-none absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2">
        <div className="pointer-events-auto max-w-[235px] rounded-lg border border-white/15 bg-[#16191D]/92 px-2.5 py-1.5 text-white">
          <div className="flex items-center gap-1.5 font-mono-num text-[10px] font-semibold text-amber-400">
            <span>{currentFloorSpec.code}</span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'en' ? 'Click Floor' : 'फ्लोर चुनें'}</span>
          </div>
          <div className="mt-0.5 truncate text-[11px] font-semibold text-white">
            {lang === 'en' ? currentFloorSpec.titleEn : currentFloorSpec.titleHi}
          </div>
          <div className="mt-0.5 truncate text-[10px] text-neutral-300">
            {lang === 'en' ? currentFloorSpec.eligibilityEn : currentFloorSpec.eligibilityHi}
          </div>
        </div>
      </div>

      {/* Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
      <div className="pointer-events-none absolute inset-x-2 bottom-2 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setDockCollapsed((prev) => !prev)}
          aria-expanded={!dockCollapsed}
          aria-label={dockCollapsed ? 'Show 3D controls' : 'Hide 3D controls'}
          className="pointer-events-auto mb-1 inline-flex items-center gap-1 rounded-t-md border border-b-0 border-white/15 bg-[#16191D]/92 px-2.5 py-1 text-[11px] font-medium text-neutral-200 hover:text-white cursor-pointer"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="h-3 w-3" />
              <span>{lang === 'en' ? '3D Controls' : '3D नियंत्रण'}</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              <span>{lang === 'en' ? 'Hide Controls' : 'छिपाएं'}</span>
            </>
          )}
        </button>

        {!dockCollapsed && (
          <div className="pointer-events-auto flex w-full max-w-[540px] flex-wrap items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-[#16191D]/92 p-1.5 text-white">
            {/* Camera Presets */}
            <div
              role="group"
              aria-label="Camera angle presets"
              className="flex items-center gap-1 rounded-md bg-white/8 p-0.5"
            >
              {(['isometric', 'shopfront', 'top'] as CameraPresetId[]).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleCameraPreset(preset)}
                  className={`rounded px-2 py-1 text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                    cameraPreset === preset
                      ? 'bg-[#B91C1C] text-white'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {PRESET_LABELS[preset]}
                </button>
              ))}
            </div>

            {/* Exploded Floor View */}
            <button
              type="button"
              aria-pressed={exploded}
              onClick={() => setExploded((prev) => !prev)}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                exploded
                  ? 'bg-amber-500 text-[#16191D]'
                  : 'bg-white/10 text-neutral-200 hover:bg-white/18'
              }`}
            >
              <Layers className="h-3 w-3" />
              <span>{lang === 'en' ? 'Explode' : 'फ्लोर अलग'}</span>
            </button>

            {/* MCD 4th & 5th Floor Prohibition Indicator */}
            <button
              type="button"
              aria-pressed={showMcdCap}
              onClick={() => setShowMcdCap((prev) => !prev)}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                showMcdCap
                  ? 'bg-[#B91C1C] text-white'
                  : 'bg-white/10 text-neutral-200 hover:bg-white/18'
              }`}
            >
              <ShieldAlert className="h-3 w-3" />
              <span>{lang === 'en' ? 'MCD 4/5F' : 'MCD 4/5'}</span>
            </button>

            {/* Day / Evening Lighting */}
            <button
              type="button"
              aria-label={lighting === 'day' ? 'Switch to evening lighting' : 'Switch to day lighting'}
              onClick={() =>
                setLighting((prev) => (prev === 'day' ? 'evening' : 'day'))
              }
              className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-neutral-200 hover:bg-white/18 cursor-pointer"
            >
              {lighting === 'day' ? (
                <Moon className="h-3 w-3 text-amber-300" />
              ) : (
                <Sun className="h-3 w-3 text-amber-300" />
              )}
              <span>{lighting === 'day' ? 'Dusk' : 'Day'}</span>
            </button>

            {/* Auto-Orbit */}
            <button
              type="button"
              aria-pressed={autoOrbit}
              aria-label="Toggle auto-orbit"
              onClick={() => setAutoOrbit((prev) => !prev)}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium cursor-pointer ${
                autoOrbit
                  ? 'bg-white text-[#16191D]'
                  : 'bg-white/10 text-neutral-200 hover:bg-white/18'
              }`}
            >
              <RotateCw className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
