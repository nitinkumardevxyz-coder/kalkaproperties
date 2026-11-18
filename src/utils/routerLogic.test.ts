import test from 'node:test';
import assert from 'node:assert/strict';
import { PAGE_ROUTES, parseRouteToPage } from './routerLogic';

test('parses valid multi-page pathnames and hash aliases cleanly', () => {
  assert.equal(parseRouteToPage('/'), 'home');
  assert.equal(parseRouteToPage('/services'), 'services');
  assert.equal(parseRouteToPage('/leadership/'), 'leadership');
  assert.equal(parseRouteToPage('/tools'), 'tools');
  assert.equal(parseRouteToPage('/contact'), 'contact');
  assert.equal(parseRouteToPage('/', '#estimator'), 'tools');
  assert.equal(parseRouteToPage('/unknown-route'), 'home');
});

test('defines distinct URL routes for all five pages', () => {
  const routes = Object.values(PAGE_ROUTES);
  assert.equal(new Set(routes).size, 5);
});
