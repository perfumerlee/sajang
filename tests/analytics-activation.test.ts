import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

describe('Sajang post-release analytics activation', () => {
  it('keeps the GTM installation in Sajang and installs it once through the shared page integration', () => {
    const provider = read('src/projects/sajang/analytics/provider.ts');
    const integration = read('src/projects/sajang/analytics/SajangAnalytics.astro');
    const head = read('src/projects/sajang/analytics/SajangGtmHead.astro');
    const header = read('src/engine/components/SiteHeader.astro');
    expect(provider).toContain('GTM-WTHLSBXR');
    expect(head).toContain('googletagmanager.com/gtm.js');
    expect(integration).toContain('googletagmanager.com/ns.html');
    expect(head.match(/googletagmanager\.com\/gtm\.js/g)).toHaveLength(1);
    expect(header).not.toContain('SajangAnalytics');
  });

  it('declares only identity events and keeps calculator values out of analytics sources', () => {
    const provider = read('src/projects/sajang/analytics/provider.ts');
    const integration = read('src/projects/sajang/analytics/SajangAnalytics.astro');
    const clients = ['daily-sales-target', 'selling-price', 'price-change', 'discount-profit', 'hiring-profit'].map((tool) => read(`src/projects/sajang/tools/${tool}/client.ts`)).join('\n');
    expect(provider).toContain('project_id');
    expect(provider).toContain('category_id');
    expect(provider).toContain('tool_id');
    expect(provider).toContain('destination_tool_id');
    expect(integration).toContain("'tool_view'");
    expect(integration).toContain("'related_tool_click'");
    expect(clients).toContain("'tool_calculate'");
    expect(provider).not.toMatch(/unitCost|sellingPrice|fixedSellingCost|targetProfit|discountRate|variableRate|calculation/);
  });

  it('keeps advertising disabled and activates Sajang analytics flags only', () => {
    const definitions = ['daily-sales-target', 'selling-price', 'price-change', 'discount-profit', 'hiring-profit'].map((tool) => read(`src/projects/sajang/tools/${tool}/definition.ts`)).join('\n');
    expect(definitions).toMatch(/analytics: true/);
    expect(definitions).not.toMatch(/ads: true|localStorage: true|remoteData: true/);
    expect(read('src/projects/sajang/analytics/provider.ts')).not.toMatch(/G-|gtag|adsbygoogle|ca-pub-/);
  });
});
