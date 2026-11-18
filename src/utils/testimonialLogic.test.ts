import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextSlideIndex,
  getPrevSlideIndex,
  getSlideSlice,
  getTotalSlides,
} from './testimonialLogic';

test('computes slide counts and wrap-around navigation indices accurately', () => {
  assert.equal(getTotalSlides(6, 2), 3);
  assert.equal(getTotalSlides(0, 2), 0);

  assert.equal(getNextSlideIndex(0, 3), 1);
  assert.equal(getNextSlideIndex(2, 3), 0);
  assert.equal(getPrevSlideIndex(0, 3), 2);
  assert.equal(getPrevSlideIndex(1, 3), 0);
});

test('slices testimonial items cleanly per slide page', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f'];
  assert.deepEqual(getSlideSlice(items, 0, 2), ['a', 'b']);
  assert.deepEqual(getSlideSlice(items, 1, 2), ['c', 'd']);
  assert.deepEqual(getSlideSlice(items, 2, 2), ['e', 'f']);
});
