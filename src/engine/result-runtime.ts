export type ResultFormatter = (value: number) => string;

export function clearResultValues(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>('[data-result-value], [data-result], [data-result-number], [data-calculator-meaning]').forEach((element) => {
    if (element.querySelector('[data-result-number]')) return;
    element.textContent = '—';
  });
}

export function setFiniteResult(element: HTMLElement, value: number, formatter: ResultFormatter = (number) => number.toLocaleString()): void {
  element.textContent = Number.isFinite(value) ? formatter(value) : '—';
}
