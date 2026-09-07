import type { PureCalculator } from '../../../../engine/calculator';
export interface HiringProfitInput { employeeMonthlyCost: number; variableRate: number; operatingDays: number; currentDailyRevenue?: number; }
export interface HiringProfitResult { contributionRate: number; additionalMonthlyRevenue: number; additionalDailyRevenue: number; requiredIncreaseRate?: number; }
export type HiringProfitErrorCode = 'INVALID_EMPLOYEE_COST' | 'INVALID_VARIABLE_RATE' | 'INVALID_OPERATING_DAYS' | 'INVALID_CURRENT_DAILY_REVENUE' | 'NON_FINITE_INPUT' | 'NON_FINITE_RESULT' | 'NO_CONTRIBUTION_REMAINING';
export class HiringProfitInputError extends Error { constructor(public readonly code: HiringProfitErrorCode) { super(code); this.name = 'HiringProfitInputError'; } }
const finite = (value: number) => { if (!Number.isFinite(value)) throw new HiringProfitInputError('NON_FINITE_INPUT'); };
export const calculateHiringProfit: PureCalculator<HiringProfitInput, HiringProfitResult> = (input) => {
  Object.values(input).forEach((value) => { if (typeof value === 'number') finite(value); });
  if (input.employeeMonthlyCost < 0) throw new HiringProfitInputError('INVALID_EMPLOYEE_COST');
  if (input.variableRate < 0 || input.variableRate >= 1) throw new HiringProfitInputError('INVALID_VARIABLE_RATE');
  if (!Number.isInteger(input.operatingDays) || input.operatingDays < 1 || input.operatingDays > 31) throw new HiringProfitInputError('INVALID_OPERATING_DAYS');
  if (input.currentDailyRevenue !== undefined && input.currentDailyRevenue < 0) throw new HiringProfitInputError('INVALID_CURRENT_DAILY_REVENUE');
  const contributionRate = 1 - input.variableRate;
  if (contributionRate <= 0) throw new HiringProfitInputError('NO_CONTRIBUTION_REMAINING');
  const additionalMonthlyRevenue = input.employeeMonthlyCost / contributionRate;
  const additionalDailyRevenue = additionalMonthlyRevenue / input.operatingDays;
  const requiredIncreaseRate = input.currentDailyRevenue === undefined ? undefined : input.currentDailyRevenue === 0 ? undefined : additionalDailyRevenue / input.currentDailyRevenue;
  const result = { contributionRate, additionalMonthlyRevenue, additionalDailyRevenue, requiredIncreaseRate };
  for (const value of Object.values(result)) if (value !== undefined && !Number.isFinite(value)) throw new HiringProfitInputError('NON_FINITE_RESULT');
  return result;
};
export const formatWon = (value: number) => Number.isFinite(value) ? `${Math.round(value).toLocaleString('ko-KR')}원` : '—';
export const formatPercent = (value: number) => Number.isFinite(value) ? `${(value * 100).toLocaleString('ko-KR', { maximumFractionDigits: 1 })}%` : '—';
