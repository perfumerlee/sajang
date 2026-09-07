import type { ToolDefinition } from './contracts';

export interface SeoPageContext {
  siteUrl?: string;
  basePath: string;
  projectName: string;
  categoryName: string;
  tool: ToolDefinition;
}

export const normalizeSiteUrl = (siteUrl?: string): string | undefined => {
  if (!siteUrl) return undefined;
  return siteUrl.replace(/\/+$/, '');
};

export const withBasePath = (basePath: string, path: string): string => {
  const base = basePath === '/' ? '' : basePath.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}` || '/';
};

export const toCanonicalUrl = (context: SeoPageContext, path: string): string => {
  const pathname = withBasePath(context.basePath, path);
  return context.siteUrl ? `${normalizeSiteUrl(context.siteUrl)}${pathname}` : pathname;
};

export const shouldIndex = (tool: ToolDefinition): boolean => tool.identity.status === 'published';

export const buildStructuredData = (context: SeoPageContext, canonical: string): Record<string, unknown> => {
  const { tool } = context;
  const pageId = `${canonical}#webpage`;
  const appId = `${canonical}#application`;
  const breadcrumbId = `${canonical}#breadcrumb`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${context.siteUrl ?? context.basePath}#website`,
        name: context.projectName,
        url: context.siteUrl ?? context.basePath,
        inLanguage: 'ko-KR',
      },
      {
        '@type': 'WebPage',
        '@id': pageId,
        url: canonical,
        name: tool.search.title,
        description: tool.search.description,
        isPartOf: { '@id': `${context.siteUrl ?? context.basePath}#website` },
        breadcrumb: { '@id': breadcrumbId },
        inLanguage: 'ko-KR',
      },
      {
        '@type': 'WebApplication',
        '@id': appId,
        name: tool.search.name,
        description: tool.search.description,
        url: canonical,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        isPartOf: { '@id': pageId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: context.projectName, item: toCanonicalUrl(context, '/') },
          { '@type': 'ListItem', position: 2, name: `${context.categoryName} · ${tool.search.name}`, item: canonical },
        ],
      },
    ],
  };
};
