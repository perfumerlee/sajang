import type { PureCalculator } from '../../../../engine/calculator';

export interface PriceChangeInput {
  currentPrice: number;
  currentQuantity: number;
  unitCost: number;
  fixedSellingCost: number;
  percentageFee: number;
  newPrice: number;
  expectedQuantity?: number;
}

export interface PriceChangeResult {
  currentUnitContribution: number;
  currentTotalContribution: number;
  newUnitContribution: number;
  requiredQuantity: number;
  quantityChangeRate: number;
  expectedTotalContribution?: number;
  contributionChange?: number;
  priceDirection: 'increase' | 'decrease' | 'same';
}

export type PriceChangeErrorCode =
  | 'INVALID_CURRENT_PRICE' | 'INVALID_CURRENT_QUANTITY' | 'INVALID_UNIT_COST'
  | 'INVALID_FIXED_SELLING_COST' | 'INVALID_PERCENTAGE_FEE' | 'INVALID_NEW_PRICE'
  | 'INVALID_EXPECTED_QUANTITY' | 'CURRENT_CONTRIBUTION_NOT_POSITIVE'
  | 'NEW_CONTRIBUTION_NOT_POSITIVE' | 'NON_FINITE_INPUT' | 'NON_FINITE_RESULT';

export class PriceChangeInputError extends Error {
  constructor(public readonly code: PriceChangeErrorCode) { super(code); this.name = 'PriceChangeInputError'; }
}

const assertFinite = (value: number): void => {
  if (!Number.isFinite(value)) throw new PriceChangeInputError('NON_FINITE_INPUT');
};
const assertFiniteResult = (result: PriceChangeResult): void => {
  for (const value of Object.values(result)) if (typeof value === 'number' && !Number.isFinite(value)) throw new PriceChangeInputError('NON_FINITE_RESULT');
};
const assertNonNegative = (value: number, code: PriceChangeErrorCode): void => { if (value < 0) throw new PriceChangeInputError(code); };

export const calculatePriceChange: PureCalculator<PriceChangeInput, PriceChangeResult> = (input) => {
  Object.values(input).forEach((value) => { if (typeof value === 'number') assertFinite(value); });
  if (input.currentPrice <= 0) throw new PriceChangeInputError('INVALID_CURRENT_PRICE');
  if (input.currentQuantity <= 0) throw new PriceChangeInputError('INVALID_CURRENT_QUANTITY');
  assertNonNegative(input.unitCost, 'INVALID_UNIT_COST');
  assertNonNegative(input.fixedSellingCost, 'INVALID_FIXED_SELLING_COST');
  if (input.percentageFee < 0 || input.percentageFee >= 1) throw new PriceChangeInputError('INVALID_PERCENTAGE_FEE');
  if (input.newPrice <= 0) throw new PriceChangeInputError('INVALID_NEW_PRICE');
  if (input.expectedQuantity !== undefined) assertNonNegative(input.expectedQuantity, 'INVALID_EXPECTED_QUANTITY');

  const currentUnitContribution = input.currentPrice - input.unitCost - input.fixedSellingCost - input.currentPrice * input.percentageFee;
  const currentTotalContribution = currentUnitContribution * input.currentQuantity;
  if (!Number.isFinite(currentUnitContribution) || !Number.isFinite(currentTotalContribution) || currentUnitContribution <= 0 || currentTotalContribution <= 0) {
    throw new PriceChangeInputError('CURRENT_CONTRIBUTION_NOT_POSITIVE');
  }
  const newUnitContribution = input.newPrice - input.unitCost - input.fixedSellingCost - input.newPrice * input.percentageFee;
  if (!Number.isFinite(newUnitContribution) || newUnitContribution <= 0) throw new PriceChangeInputError('NEW_CONTRIBUTION_NOT_POSITIVE');
  const requiredQuantity = currentTotalContribution / newUnitContribution;
  const quantityChangeRate = requiredQuantity / input.currentQuantity - 1;
  const expectedTotalContribution = input.expectedQuantity === undefined ? undefined : newUnitContribution * input.expectedQuantity;
  const contributionChange = expectedTotalContribution === undefined ? undefined : expectedTotalContribution - currentTotalContribution;
  const priceDirection: PriceChangeResult['priceDirection'] = input.newPrice > input.currentPrice ? 'increase' : input.newPrice < input.currentPrice ? 'decrease' : 'same';
  const result = { currentUnitContribution, currentTotalContribution, newUnitContribution, requiredQuantity, quantityChangeRate, expectedTotalContribution, contributionChange, priceDirection };
  assertFiniteResult(result);
  return result;
};

export const formatWon = (value: number): string => Number.isFinite(value) ? `${Math.round(value).toLocaleString('ko-KR')}원` : '—';
export const formatQuantity = (value: number): string => Number.isFinite(value) ? `${Math.round(value).toLocaleString('ko-KR')}개` : '—';
export const formatPercent = (value: number): string => Number.isFinite(value) ? `${(value * 100).toLocaleString('ko-KR', { maximumFractionDigits: 1 })}%` : '—';
