import type { PureCalculator } from '../../../../engine/calculator';

export interface DailySalesTargetInput {
  fixedCost: number;
  variableRate: number;
  operatingDays: number;
  targetProfit: number;
  averageOrderValue?: number;
}

export interface DailySalesTargetResult {
  contributionRate: number;
  breakEvenMonthly: number;
  breakEvenDaily: number;
  targetMonthly: number;
  targetDaily: number;
  customersNeeded?: number;
}

export type DailySalesTargetErrorCode =
  | 'INVALID_FIXED_COST'
  | 'INVALID_VARIABLE_RATE'
  | 'INVALID_OPERATING_DAYS'
  | 'INVALID_TARGET_PROFIT'
  | 'INVALID_AVERAGE_ORDER_VALUE'
  | 'NON_FINITE_RESULT'
  | 'NON_FINITE_INPUT';

export class DailySalesTargetInputError extends Error {
  constructor(public readonly code: DailySalesTargetErrorCode) {
    super(code);
    this.name = 'DailySalesTargetInputError';
  }
}

function assertFinite(value: number): void {
  if (!Number.isFinite(value)) throw new DailySalesTargetInputError('NON_FINITE_INPUT');
}

function assertFiniteResult(values: DailySalesTargetResult): void {
  for (const value of Object.values(values)) {
    if (value !== undefined && !Number.isFinite(value)) throw new DailySalesTargetInputError('NON_FINITE_RESULT');
  }
}

export const calculateDailySalesTarget: PureCalculator<DailySalesTargetInput, DailySalesTargetResult> = (input) => {
  assertFinite(input.fixedCost);
  assertFinite(input.variableRate);
  assertFinite(input.operatingDays);
  assertFinite(input.targetProfit);
  if (input.averageOrderValue !== undefined) assertFinite(input.averageOrderValue);
  if (input.fixedCost < 0) throw new DailySalesTargetInputError('INVALID_FIXED_COST');
  if (input.variableRate < 0 || input.variableRate >= 1) throw new DailySalesTargetInputError('INVALID_VARIABLE_RATE');
  if (!Number.isInteger(input.operatingDays) || input.operatingDays < 1 || input.operatingDays > 31) {
    throw new DailySalesTargetInputError('INVALID_OPERATING_DAYS');
  }
  if (input.targetProfit < 0) throw new DailySalesTargetInputError('INVALID_TARGET_PROFIT');
  if (input.averageOrderValue !== undefined && input.averageOrderValue <= 0) {
    throw new DailySalesTargetInputError('INVALID_AVERAGE_ORDER_VALUE');
  }

  const contributionRate = 1 - input.variableRate;
  const breakEvenMonthly = input.fixedCost / contributionRate;
  const breakEvenDaily = breakEvenMonthly / input.operatingDays;
  const targetMonthly = (input.fixedCost + input.targetProfit) / contributionRate;
  const targetDaily = targetMonthly / input.operatingDays;
  const customersNeeded = input.averageOrderValue === undefined ? undefined : targetDaily / input.averageOrderValue;

  const result = { contributionRate, breakEvenMonthly, breakEvenDaily, targetMonthly, targetDaily, customersNeeded };
  assertFiniteResult(result);
  return result;
};

export const formatWon = (value: number): string => Number.isFinite(value) ? `${Math.round(value).toLocaleString('ko-KR')}원` : '—';
export const formatPercent = (value: number): string => Number.isFinite(value) ? `${(value * 100).toLocaleString('ko-KR', { maximumFractionDigits: 2 })}%` : '—';
export const formatCustomers = (value: number): string => Number.isFinite(value) ? `${Math.ceil(value).toLocaleString('ko-KR')}명` : '—';
