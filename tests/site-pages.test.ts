import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('PHASE 11 site integration contracts', () => {
  it('keeps homepage discovery and truthful static sections explicit', () => {
    const page = readFileSync('src/pages/index.astro', 'utf8');
    const footer = readFileSync('src/engine/components/SiteFooter.astro', 'utf8');
    expect(page).toContain('장사하면서 필요한 숫자를 쉽게 계산하세요');
    for (const slug of ['daily-sales-target', 'selling-price', 'price-change', 'discount-profit', 'hiring-profit']) expect(page).toContain(`/tools/${slug}/`);
    for (const text of ['무엇이 궁금한가요?', '계산 방식', '계산의 범위', '브라우저에서 계산합니다']) expect(page).toContain(text);
    for (const text of ['소개', '개인정보처리방침', '문의']) expect(footer).toContain(text);
  });

  it('provides unique static page metadata and navigation without contact fabrication', () => {
    const pages = ['about', 'privacy', 'contact'].map((name) => readFileSync(`src/pages/${name}.astro`, 'utf8'));
    const seo = readFileSync('src/engine/components/SiteSeoHead.astro', 'utf8');
    expect(new Set(pages.map((page) => page.match(/<title>(.*?)<\/title>/)?.[1])).size).toBe(3);
    for (const page of pages) { expect(page).toContain('SiteSeoHead'); expect(page).toContain('SiteHeader'); expect(page).toContain('SiteFooter'); }
    expect(seo).toContain('rel="canonical"');
    expect(pages[2]).toContain('공개 문의 이메일이나 운영 연락처가 지정되어 있지 않습니다');
  });

  it('includes all published site and tool routes in the sitemap', () => {
    const sitemap = readFileSync('src/pages/sitemap.xml.ts', 'utf8');
    for (const route of ['/', '/about/', '/privacy/', '/contact/', 'dailySalesTargetTool', 'sellingPriceTool', 'priceChangeTool', 'discountProfitTool', 'hiringProfitTool']) expect(sitemap).toContain(route);
  });
});
