import { PageId } from '../components/Navbar';

export interface RouteState {
  page: PageId;
  projectId: string | null;
}

const PAGE_IDS: PageId[] = ['overview', 'experience', 'skills', 'projects', 'contact'];

export function parseHash(hash: string = window.location.hash): RouteState {
  const raw = hash.replace(/^#\/?/, '').trim();
  if (!raw) return { page: 'overview', projectId: null };

  const [pageSeg, maybeProjectId] = raw.split('/');
  const page = (PAGE_IDS.includes(pageSeg as PageId) ? pageSeg : 'overview') as PageId;
  const projectId =
    page === 'projects' && maybeProjectId ? decodeURIComponent(maybeProjectId) : null;

  return { page, projectId };
}

export function buildHash(page: PageId, projectId?: string | null): string {
  if (page === 'projects' && projectId) {
    return `#/projects/${encodeURIComponent(projectId)}`;
  }
  return `#/${page}`;
}
