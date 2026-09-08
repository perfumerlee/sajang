import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { calculatePriceChange, PriceChangeInputError } from '../src/projects/sajang/tools/price-change/calculator';
import { priceChangeTool } from '../src/projects/sajang/tools/price-change/definition';

const base = { currentPrice: 20_000, currentQuantity: 100, unitCost: 10_000, fixedSellingCost: 1_000, percentageFee: 0.05 };

describe('price-change production calculator', () => {
  it('calculates a price increase and tolerable volume decline', () => {
    const result = calculatePriceChange({ ...base, newPrice: 23_000 });
    expect(result.currentUnitContribution).toBe(8_000);
    expect(result.currentTotalContribution).toBe(800_000);
    expect(result.newUnitContribution).toBe(10_850);
    expect(result.requiredQuantity).toBeCloseTo(73.7327, 4);
    expect(result.quantityChangeRate).toBeCloseTo(-0.26267, 4);
  });

  it('calculates a price decrease and required volume increase', () => {
    const result = calculatePriceChange({ ...base, newPrice: 18_000 });
    expect(result.newUnitContribution).toBe(6_100);
    expect(result.requiredQuantity).toBeCloseTo(131.1475, 4);
    expect(result.quantityChangeRate).toBeCloseTo(0.31147, 4);
  });

  it('explicitly handles the same price', () => {
    const result = calculatePriceChange({ ...base, newPrice: base.currentPrice });
    expect(result.priceDirection).toBe('same');
    expect(result.requiredQuantity).toBe(base.currentQuantity);
    expect(result.quantityChangeRate).toBe(0);
  });

  it('calculates optional scenarios, including zero, while blank remains undefined', () => {
    const scenario = calculatePriceChange({ ...base, newPrice: 23_000, expectedQuantity: 80 });
    expect(scenario.expectedTotalContribution).toBe(868_000);
    expect(scenario.contributionChange).toBe(68_000);
    const zero = calculatePriceChange({ ...base, newPrice: 23_000, expectedQuantity: 0 });
    expect(zero.expectedTotalContribution).toBe(0);
    expect(zero.contributionChange).toBe(-800_000);
    expect(calculatePriceChange({ ...base, newPrice: 23_000 }).expectedTotalContribution).toBeUndefined();
  });

  it('rejects non-positive comparison bases and invalid boundaries', () => {
    expect(() => calculatePriceChange({ ...base, currentQuantity: 0, newPrice: 23_000 })).toThrow('INVALID_CURRENT_QUANTITY');
    expect(() => calculatePriceChange({ ...base, currentPrice: 0, newPrice: 23_000 })).toThrow('INVALID_CURRENT_PRICE');
    expect(() => calculatePriceChange({ ...base, newPrice: 0 })).toThrow('INVALID_NEW_PRICE');
    expect(() => calculatePriceChange({ ...base, percentageFee: 1, newPrice: 23_000 })).toThrow('INVALID_PERCENTAGE_FEE');
    expect(() => calculatePriceChange({ ...base, expectedQuantity: -1, newPrice: 23_000 })).toThrow('INVALID_EXPECTED_QUANTITY');
    expect(() => calculatePriceChange({ ...base, unitCost: 9_000, fixedSellingCost: 10_000, newPrice: 23_000 })).toThrow('CURRENT_CONTRIBUTION_NOT_POSITIVE');
  });

  it('rejects zero or negative new contribution without a break-even quantity', () => {
    expect(() => calculatePriceChange({ ...base, newPrice: 11_000 })).toThrow('NEW_CONTRIBUTION_NOT_POSITIVE');
    expect(() => calculatePriceChange({ ...base, newPrice: 10_000 })).toThrow('NEW_CONTRIBUTION_NOT_POSITIVE');
  });

  it('protects non-finite and finite-overflow paths', () => {
    expect(() => calculatePriceChange({ ...base, newPrice: Number.NaN })).toThrow('NON_FINITE_INPUT');
    expect(() => calculatePriceChange({ currentPrice: 1e308, currentQuantity: 1e308, unitCost: 0, fixedSellingCost: 0, percentageFee: 0, newPrice: 1e308 })).toThrow(PriceChangeInputError);
  });

  it('keeps production parity, static contract, and sitemap inclusion explicit', () => {
    const definition = readFileSync('src/projects/sajang/tools/price-change/definition.ts', 'utf8');
    const page = readFileSync('src/pages/tools/price-change.astro', 'utf8');
    const sitemap = readFileSync('src/pages/sitemap.xml.ts', 'utf8');
    const client = readFileSync('src/projects/sajang/tools/price-change/client.ts', 'utf8');
    for (const section of ['shortAnswer', 'definition', 'howItWorks', 'formula', 'example', 'limitations', 'faq', 'relatedDecisions', 'sources']) expect(definition).toContain(section);
    expect(priceChangeTool.knowledge.example.result.requiredQuantity).toBe('74개');
    expect(page).toContain('ToolKnowledgePage');
    expect(definition).toContain('가격 올려도 될까?');
    expect(page).toContain('현재 총 남는 금액 대비 증감액');
    expect(client).toContain('setFiniteResult');
    expect(client).toContain('aria-describedby');
    expect(sitemap).toContain('priceChangeTool');
  });
});
