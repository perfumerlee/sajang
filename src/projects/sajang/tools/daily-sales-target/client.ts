import { calculateDailySalesTarget, formatCustomers, formatPercent, formatWon, DailySalesTargetInputError } from './calculator';
import { setFiniteResult } from '../../../../engine/result-runtime';

const form = document.querySelector<HTMLFormElement>('[data-daily-sales-target-form]');
if (form) {
  const error = document.querySelector<HTMLElement>('[data-calculator-error]');
  const targetDaily = document.querySelector<HTMLElement>('#target-daily-result [data-result-number]');
  const resultElement = (name: string) => document.querySelector<HTMLElement>(`[data-result="${name}"]`);
  const clearFieldErrors = () => form.querySelectorAll<HTMLElement>('[data-input-field]').forEach((field) => {
    const input = field.querySelector<HTMLInputElement>('input');
    input?.setAttribute('aria-invalid', 'false');
    input?.setAttribute('aria-describedby', input?.dataset.descriptionId ?? '');
    const fieldError = field.querySelector<HTMLElement>('[data-input-error]');
    if (fieldError) { fieldError.textContent = ''; fieldError.hidden = true; }
  });
  const showFieldError = (fieldId: string, message: string) => {
    const field = form.querySelector<HTMLElement>(`[data-input-field="${fieldId}"]`);
    const input = field?.querySelector<HTMLInputElement>('input');
    const fieldError = field?.querySelector<HTMLElement>('[data-input-error]');
    input?.setAttribute('aria-invalid', 'true');
    if (input) input.setAttribute('aria-describedby', [input.dataset.descriptionId, input.dataset.errorId].filter(Boolean).join(' '));
    if (fieldError) { fieldError.textContent = message; fieldError.hidden = false; }
  };
  const clearResults = () => [targetDaily, resultElement('targetMonthly'), resultElement('breakEvenMonthly'), resultElement('breakEvenDaily'), resultElement('contributionRate'), resultElement('customersNeeded')].forEach((element) => { if (element) element.textContent = '—'; });

  const readNumber = (name: string): number => Number(String(new FormData(form).get(name) ?? '').replaceAll(',', ''));
  form.addEventListener('invalid', (event) => {
    const input = event.target as HTMLInputElement;
    clearResults();
    clearFieldErrors();
    showFieldError(input.id, '이 항목의 입력값을 확인해주세요.');
  }, true);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(form);
      const averageOrderValueRaw = formData.get('averageOrderValue');
      const calculation = calculateDailySalesTarget({
        fixedCost: readNumber('fixedCost'),
        variableRate: readNumber('variableRate') / 100,
        operatingDays: readNumber('operatingDays'),
        targetProfit: readNumber('targetProfit'),
        averageOrderValue: averageOrderValueRaw ? readNumber('averageOrderValue') : undefined,
      });
      clearFieldErrors();
      if (error) { error.textContent = ''; error.hidden = true; }
      if (targetDaily) setFiniteResult(targetDaily, calculation.targetDaily, (value) => formatWon(value).replace(/원$/, ''));
      if (resultElement('targetMonthly')) setFiniteResult(resultElement('targetMonthly')!, calculation.targetMonthly, formatWon);
      if (resultElement('breakEvenMonthly')) setFiniteResult(resultElement('breakEvenMonthly')!, calculation.breakEvenMonthly, formatWon);
      if (resultElement('breakEvenDaily')) setFiniteResult(resultElement('breakEvenDaily')!, calculation.breakEvenDaily, formatWon);
      if (resultElement('contributionRate')) setFiniteResult(resultElement('contributionRate')!, calculation.contributionRate, formatPercent);
      if (resultElement('customersNeeded')) {
        if (calculation.customersNeeded === undefined) resultElement('customersNeeded')!.textContent = '객단가 입력 시 계산';
        else setFiniteResult(resultElement('customersNeeded')!, calculation.customersNeeded, formatCustomers);
      }
    } catch (caught) {
      clearResults();
      clearFieldErrors();
      const code = caught instanceof DailySalesTargetInputError ? caught.code : 'NON_FINITE_INPUT';
      const field = code.includes('FIXED_COST') ? 'fixedCost' : code.includes('VARIABLE_RATE') ? 'variableRate' : code.includes('OPERATING_DAYS') ? 'operatingDays' : code.includes('TARGET_PROFIT') ? 'targetProfit' : code.includes('AVERAGE_ORDER') ? 'averageOrderValue' : undefined;
      if (field) showFieldError(field, '이 항목의 입력값을 확인해주세요.');
      if (error) { error.textContent = field ? '' : '입력한 조건으로는 계산할 수 없습니다.'; error.hidden = Boolean(field); }
    }
  });
}
