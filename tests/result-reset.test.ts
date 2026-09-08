import { describe, it, expect } from 'vitest';
import { clearResultValues, setFiniteResult } from '../src/engine/result-runtime';
import { calculateSellingPriceModeB } from '../src/projects/sajang/tools/selling-price/calculator';

describe('result reset and recalculation', () => {
  it('preserves the numeric child so repeated calculations can update it', () => {
    const number = { textContent: '8,421', querySelector: () => null };
    let removed = false;
    const parent = {
      querySelector: () => removed ? null : number,
      set textContent(value: string) { removed = true; },
    };
    const root = { querySelectorAll: () => [parent, number] } as unknown as ParentNode;
    for (let i = 0; i < 3; i++) {
      clearResultValues(root);
      expect(removed).toBe(false);
      expect(number.textContent).toBe('—');
      const result = calculateSellingPriceModeB({ sellingPrice: 2000, unitCost: 950, fixedSellingCost: 0, percentageFee: 0.11 });
      expect(result).toEqual({ unitContribution: 830, contributionRate: 0.415, fee: 220 });
      setFiniteResult(number as unknown as HTMLElement, result.unitContribution, String);
      expect(number.textContent).toBe('830');
    }
  });
});
