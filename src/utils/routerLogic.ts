export type PageId = 'home' | 'services' | 'leadership' | 'tools' | 'contact';

export const PAGE_ROUTES: Record<PageId, string> = {
  home: '/',
  services: '/services',
  leadership: '/leadership',
  tools: '/tools',
  contact: '/contact',
};

export function parseRouteToPage(pathname: string, hash = ''): PageId {
  const normalizedHash = hash.replace(/^#\/?/, '').trim().toLowerCase();
  const normalizedPath = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const candidate = normalizedHash || normalizedPath;

  if (candidate === 'services') return 'services';
  if (candidate === 'leadership') return 'leadership';
  if (candidate === 'tools' || candidate === 'estimator' || candidate === 'rules') {
    return 'tools';
  }
  if (candidate === 'contact' || candidate === 'book') return 'contact';
  return 'home';
}
