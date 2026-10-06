// Resolve a file in /public against the site's base path (the site is served from /SpinPixUK/ on GitHub Pages).
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
