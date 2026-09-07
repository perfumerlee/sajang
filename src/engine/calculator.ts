export type PureCalculator<Input, Output> = (input: Input) => Output;

export function finiteNumber(value: number): number | null {
  return Number.isFinite(value) ? value : null;
}

export function createSafeCalculator<Input, Output>(calculator: PureCalculator<Input, Output>): PureCalculator<Input, Output> {
  return (input) => calculator(input);
}
