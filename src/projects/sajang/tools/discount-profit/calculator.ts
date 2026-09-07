import type { PureCalculator } from '../../../../engine/calculator';

export interface DiscountProfitInput { regularPrice: number; currentQuantity: number; unitCost: number; fixedSellingCost: number; percentageFee: number; discountRate: number; }
export interface DiscountProfitResult { discountPrice: number; currentUnitContribution: number; currentTotalContribution: number; discountUnitContribution: number; requiredQuantity: number; requiredIncreaseRate: number; }
export type DiscountProfitErrorCode = 'INVALID_REGULAR_PRICE' | 'INVALID_CURRENT_QUANTITY' | 'INVALID_UNIT_COST' | 'INVALID_FIXED_SELLING_COST' | 'INVALID_PERCENTAGE_FEE' | 'INVALID_DISCOUNT_RATE' | 'CURRENT_CONTRIBUTION_NOT_POSITIVE' | 'DISCOUNT_CONTRIBUTION_NOT_POSITIVE' | 'NON_FINITE_INPUT' | 'NON_FINITE_RESULT';
export class DiscountProfitInputError extends Error { constructor(public readonly code: DiscountProfitErrorCode) { super(code); this.name = 'DiscountProfitInputError'; } }
const finite = (value: number) => { if (!Number.isFinite(value)) throw new DiscountProfitInputError('NON_FINITE_INPUT'); };
const nonNegative = (value: number, code: DiscountProfitErrorCode) => { if (value < 0) throw new DiscountProfitInputError(code); };
export const calculateDiscountProfit: PureCalculator<DiscountProfitInput, DiscountProfitResult> = (input) => {
  Object.values(input).forEach(finite);
  if (input.regularPrice <= 0) throw new DiscountProfitInputError('INVALID_REGULAR_PRICE');
  if (input.currentQuantity <= 0) throw new DiscountProfitInputError('INVALID_CURRENT_QUANTITY');
  nonNegative(input.unitCost, 'INVALID_UNIT_COST'); nonNegative(input.fixedSellingCost, 'INVALID_FIXED_SELLING_COST');
  if (input.percentageFee < 0 || input.percentageFee >= 1) throw new DiscountProfitInputError('INVALID_PERCENTAGE_FEE');
  if (input.discountRate < 0 || input.discountRate > 1) throw new DiscountProfitInputError('INVALID_DISCOUNT_RATE');
  const discountPrice = input.regularPrice * (1 - input.discountRate);
  const currentUnitContribution = input.regularPrice - input.unitCost - input.fixedSellingCost - input.regularPrice * input.percentageFee;
  const currentTotalContribution = currentUnitContribution * input.currentQuantity;
  if (!Number.isFinite(currentUnitContribution) || !Number.isFinite(currentTotalContribution)) throw new DiscountProfitInputError('NON_FINITE_RESULT');
  if (currentUnitContribution <= 0 || currentTotalContribution <= 0) throw new DiscountProfitInputError('CURRENT_CONTRIBUTION_NOT_POSITIVE');
  const discountUnitContribution = discountPrice - input.unitCost - input.fixedSellingCost - discountPrice * input.percentageFee;
  if (!Number.isFinite(discountUnitContribution)) throw new DiscountProfitInputError('NON_FINITE_RESULT');
  if (discountUnitContribution <= 0) throw new DiscountProfitInputError('DISCOUNT_CONTRIBUTION_NOT_POSITIVE');
  const requiredQuantity = currentTotalContribution / discountUnitContribution;
  const requiredIncreaseRate = requiredQuantity / input.currentQuantity - 1;
  const result = { discountPrice, currentUnitContribution, currentTotalContribution, discountUnitContribution, requiredQuantity, requiredIncreaseRate };
  Object.values(result).forEach((value) => { if (!Number.isFinite(value)) throw new DiscountProfitInputError('NON_FINITE_RESULT'); });
  return result;
};
export const formatWon = (value: number) => Number.isFinite(value) ? `${Math.round(value).toLocaleString('ko-KR')}원` : '—';
export const formatQuantity = (value: number) => Number.isFinite(value) ? `${Math.ceil(value).toLocaleString('ko-KR')}개` : '—';
export const formatPercent = (value: number) => Number.isFinite(value) ? `${(value * 100).toLocaleString('ko-KR', { maximumFractionDigits: 1 })}%` : '—';
