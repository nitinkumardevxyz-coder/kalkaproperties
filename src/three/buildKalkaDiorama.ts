import * as THREE from 'three';
import {
  createContactShadowTexture,
  createGridPlazaTexture,
  createShopSignTexture,
  createStoneBumpTexture,
} from './proceduralTextures';
import { FloorId } from '../utils/scene3dLogic';

export interface KalkaDioramaRig {
  root: THREE.Group;
  floors: Record<FloorId, THREE.Group>;
  mcdCap: THREE.Group;
  interactables: THREE.Object3D[];
  interiorLight: THREE.PointLight;
  dispose: () => void;
  highlightFloor: (selected: FloorId | null) => void;
}

function createPlanterPot(
  potMat: THREE.Material,
  leafMat: THREE.Material
): THREE.Group {
  const potGroup = new THREE.Group();
  const potGeo = new THREE.CylinderGeometry(0.18, 0.13, 0.28, 14);
  const pot = new THREE.Mesh(potGeo, potMat);
  pot.position.y = 0.14;
  potGroup.add(pot);

  const bushGeo = new THREE.DodecahedronGeometry(0.22, 1);
  const bush = new THREE.Mesh(bushGeo, leafMat);
  bush.position.y = 0.38;
  bush.scale.set(1, 1.15, 1);
  potGroup.add(bush);

  return potGroup;
}

function createSideStaircase(steelMat: THREE.Material): THREE.Group {
  const stairGroup = new THREE.Group();
  const treadGeo = new THREE.BoxGeometry(0.65, 0.06, 0.24);
  for (let i = 0; i < 8; i++) {
    const tread = new THREE.Mesh(treadGeo, steelMat);
    tread.position.set(0, 0.15 + i * 0.24, 0.9 - i * 0.22);
    stairGroup.add(tread);
  }
  const railGeo = new THREE.CylinderGeometry(0.028, 0.028, 2.6, 8);
  for (const xOffset of [-0.3, 0.3]) {
    const rail = new THREE.Mesh(railGeo, steelMat);
    rail.position.set(xOffset, 1.25, 0.15);
    rail.rotation.x = Math.PI / 4.2;
    stairGroup.add(rail);
  }
  return stairGroup;
}

export function buildKalkaDiorama(
  isSoftwareGl: boolean,
  maxAnisotropy: number
): KalkaDioramaRig {
  const root = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item);
    return item;
  };

  // Procedural textures
  const stoneBump = track(createStoneBumpTexture(maxAnisotropy));
  const hindiSignTex = track(createShopSignTexture('hindi', maxAnisotropy));
  const englishSignTex = track(createShopSignTexture('english', maxAnisotropy));
  const contactTex = track(createContactShadowTexture());
  const plazaTex = track(createGridPlazaTexture(maxAnisotropy));

  // Shared calibrated PBR materials (varied roughness & metalness)
  const plazaMat = track(
    new THREE.MeshStandardMaterial({
      map: plazaTex,
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0.04,
    })
  );

  const concreteMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x2b303a,
      roughness: 0.88,
      metalness: 0.05,
    })
  );

  const roadMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x1e222a,
      roughness: 0.95,
      metalness: 0.02,
    })
  );

  const turfMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x15803d,
      roughness: 0.92,
      metalness: 0.0,
    })
  );

  const steelMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.22,
      metalness: 0.88,
    })
  );

  const creamWallMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xf4efe6,
      bumpMap: stoneBump,
      bumpScale: 0.04,
      roughness: 0.78,
      metalness: 0.04,
    })
  );

  const warmSlateMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xe5dfd5,
      bumpMap: stoneBump,
      bumpScale: 0.035,
      roughness: 0.72,
      metalness: 0.06,
    })
  );

  const darkTrimMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x1e242c,
      roughness: 0.45,
      metalness: 0.35,
    })
  );

  const crimsonTrimMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.42,
      metalness: 0.15,
    })
  );

  const goldAccentMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.28,
      metalness: 0.78,
    })
  );

  const glassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      roughness: 0.08,
      metalness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.72,
      transparent: true,
      opacity: isSoftwareGl ? 0.38 : 0.92,
      ior: 1.5,
      clearcoat: 1.0,
      depthWrite: false,
    })
  );

  const warmInteriorMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.45,
      roughness: 0.6,
    })
  );

  const potMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.82,
      metalness: 0.05,
    })
  );

  const leafMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      roughness: 0.75,
      metalness: 0.0,
    })
  );

  const signHindiMat = track(
    new THREE.MeshStandardMaterial({
      map: hindiSignTex,
      color: 0xffffff,
      roughness: 0.38,
      metalness: 0.08,
    })
  );

  const signEnglishMat = track(
    new THREE.MeshStandardMaterial({
      map: englishSignTex,
      color: 0xffffff,
      roughness: 0.38,
      metalness: 0.08,
    })
  );

  // Extended plaza ground + contact shadow grounding
  const plazaGeo = track(new THREE.PlaneGeometry(64, 64));
  const plaza = new THREE.Mesh(plazaGeo, plazaMat);
  plaza.rotation.x = -Math.PI / 2;
  plaza.receiveShadow = !isSoftwareGl;
  root.add(plaza);

  const contactGeo = track(new THREE.CircleGeometry(6.8, 48));
  const contactMat = track(
    new THREE.MeshBasicMaterial({
      map: contactTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
  );
  const contactDisc = new THREE.Mesh(contactGeo, contactMat);
  contactDisc.rotation.x = -Math.PI / 2;
  contactDisc.position.y = 0.015;
  root.add(contactDisc);

  // Sidewalk plinth & front road apron (offset >= 0.02 on Y to prevent Z-fighting)
  const plinthGeo = track(new THREE.BoxGeometry(8.2, 0.24, 6.2));
  const plinth = new THREE.Mesh(plinthGeo, concreteMat);
  plinth.position.set(0, 0.12, 0);
  plinth.receiveShadow = !isSoftwareGl;
  root.add(plinth);

  const roadGeo = track(new THREE.BoxGeometry(11.5, 0.06, 2.2));
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.position.set(0, 0.03, 4.3);
  root.add(road);

  // Helper to create floor-specific material clone for highlight feedback
  const floorHighlightMats: Record<FloorId, THREE.MeshStandardMaterial> = {
    shop: track(creamWallMat.clone()),
    floor1: track(creamWallMat.clone()),
    floor2: track(warmSlateMat.clone()),
    floor3: track(creamWallMat.clone()),
  };

  const interactables: THREE.Object3D[] = [];
  const tagInteractable = (mesh: THREE.Object3D, floorId: FloorId) => {
    mesh.userData.floorId = floorId;
    interactables.push(mesh);
  };

  // =========================================================================
  // GROUND FLOOR: KALKA PROPERTIES SHOP NO. 10 (y = 0.25)
  // =========================================================================
  const shopGroup = new THREE.Group();
  shopGroup.position.y = 0.25;

  const shopCoreGeo = track(new THREE.BoxGeometry(5.6, 2.1, 4.4));
  const shopCore = new THREE.Mesh(shopCoreGeo, floorHighlightMats.shop);
  shopCore.position.set(0, 1.05, -0.2);
  shopCore.castShadow = !isSoftwareGl;
  shopCore.receiveShadow = !isSoftwareGl;
  tagInteractable(shopCore, 'shop');
  shopGroup.add(shopCore);

  // Warm recessed interior storefront bay
  const interiorBayGeo = track(new THREE.BoxGeometry(2.6, 1.65, 0.5));
  const interiorBay = new THREE.Mesh(interiorBayGeo, warmInteriorMat);
  interiorBay.position.set(0, 0.9, 1.85);
  shopGroup.add(interiorBay);

  // Storefront glass door & frame
  const shopGlassGeo = track(new THREE.BoxGeometry(2.45, 1.55, 0.06));
  const shopGlass = new THREE.Mesh(shopGlassGeo, glassMat);
  shopGlass.position.set(0, 0.88, 2.08);
  shopGlass.renderOrder = 2;
  shopGroup.add(shopGlass);

  // Authentic green artificial turf steps (matching real storefront photo)
  for (let s = 0; s < 3; s++) {
    const stepGeo = track(new THREE.BoxGeometry(2.8, 0.14, 0.45));
    const step = new THREE.Mesh(stepGeo, turfMat);
    step.position.set(0, 0.07 + s * 0.1, 2.75 - s * 0.3);
    shopGroup.add(step);
  }

  // Potted plants flanking entrance
  for (const xPos of [-1.62, 1.62]) {
    const planter = createPlanterPot(potMat, leafMat);
    planter.position.set(xPos, 0, 2.55);
    shopGroup.add(planter);
  }

  // Left & Right brushed stainless steel staircases (matching real photo)
  const leftStair = createSideStaircase(steelMat);
  leftStair.position.set(-2.35, 0, 2.05);
  shopGroup.add(leftStair);

  const rightStair = createSideStaircase(steelMat);
  rightStair.position.set(2.35, 0, 2.05);
  shopGroup.add(rightStair);

  // Primary Crimson & Gold Signage Board ("कालका प्रोपर्टीज · 9811120585")
  const mainSignBackingGeo = track(new THREE.BoxGeometry(3.2, 1.05, 0.14));
  const mainSignMaterials = [
    crimsonTrimMat,
    crimsonTrimMat,
    crimsonTrimMat,
    crimsonTrimMat,
    signHindiMat,
    crimsonTrimMat,
  ];
  const mainSign = new THREE.Mesh(mainSignBackingGeo, mainSignMaterials);
  mainSign.position.set(0, 1.82, 2.18);
  tagInteractable(mainSign, 'shop');
  shopGroup.add(mainSign);

  const interiorLight = new THREE.PointLight(0xfbbf24, 1.6, 7, 2);
  interiorLight.position.set(0, 1.35, 2.35);
  shopGroup.add(interiorLight);

  root.add(shopGroup);

  // =========================================================================
  // FIRST FLOOR: VERIFIED BUILDER FLOOR + UPPER KALKA BOARD (y = 2.35)
  // =========================================================================
  const floor1Group = new THREE.Group();
  floor1Group.position.y = 2.35;

  const f1CoreGeo = track(new THREE.BoxGeometry(5.7, 1.75, 4.5));
  const f1Core = new THREE.Mesh(f1CoreGeo, floorHighlightMats.floor1);
  f1Core.position.set(0, 0.875, -0.15);
  f1Core.castShadow = !isSoftwareGl;
  f1Core.receiveShadow = !isSoftwareGl;
  tagInteractable(f1Core, 'floor1');
  floor1Group.add(f1Core);

  // Upper signage board ("KALKA PROPERTIES · SALE · PURCHASE · RENTING")
  const upperSignGeo = track(new THREE.BoxGeometry(2.4, 0.95, 0.12));
  const upperSign = new THREE.Mesh(upperSignGeo, [
    crimsonTrimMat,
    crimsonTrimMat,
    crimsonTrimMat,
    crimsonTrimMat,
    signEnglishMat,
    crimsonTrimMat,
  ]);
  upperSign.position.set(-1.3, 0.9, 2.16);
  tagInteractable(upperSign, 'floor1');
  floor1Group.add(upperSign);

  // Front glass balcony & steel railing
  const f1BalconySlabGeo = track(new THREE.BoxGeometry(3.0, 0.14, 0.85));
  const f1BalconySlab = new THREE.Mesh(f1BalconySlabGeo, darkTrimMat);
  f1BalconySlab.position.set(1.25, 0.07, 2.35);
  floor1Group.add(f1BalconySlab);

  const f1RailGlassGeo = track(new THREE.BoxGeometry(2.9, 0.62, 0.05));
  const f1RailGlass = new THREE.Mesh(f1RailGlassGeo, glassMat);
  f1RailGlass.position.set(1.25, 0.45, 2.72);
  f1RailGlass.renderOrder = 2;
  floor1Group.add(f1RailGlass);

  const f1TopRailGeo = track(new THREE.BoxGeometry(2.96, 0.06, 0.08));
  const f1TopRail = new THREE.Mesh(f1TopRailGeo, steelMat);
  f1TopRail.position.set(1.25, 0.78, 2.72);
  floor1Group.add(f1TopRail);

  const f1WindowGeo = track(new THREE.BoxGeometry(2.2, 1.05, 0.08));
  const f1Window = new THREE.Mesh(f1WindowGeo, glassMat);
  f1Window.position.set(1.25, 0.9, 2.12);
  f1Window.renderOrder = 2;
  floor1Group.add(f1Window);

  root.add(floor1Group);

  // =========================================================================
  // SECOND FLOOR: BUILDER FLOOR WITH FULL BAY BALCONY (y = 4.15)
  // =========================================================================
  const floor2Group = new THREE.Group();
  floor2Group.position.y = 4.15;

  const f2CoreGeo = track(new THREE.BoxGeometry(5.7, 1.75, 4.5));
  const f2Core = new THREE.Mesh(f2CoreGeo, floorHighlightMats.floor2);
  f2Core.position.set(0, 0.875, -0.15);
  f2Core.castShadow = !isSoftwareGl;
  f2Core.receiveShadow = !isSoftwareGl;
  tagInteractable(f2Core, 'floor2');
  floor2Group.add(f2Core);

  // Architectural cornice band
  const f2BandGeo = track(new THREE.BoxGeometry(5.86, 0.14, 4.66));
  const f2Band = new THREE.Mesh(f2BandGeo, darkTrimMat);
  f2Band.position.set(0, 0.07, -0.15);
  floor2Group.add(f2Band);

  // Wide balcony & vertical architectural fins
  const f2BalconyGeo = track(new THREE.BoxGeometry(5.2, 0.14, 0.85));
  const f2Balcony = new THREE.Mesh(f2BalconyGeo, darkTrimMat);
  f2Balcony.position.set(0, 0.07, 2.35);
  floor2Group.add(f2Balcony);

  const f2GlassGeo = track(new THREE.BoxGeometry(5.05, 0.62, 0.05));
  const f2Glass = new THREE.Mesh(f2GlassGeo, glassMat);
  f2Glass.position.set(0, 0.45, 2.72);
  f2Glass.renderOrder = 2;
  floor2Group.add(f2Glass);

  const f2RailGeo = track(new THREE.BoxGeometry(5.12, 0.06, 0.08));
  const f2Rail = new THREE.Mesh(f2RailGeo, steelMat);
  f2Rail.position.set(0, 0.78, 2.72);
  floor2Group.add(f2Rail);

  for (const xWin of [-1.45, 1.45]) {
    const winFrame = new THREE.Mesh(
      track(new THREE.BoxGeometry(1.75, 1.05, 0.1)),
      darkTrimMat
    );
    winFrame.position.set(xWin, 0.92, 2.11);
    floor2Group.add(winFrame);

    const winPane = new THREE.Mesh(
      track(new THREE.BoxGeometry(1.6, 0.92, 0.12)),
      glassMat
    );
    winPane.position.set(xWin, 0.92, 2.12);
    winPane.renderOrder = 2;
    floor2Group.add(winPane);
  }

  root.add(floor2Group);

  // =========================================================================
  // THIRD FLOOR: TOP LEGAL FLOOR + ROOFTOP PERGOLA (y = 5.95)
  // =========================================================================
  const floor3Group = new THREE.Group();
  floor3Group.position.y = 5.95;

  const f3CoreGeo = track(new THREE.BoxGeometry(5.55, 1.72, 4.35));
  const f3Core = new THREE.Mesh(f3CoreGeo, floorHighlightMats.floor3);
  f3Core.position.set(0, 0.86, -0.2);
  f3Core.castShadow = !isSoftwareGl;
  f3Core.receiveShadow = !isSoftwareGl;
  tagInteractable(f3Core, 'floor3');
  floor3Group.add(f3Core);

  const f3RoofSlabGeo = track(new THREE.BoxGeometry(5.9, 0.18, 4.8));
  const f3RoofSlab = new THREE.Mesh(f3RoofSlabGeo, darkTrimMat);
  f3RoofSlab.position.set(0, 1.76, -0.1);
  floor3Group.add(f3RoofSlab);

  // Brass / Gold architectural trim accent
  const f3GoldTrimGeo = track(new THREE.BoxGeometry(5.94, 0.07, 4.84));
  const f3GoldTrim = new THREE.Mesh(f3GoldTrimGeo, goldAccentMat);
  f3GoldTrim.position.set(0, 1.88, -0.1);
  floor3Group.add(f3GoldTrim);

  // Rooftop pergola slats
  const slatGeo = track(new THREE.BoxGeometry(2.6, 0.08, 0.14));
  for (let i = 0; i < 5; i++) {
    const slat = new THREE.Mesh(slatGeo, goldAccentMat);
    slat.position.set(0, 2.15, -1.2 + i * 0.45);
    floor3Group.add(slat);
  }

  const f3CenterGlassGeo = track(new THREE.BoxGeometry(3.2, 1.05, 0.09));
  const f3CenterGlass = new THREE.Mesh(f3CenterGlassGeo, glassMat);
  f3CenterGlass.position.set(0, 0.92, 1.98);
  f3CenterGlass.renderOrder = 2;
  floor3Group.add(f3CenterGlass);

  root.add(floor3Group);

  // =========================================================================
  // MCD 4th & 5th FLOOR PROHIBITION WIREFRAME CAP (Hidden by default)
  // =========================================================================
  const mcdCap = new THREE.Group();
  mcdCap.position.y = 7.75;
  mcdCap.visible = false;

  const capBoxGeo = track(new THREE.BoxGeometry(5.45, 2.8, 4.25));
  const capEdgesGeo = track(new THREE.EdgesGeometry(capBoxGeo));
  const capLineMat = track(
    new THREE.LineBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.9,
    })
  );
  const capLines = new THREE.LineSegments(capEdgesGeo, capLineMat);
  capLines.position.set(0, 1.5, -0.2);
  mcdCap.add(capLines);

  const capFillMat = track(
    new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    })
  );
  const capFill = new THREE.Mesh(capBoxGeo, capFillMat);
  capFill.position.set(0, 1.5, -0.2);
  mcdCap.add(capFill);

  root.add(mcdCap);

  const highlightFloor = (selected: FloorId | null) => {
    (Object.keys(floorHighlightMats) as FloorId[]).forEach((fid) => {
      const mat = floorHighlightMats[fid];
      if (selected === fid) {
        mat.emissive.setHex(0xb91c1c);
        mat.emissiveIntensity = 0.22;
      } else {
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
      }
    });
  };

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
  };

  return {
    root,
    floors: {
      shop: shopGroup,
      floor1: floor1Group,
      floor2: floor2Group,
      floor3: floor3Group,
    },
    mcdCap,
    interactables,
    interiorLight,
    dispose,
    highlightFloor,
  };
}
