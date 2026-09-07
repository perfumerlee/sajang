import type { PureCalculator } from '../../../../engine/calculator';

export interface SellingPriceModeAInput { unitCost: number; fixedSellingCost: number; percentageFee: number; targetContributionRate: number; }
export interface SellingPriceModeAResult { sellingPrice: number; contributionRate: number; }
export interface SellingPriceModeBInput { sellingPrice: number; unitCost: number; fixedSellingCost: number; percentageFee: number; }
export interface SellingPriceModeBResult { unitContribution: number; contributionRate: number; fee: number; }
export type SellingPriceErrorCode = 'INVALID_UNIT_COST' | 'INVALID_FIXED_SELLING_COST' | 'INVALID_PERCENTAGE_FEE' | 'INVALID_TARGET_CONTRIBUTION_RATE' | 'INVALID_SELLING_PRICE' | 'COMBINED_RATE_TOO_HIGH' | 'NON_FINITE_INPUT' | 'NON_FINITE_RESULT';

export class SellingPriceInputError extends Error {
  constructor(public readonly code: SellingPriceErrorCode) { super(code); this.name = 'SellingPriceInputError'; }
}

const finite = (value: number): void => { if (!Number.isFinite(value)) throw new SellingPriceInputError('NON_FINITE_INPUT'); };
const finiteResult = (values: object): void => { for (const value of Object.values(values)) if (!Number.isFinite(value)) throw new SellingPriceInputError('NON_FINITE_RESULT'); };
const nonNegative = (value: number, code: SellingPriceErrorCode): void => { if (value < 0) throw new SellingPriceInputError(code); };
const rate = (value: number, code: SellingPriceErrorCode): void => { if (value < 0 || value >= 1) throw new SellingPriceInputError(code); };

export const calculateSellingPriceModeA: PureCalculator<SellingPriceModeAInput, SellingPriceModeAResult> = (input) => {
  Object.values(input).forEach((value) => finite(value));
  nonNegative(input.unitCost, 'INVALID_UNIT_COST');
  nonNegative(input.fixedSellingCost, 'INVALID_FIXED_SELLING_COST');
  rate(input.percentageFee, 'INVALID_PERCENTAGE_FEE');
  rate(input.targetContributionRate, 'INVALID_TARGET_CONTRIBUTION_RATE');
  if (input.percentageFee + input.targetContributionRate >= 1) throw new SellingPriceInputError('COMBINED_RATE_TOO_HIGH');
  const contributionRate = 1 - input.percentageFee - input.targetContributionRate;
  const sellingPrice = (input.unitCost + input.fixedSellingCost) / contributionRate;
  const result = { sellingPrice, contributionRate };
  finiteResult(result);
  return result;
};

export const calculateSellingPriceModeB: PureCalculator<SellingPriceModeBInput, SellingPriceModeBResult> = (input) => {
  Object.values(input).forEach((value) => finite(value));
  nonNegative(input.sellingPrice, 'INVALID_SELLING_PRICE');
  nonNegative(input.unitCost, 'INVALID_UNIT_COST');
  nonNegative(input.fixedSellingCost, 'INVALID_FIXED_SELLING_COST');
  rate(input.percentageFee, 'INVALID_PERCENTAGE_FEE');
  if (input.sellingPrice === 0) throw new SellingPriceInputError('INVALID_SELLING_PRICE');
  const fee = input.sellingPrice * input.percentageFee;
  const unitContribution = input.sellingPrice - input.unitCost - input.fixedSellingCost - fee;
  const contributionRate = unitContribution / input.sellingPrice;
  const result = { unitContribution, contributionRate, fee };
  finiteResult(result);
  return result;
};

export const formatWon = (value: number): string => Number.isFinite(value) ? `${Math.round(value).toLocaleString('ko-KR')}원` : '—';
export const formatPercent = (value: number): string => Number.isFinite(value) ? `${(value * 100).toLocaleString('ko-KR', { maximumFractionDigits: 2 })}%` : '—';
