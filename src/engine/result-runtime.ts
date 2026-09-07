export type ResultFormatter = (value: number) => string;

export function setFiniteResult(element: HTMLElement, value: number, formatter: ResultFormatter = (number) => number.toLocaleString()): void {
  element.textContent = Number.isFinite(value) ? formatter(value) : '—';
}
