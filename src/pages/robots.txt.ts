import type { APIRoute } from 'astro';

const siteUrl = import.meta.env.PUBLIC_SITE_URL;
const basePath = import.meta.env.BASE_URL || '/';
const sitemap = siteUrl ? `${siteUrl.replace(/\/+$/, '')}${basePath === '/' ? '' : basePath.replace(/\/+$/, '')}/sitemap.xml` : `${basePath === '/' ? '' : basePath.replace(/\/+$/, '')}/sitemap.xml`;

export const GET: APIRoute = () => new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`, {
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
});
