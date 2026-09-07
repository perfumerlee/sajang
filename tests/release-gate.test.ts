import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('PHASE 16 release content semantics', () => {
  it('marks fixed worked-example values in static quick answers as examples', () => {
    for (const tool of ['daily-sales-target', 'selling-price', 'price-change', 'discount-profit']) {
      const source = readFileSync(`src/projects/sajang/tools/${tool}/definition.ts`, 'utf8');
      expect(source).toContain('shortAnswer');
      expect(source).toContain('예를 들어');
      expect(source).toContain('실제 결과는 계산기에 입력한 조건에 따라 달라집니다.');
    }
    const hiring = readFileSync('src/projects/sajang/tools/hiring-profit/definition.ts', 'utf8');
    expect(hiring).toContain('입력하면');
  });
});
