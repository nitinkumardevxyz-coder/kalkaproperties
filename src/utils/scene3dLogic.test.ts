import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CAMERA_PRESETS,
  computeFloorTargetY,
  computeMcdCapTargetY,
  computePresetFraming,
  FLOOR_SPECS,
} from './scene3dLogic';

test('computes unexploded and exploded floor elevations monotonically', () => {
  const unexploded = [
    computeFloorTargetY('shop', false),
    computeFloorTargetY('floor1', false),
    computeFloorTargetY('floor2', false),
    computeFloorTargetY('floor3', false),
    computeMcdCapTargetY(false),
  ];

  const exploded = [
    computeFloorTargetY('shop', true),
    computeFloorTargetY('floor1', true),
    computeFloorTargetY('floor2', true),
    computeFloorTargetY('floor3', true),
    computeMcdCapTargetY(true),
  ];

  for (let i = 1; i < unexploded.length; i++) {
    assert.ok(unexploded[i] > unexploded[i - 1], 'unexploded floors increase in height');
    assert.ok(exploded[i] > exploded[i - 1], 'exploded floors increase in height');
    assert.ok(
      exploded[i] - exploded[i - 1] > unexploded[i] - unexploded[i - 1],
      'exploded view strictly widens inter-floor spacing'
    );
  }
});

test('keeps shop base fixed during exploded view while upper floors lift cleanly', () => {
  assert.equal(computeFloorTargetY('shop', false), FLOOR_SPECS.shop.baseY);
  assert.equal(computeFloorTargetY('shop', true), FLOOR_SPECS.shop.baseY);
  assert.ok(computeFloorTargetY('floor3', true) > computeFloorTargetY('floor3', false));
});

test('defines distinct camera presets with valid coordinates', () => {
  const keys = Object.keys(CAMERA_PRESETS) as Array<keyof typeof CAMERA_PRESETS>;
  assert.deepEqual(keys.sort(), ['isometric', 'shopfront', 'top']);
  for (const key of keys) {
    assert.equal(CAMERA_PRESETS[key].position.length, 3);
    assert.equal(CAMERA_PRESETS[key].target.length, 3);
  }
});

test('computePresetFraming expands distance and target height for exploded and MCD cap views', () => {
  const base = computePresetFraming('isometric', false, false);
  const explodedOnly = computePresetFraming('isometric', true, false);
  const both = computePresetFraming('isometric', true, true);

  assert.deepEqual(base.position, CAMERA_PRESETS.isometric.position);
  assert.ok(explodedOnly.target[1] > base.target[1]);
  assert.ok(both.target[1] > explodedOnly.target[1]);
  assert.ok(both.position[2] > explodedOnly.position[2]);
});
