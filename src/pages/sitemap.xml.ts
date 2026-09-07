import type { APIRoute } from 'astro';
import { dailySalesTargetTool } from '../projects/sajang/tools/daily-sales-target/definition';
import { sellingPriceTool } from '../projects/sajang/tools/selling-price/definition';
import { priceChangeTool } from '../projects/sajang/tools/price-change/definition';
import { discountProfitTool } from '../projects/sajang/tools/discount-profit/definition';
import { toCanonicalUrl } from '../engine/seo';

const siteUrl = import.meta.env.PUBLIC_SITE_URL;
const basePath = import.meta.env.BASE_URL || '/';

export const GET: APIRoute = () => {
  const tools = [dailySalesTargetTool, sellingPriceTool, priceChangeTool, discountProfitTool].filter((tool) => tool.identity.status === 'published');
  const urls = tools.map((tool) => toCanonicalUrl({
    tool,
    projectName: '사장도구',
    categoryName: '매출',
    siteUrl,
    basePath,
  }, `/tools/${tool.identity.slug}/`));
  const body = urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
