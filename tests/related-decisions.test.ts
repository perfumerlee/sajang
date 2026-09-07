import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { resolveRelatedTools, sajangTools } from '../src/projects/sajang/tools/registry';

describe('PHASE 12 related decision graph', () => {
  const expected: Record<string, string[]> = {
    'daily-sales-target': ['selling-price', 'price-change', 'hiring-profit'],
    'selling-price': ['price-change', 'discount-profit'],
    'price-change': ['discount-profit', 'daily-sales-target', 'selling-price'],
    'discount-profit': ['price-change', 'selling-price'],
    'hiring-profit': ['daily-sales-target', 'price-change'],
  };

  it('resolves the approved published graph without self or duplicate targets', () => {
    for (const tool of sajangTools) {
      const ids = resolveRelatedTools(tool).map((related) => related.identity.id);
      expect(ids).toEqual(expected[tool.identity.id]);
      expect(ids).not.toContain(tool.identity.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(resolveRelatedTools(tool).every((related) => related.identity.status === 'published')).toBe(true);
    }
  });

  it('keeps related navigation static, base-path-aware, and free of query data transfer', () => {
    const renderer = readFileSync('src/engine/components/ToolKnowledgePage.astro', 'utf8');
    expect(renderer).toContain('engine-related-decisions');
    expect(renderer).toContain('import.meta.env.BASE_URL');
    expect(renderer).toContain('tools/${slug}/');
    expect(renderer).not.toContain('location.search');
    expect(renderer).not.toContain('URLSearchParams');
  });
});
