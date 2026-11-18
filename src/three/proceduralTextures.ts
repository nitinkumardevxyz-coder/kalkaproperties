import * as THREE from 'three';

export function createStoneBumpTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);

    // Subtle stone grain
    for (let i = 0; i < 1600; i++) {
      const x = (i * 73) % 256;
      const y = (i * 137) % 256;
      const v = 112 + ((i * 29) % 36);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 2, 2);
    }

    // Architectural panel seam lines
    ctx.strokeStyle = '#606060';
    ctx.lineWidth = 2;
    for (let y = 0; y < 256; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.anisotropy = maxAnisotropy;
  return texture;
}

export function createShopSignTexture(
  variant: 'hindi' | 'english',
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    if (variant === 'hindi') {
      // Authentic crimson board with golden/white typography matching Kalka Properties storefront
      ctx.fillStyle = '#B91C1C';
      ctx.fillRect(0, 0, 512, 192);

      ctx.strokeStyle = '#FBBF24';
      ctx.lineWidth = 6;
      ctx.strokeRect(8, 8, 496, 176);

      ctx.fillStyle = '#FEF08A';
      ctx.font = 'bold 48px "Noto Sans Devanagari", "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('कालका प्रोपर्टीज', 256, 86);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 26px "JetBrains Mono", monospace';
      ctx.fillText('9811120585 · 9899955243', 256, 146);
    } else {
      // Upper services signage board
      ctx.fillStyle = '#991B1B';
      ctx.fillRect(0, 0, 512, 192);

      ctx.fillStyle = '#FDE047';
      ctx.font = 'bold 34px "Bricolage Grotesque", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('KALKA PROPERTIES', 256, 56);

      ctx.fillStyle = '#0F766E';
      ctx.fillRect(28, 76, 456, 42);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('SALE · PURCHASE · RENTING', 256, 104);

      ctx.fillStyle = '#F8FAFC';
      ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('SHOP NO. 10 · MADANGIR · LOAN & RERA', 256, 158);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 124);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createGridPlazaTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#14181F';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 2;
    const step = 64;
    for (let i = 0; i <= 512; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  texture.anisotropy = maxAnisotropy;
  return texture;
}
