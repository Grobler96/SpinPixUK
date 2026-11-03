import { site } from '@/config/site';

export type PortalEvent = {
  code: string;
  title: string;
  eventDate: string;
  guestLink: string;
  galleryLink: string;
  galleryPassword: string;
  embedGallery: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
export type EventFields = Omit<PortalEvent, 'code' | 'createdAt' | 'updatedAt'>;

export const API_URL = (((import.meta.env.VITE_API_URL as string | undefined) || site.apiUrl) as string).replace(/\/+$/, '');
export const apiConfigured = API_URL !== '';

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

async function call<T>(path: string, opts: { method?: string; body?: unknown; token?: string } = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: opts.method ?? 'GET',
      headers: {
        ...(opts.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
      },
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new ApiError(0, 'We couldn’t reach the server. Please check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, (data as { error?: string }).error ?? 'Something went wrong. Please try again.');
  return data as T;
}

/* customer */
export const portalLogin = (code: string, password: string) =>
  call<{ token: string; event: PortalEvent }>('/api/portal/login', { method: 'POST', body: { code, password } });
export const portalEvent = (token: string) => call<{ event: PortalEvent }>('/api/portal/event', { token });

/* admin */
export const adminLogin = (password: string) => call<{ token: string }>('/api/admin/login', { method: 'POST', body: { password } });
export const adminList = (token: string) => call<{ events: PortalEvent[] }>('/api/admin/events', { token });
export const adminCreate = (token: string, fields: EventFields) =>
  call<{ event: PortalEvent; customerPassword: string }>('/api/admin/events', { method: 'POST', body: fields, token });
export const adminUpdate = (token: string, code: string, fields: EventFields) =>
  call<{ event: PortalEvent }>(`/api/admin/events/${code}`, { method: 'PUT', body: fields, token });
export const adminResetPassword = (token: string, code: string) =>
  call<{ event: PortalEvent; customerPassword: string }>(`/api/admin/events/${code}/reset-password`, { method: 'POST', token });
export const adminDelete = (token: string, code: string) => call<{ ok: true }>(`/api/admin/events/${code}`, { method: 'DELETE', token });

/** Where customers log in, as a full address (works under the GitHub Pages sub-path too). */
export const portalUrl = () => `${window.location.origin}${import.meta.env.BASE_URL}my-event`;
