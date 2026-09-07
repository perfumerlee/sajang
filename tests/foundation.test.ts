import { describe, expect, it } from 'vitest';
import type { ProjectDefinition } from '../src/engine/contracts';
import { DefinitionValidationError, validateProjectDefinition } from '../src/engine/validation';
import { calculateDailySalesTarget, DailySalesTargetInputError } from '../src/projects/sajang/tools/daily-sales-target/calculator';
import { dailySalesTargetTool } from '../src/projects/sajang/tools/daily-sales-target/definition';

const validTool = {
  identity: { id: 'unit-tool', slug: 'unit-tool', category: 'general', status: 'published' as const, version: '0.1.0' },
  search: { question: 'How much?', name: 'Unit Tool', title: 'Unit Tool', description: 'A useful unit tool.' },
  knowledge: {
    shortAnswer: 'A short answer.', definition: 'A definition.', howItWorks: 'It works.', formula: 'a + b',
    example: { title: 'Example', inputs: { value: 1 }, result: { total: 2 }, explanation: 'Verified.' },
    limitations: ['Limited example'], faq: [{ question: 'Why?', answer: 'Because.' }],
  },
  interaction: { inputs: [], outputs: [], calculator: 'unit-calculator' },
  relations: { relatedTools: [], sources: ['source-1'] },
  maintenance: { reviewedAt: '2026-09-08' },
};

function project(overrides: Partial<ProjectDefinition> = {}): ProjectDefinition {
  return {
    id: 'test-project', name: 'Test Project', description: 'Fixture project', locale: 'en', baseUrl: '/', owner: 'Test',
    navigation: [], features: { localStorage: false, analytics: false, ads: false, remoteData: false }, theme: { id: 'plain' },
    sources: [{ id: 'source-1', title: 'Test source' }],
    categories: [{ id: 'general', name: 'General', question: 'What?', description: 'General tools', tools: ['unit-tool'], status: 'published' }],
    tools: [validTool], ...overrides,
  };
}

const resolver = (id: string) => id === 'unit-calculator' ? () => ({ total: 2 }) : undefined;

describe('foundation', () => {
  it('has a working test environment', () => {
    expect(true).toBe(true);
  });

  it('accepts a valid project definition', () => {
    expect(() => validateProjectDefinition(project(), resolver)).not.toThrow();
  });

  it('rejects duplicate IDs and slugs', () => {
    const duplicate = { ...validTool, identity: { ...validTool.identity, id: 'unit-tool-2', slug: 'unit-tool' } };
    expect(() => validateProjectDefinition(project({ tools: [validTool, duplicate] }), resolver)).toThrow(/duplicate tool slug/);
  });

  it('rejects a missing related tool', () => {
    const tool = { ...validTool, relations: { ...validTool.relations, relatedTools: [{ toolId: 'missing-tool' }] } };
    expect(() => validateProjectDefinition(project({ tools: [tool] }), resolver)).toThrow(/related tool 'missing-tool'/);
  });

  it('rejects an unresolved source', () => {
    const tool = { ...validTool, relations: { ...validTool.relations, sources: ['missing-source'] } };
    expect(() => validateProjectDefinition(project({ tools: [tool] }), resolver)).toThrow(/source 'missing-source'/);
  });

  it('rejects an invalid published tool', () => {
    const tool = { ...validTool, search: { ...validTool.search, title: '' }, maintenance: { reviewedAt: '2026-02-30' } };
    expect(() => validateProjectDefinition(project({ tools: [tool] }), resolver)).toThrow(DefinitionValidationError);
  });

  it('matches the locked daily sales target vector', () => {
    const result = calculateDailySalesTarget({ fixedCost: 4_000_000, variableRate: 0.35, targetProfit: 3_000_000, operatingDays: 26 });
    expect(result.contributionRate).toBe(0.65);
    expect(result.targetMonthly).toBeCloseTo(10_769_230.769230, 5);
    expect(result.targetDaily).toBeCloseTo(414_201.183431, 5);
    expect(Math.round(result.targetMonthly)).toBe(10_769_231);
    expect(Math.round(result.targetDaily)).toBe(414_201);
  });

  it('calculates optional customer count with ceiling display semantics', () => {
    const result = calculateDailySalesTarget({ fixedCost: 4_000_000, variableRate: 0.35, targetProfit: 3_000_000, operatingDays: 26, averageOrderValue: 10_000 });
    expect(result.customersNeeded).toBeCloseTo(41.420118, 6);
    expect(Math.ceil(result.customersNeeded ?? 0)).toBe(42);
  });

  it.each([
    ['fixedCost', { fixedCost: -1, variableRate: 0, operatingDays: 1, targetProfit: 0 }],
    ['variableRate', { fixedCost: 0, variableRate: 1, operatingDays: 1, targetProfit: 0 }],
    ['operatingDays', { fixedCost: 0, variableRate: 0, operatingDays: 0, targetProfit: 0 }],
    ['targetProfit', { fixedCost: 0, variableRate: 0, operatingDays: 1, targetProfit: -1 }],
  ])('rejects invalid %s input', (_, input) => {
    expect(() => calculateDailySalesTarget(input)).toThrow(DailySalesTargetInputError);
  });

  it('allows the zero-cost zero-profit case and rejects invalid optional order value', () => {
    expect(calculateDailySalesTarget({ fixedCost: 0, variableRate: 0, operatingDays: 1, targetProfit: 0 }).targetDaily).toBe(0);
    expect(() => calculateDailySalesTarget({ fixedCost: 0, variableRate: 0, operatingDays: 1, targetProfit: 0, averageOrderValue: 0 })).toThrow('INVALID_AVERAGE_ORDER_VALUE');
    expect(() => calculateDailySalesTarget({ fixedCost: Number.NaN, variableRate: 0, operatingDays: 1, targetProfit: 0 })).toThrow('NON_FINITE_INPUT');
  });

  it('rejects finite inputs that overflow and rejects tiny order values that overflow customer count', () => {
    expect(() => calculateDailySalesTarget({ fixedCost: 1e308, variableRate: 0.35, operatingDays: 26, targetProfit: 1e308 })).toThrow('NON_FINITE_RESULT');
    expect(() => calculateDailySalesTarget({ fixedCost: 4_000_000, variableRate: 0.35, operatingDays: 26, targetProfit: 3_000_000, averageOrderValue: Number.MIN_VALUE })).toThrow('NON_FINITE_RESULT');
  });

  it('keeps validation boundaries and verified example parity explicit', () => {
    expect(() => calculateDailySalesTarget({ fixedCost: 0, variableRate: 0.999999, operatingDays: 31, targetProfit: 0 })).not.toThrow();
    expect(() => calculateDailySalesTarget({ fixedCost: 0, variableRate: 1, operatingDays: 31, targetProfit: 0 })).toThrow('INVALID_VARIABLE_RATE');
    expect(() => calculateDailySalesTarget({ fixedCost: 0, variableRate: 0, operatingDays: 1.5, targetProfit: 0 })).toThrow('INVALID_OPERATING_DAYS');
    const example = calculateDailySalesTarget({ fixedCost: 4_000_000, variableRate: 0.35, operatingDays: 26, targetProfit: 3_000_000 });
    expect(dailySalesTargetTool.knowledge.example.result.targetMonthly).toBe(`${Math.round(example.targetMonthly).toLocaleString('ko-KR')}원`);
    expect(dailySalesTargetTool.knowledge.example.result.targetDaily).toBe(`${Math.round(example.targetDaily).toLocaleString('ko-KR')}원`);
  });
});
