import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { calculateSellingPriceModeA, calculateSellingPriceModeB, SellingPriceInputError } from '../src/projects/sajang/tools/selling-price/calculator';
import { sellingPriceTool } from '../src/projects/sajang/tools/selling-price/definition';

describe('selling-price production calculator', () => {
  it('calculates Mode A and preserves display parity', () => {
    const result = calculateSellingPriceModeA({ unitCost: 10_000, fixedSellingCost: 2_000, percentageFee: 0.03, targetContributionRate: 0.4 });
    expect(result.sellingPrice).toBeCloseTo(21_052.631578, 5);
    expect(Math.round(result.sellingPrice)).toBe(21_053);
    expect(sellingPriceTool.knowledge.example.result.sellingPrice).toBe('21,053원');
  });

  it('calculates Mode B contribution, fee, and rate', () => {
    const result = calculateSellingPriceModeB({ sellingPrice: 20_000, unitCost: 10_000, fixedSellingCost: 2_000, percentageFee: 0.03 });
    expect(result.fee).toBe(600);
    expect(result.unitContribution).toBe(7_400);
    expect(result.contributionRate).toBeCloseTo(0.37);
  });

  it('rejects combined rates at or above one and invalid boundaries', () => {
    expect(() => calculateSellingPriceModeA({ unitCost: 0, fixedSellingCost: 0, percentageFee: 0.6, targetContributionRate: 0.4 })).toThrow('COMBINED_RATE_TOO_HIGH');
    expect(() => calculateSellingPriceModeA({ unitCost: -1, fixedSellingCost: 0, percentageFee: 0, targetContributionRate: 0 })).toThrow('INVALID_UNIT_COST');
    expect(() => calculateSellingPriceModeA({ unitCost: 0, fixedSellingCost: 0, percentageFee: 1, targetContributionRate: 0 })).toThrow('INVALID_PERCENTAGE_FEE');
    expect(() => calculateSellingPriceModeB({ sellingPrice: 0, unitCost: 0, fixedSellingCost: 0, percentageFee: 0 })).toThrow('INVALID_SELLING_PRICE');
    expect(() => calculateSellingPriceModeB({ sellingPrice: 1, unitCost: 0, fixedSellingCost: 0, percentageFee: -0.01 })).toThrow('INVALID_PERCENTAGE_FEE');
  });

  it('rejects non-finite inputs and finite inputs that overflow', () => {
    expect(() => calculateSellingPriceModeA({ unitCost: Number.NaN, fixedSellingCost: 0, percentageFee: 0, targetContributionRate: 0 })).toThrow(SellingPriceInputError);
    expect(() => calculateSellingPriceModeA({ unitCost: 1e308, fixedSellingCost: 1e308, percentageFee: 0, targetContributionRate: 0 })).toThrow('NON_FINITE_RESULT');
    expect(() => calculateSellingPriceModeB({ sellingPrice: 1e308, unitCost: -1e308, fixedSellingCost: 0, percentageFee: 0 })).toThrow('INVALID_UNIT_COST');
  });

  it('keeps static content, client formatting, and sitemap inclusion contracts', () => {
    const page = readFileSync('src/pages/tools/selling-price.astro', 'utf8');
    const client = readFileSync('src/projects/sajang/tools/selling-price/client.ts', 'utf8');
    const sitemap = readFileSync('src/pages/sitemap.xml.ts', 'utf8');
    for (const section of ['shortAnswer', 'definition', 'howItWorks', 'formula', 'example', 'limitations', 'faq', 'relatedDecisions', 'sources']) expect(readFileSync('src/projects/sajang/tools/selling-price/definition.ts', 'utf8')).toContain(section);
    expect(page).toContain('ToolKnowledgePage');
    expect(page).toContain('계산된 판매가격');
    expect(page).toContain('예상 남는 금액');
    expect(page).toContain('value={formatWon(exampleResult.sellingPrice).replace(/원$/, \'\')}');
    expect(client).toContain('setFiniteResult');
    expect(client).toContain('clear(form)');
    expect(sitemap).toContain('sellingPriceTool');
  });
});
