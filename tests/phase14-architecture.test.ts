import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { createAnalytics } from '../src/engine/analytics';
import { createProjectStorage } from '../src/engine/storage';
import { validateProjectDefinition } from '../src/engine/validation';
import { metersToCentimeters, } from './fixtures/unit-converter/calculator';
import { unitConverterProject, unitConverterTool } from './fixtures/unit-converter/definition';

describe('PHASE 14 cross-project architecture gate', () => {
  it('validates and calculates an independent fixture project', () => {
    validateProjectDefinition(unitConverterProject, (id) => id === 'meters-to-centimeters' ? (input: unknown) => metersToCentimeters(input as number) : undefined);
    expect(metersToCentimeters(1)).toBe(100);
    expect(unitConverterTool.knowledge.formula).toContain('centimeters');
    expect(unitConverterTool.knowledge.example.result.centimeters).toBe(100);
  });

  it('keeps Engine and fixture source independent from Sajang source', () => {
    const engineFiles = ['src/engine/contracts.ts', 'src/engine/validation.ts', 'src/engine/storage.ts', 'src/engine/analytics.ts', 'src/engine/components/ToolKnowledgePage.astro', 'src/engine/components/AdSlot.astro'];
    const fixtureFiles = ['tests/fixtures/unit-converter/calculator.ts', 'tests/fixtures/unit-converter/definition.ts'];
    for (const file of [...engineFiles, ...fixtureFiles]) expect(readFileSync(file, 'utf8')).not.toMatch(/src\/projects\/sajang|daily-sales-target|selling-price|price-change|discount-profit|hiring-profit|사장도구|매출|기여금|할인|직원|장사/);
  });

  it('uses independent storage namespace and generic analytics identity', () => {
    const storage = new Map<string, string>(); const fake = { get length() { return storage.size; }, getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => storage.set(key, value), removeItem: (key: string) => storage.delete(key), key: (i: number) => [...storage.keys()][i] ?? null };
    const fixtureStorage = createProjectStorage(unitConverterProject.id, fake); const sajangStorage = createProjectStorage('sajang', fake);
    fixtureStorage.set('tool', 'unit', { meters: 1 }); expect(fixtureStorage.get('tool', 'unit')).toEqual({ meters: 1 }); expect(sajangStorage.get('tool', 'unit')).toBeUndefined();
    const dispatch = vi.fn(); createAnalytics({ enabled: true, adapter: { dispatch } }).track('tool_calculate', { projectId: unitConverterProject.id, categoryId: 'length', toolId: unitConverterTool.identity.id }); expect(dispatch).toHaveBeenCalledWith('tool_calculate', { projectId: 'unit-fixture', categoryId: 'length', toolId: 'length-converter', destinationToolId: undefined });
  });

  it('keeps fixture absent from Sajang production discovery and sitemap', () => {
    expect(readFileSync('src/pages/index.astro', 'utf8')).not.toContain('length-converter');
    expect(readFileSync('src/pages/sitemap.xml.ts', 'utf8')).not.toContain('unit-fixture');
    expect(readFileSync('src/engine/components/AdSlot.astro', 'utf8')).toContain("enabled ?");
  });
});
