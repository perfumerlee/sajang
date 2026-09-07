export function metersToCentimeters(meters: number): number {
  if (!Number.isFinite(meters)) return 0;
  const result = meters * 100;
  return Number.isFinite(result) ? result : 0;
}
