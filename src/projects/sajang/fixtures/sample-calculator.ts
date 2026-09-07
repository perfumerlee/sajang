import type { PureCalculator } from '../../../engine/calculator';

export interface SampleCalculatorInput {
  first: number;
  second: number;
}

export interface SampleCalculatorResult {
  total: number;
}

export const sampleCalculator: PureCalculator<SampleCalculatorInput, SampleCalculatorResult> = ({ first, second }) => ({
  total: first + second,
});
