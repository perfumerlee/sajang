import { calculateSellingPriceModeA, calculateSellingPriceModeB, formatPercent, formatWon, SellingPriceInputError } from './calculator';
import { setFiniteResult, clearResultValues } from '../../../../engine/result-runtime';
import { trackSajangEvent } from '../../analytics/provider';

const root = document.querySelector<HTMLElement>('[data-selling-price-tool]');
if (root) {
  const forms = [...root.querySelectorAll<HTMLFormElement>('[data-selling-price-form]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-selling-price-panel]')];
  const clear = (form: HTMLFormElement) => {
    clearResultValues(form);
    form.querySelectorAll<HTMLElement>('[data-input-field]').forEach((field) => {
      const input = field.querySelector<HTMLInputElement>('input');
      input?.setAttribute('aria-invalid', 'false');
      input?.setAttribute('aria-describedby', input?.dataset.descriptionId ?? '');
      const error = field.querySelector<HTMLElement>('[data-input-error]');
      if (error) { error.textContent = ''; error.hidden = true; }
    });
    const message = form.querySelector<HTMLElement>('[data-calculator-error]');
    if (message) { message.textContent = ''; message.hidden = true; }
  };
  const showError = (form: HTMLFormElement, ids: string[], message: string) => ids.forEach((id) => {
    const field = form.querySelector<HTMLElement>(`[data-input-field="${id}"]`);
    const input = field?.querySelector<HTMLInputElement>('input');
    const error = field?.querySelector<HTMLElement>('[data-input-error]');
    input?.setAttribute('aria-invalid', 'true');
    if (input) input.setAttribute('aria-describedby', [input.dataset.descriptionId, input.dataset.errorId].filter(Boolean).join(' '));
    if (error) { error.textContent = message; error.hidden = false; }
  });
  const read = (form: HTMLFormElement, name: string) => {
    const input = form.elements.namedItem(name);
    const raw = input instanceof HTMLInputElement ? input.value : '';
    return raw.trim() === '' ? Number.NaN : Number(raw.replaceAll(',', '').replace(/\s/g, ''));
  };
  const examples = root.closest('.engine-knowledge-page')?.querySelectorAll<HTMLElement>('[data-selling-price-example]');
  const activate = (mode: string, reset = true) => {
    if (reset) forms.forEach(clear);
    panels.forEach((panel) => { panel.hidden = panel.dataset.sellingPricePanel !== mode; });
    examples?.forEach((example) => { example.hidden = example.dataset.sellingPriceExample !== mode; });
  };
  root.querySelectorAll<HTMLInputElement>('[data-selling-price-mode]').forEach((input) => input.addEventListener('change', () => activate(input.value, false)));
  forms.forEach((form) => {
    form.addEventListener('invalid', (event) => { clear(form); showError(form, [(event.target as HTMLInputElement).id], '이 항목의 입력값을 확인해주세요.'); }, true);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      clear(form);
      try {
        if (form.dataset.sellingPriceForm === 'a') {
          const result = calculateSellingPriceModeA({ unitCost: read(form, 'unitCostA'), fixedSellingCost: read(form, 'fixedSellingCostA'), percentageFee: read(form, 'percentageFeeA') / 100, targetContributionRate: read(form, 'targetContributionRateA') / 100 });
          setFiniteResult(form.querySelector('#selling-price-result [data-result-number]')!, result.sellingPrice, (value) => formatWon(value).replace(/원$/, ''));
          trackSajangEvent('tool_calculate', { projectId: 'sajang', categoryId: 'pricing', toolId: 'selling-price' });
        } else {
          const result = calculateSellingPriceModeB({ sellingPrice: read(form, 'sellingPriceB'), unitCost: read(form, 'unitCostB'), fixedSellingCost: read(form, 'fixedSellingCostB'), percentageFee: read(form, 'percentageFeeB') / 100 });
          setFiniteResult(form.querySelector('#unit-contribution-result [data-result-number]')!, result.unitContribution, (value) => formatWon(value).replace(/원$/, ''));
          setFiniteResult(form.querySelector('[data-result="contributionRate"]')!, result.contributionRate, (value) => `비용을 빼고 남는 비율: ${formatPercent(value)}`);
          setFiniteResult(form.querySelector('[data-result="fee"]')!, result.fee, (value) => `수수료: ${formatWon(value)}`);
          trackSajangEvent('tool_calculate', { projectId: 'sajang', categoryId: 'pricing', toolId: 'selling-price' });
        }
      } catch (caught) {
        const code = caught instanceof SellingPriceInputError ? caught.code : 'NON_FINITE_INPUT';
        const mode = form.dataset.sellingPriceForm === 'a' ? 'A' : 'B';
        const fields = code === 'COMBINED_RATE_TOO_HIGH' ? ['percentageFeeA', 'targetContributionRateA'] : code.includes('UNIT_COST') ? [`unitCost${mode}`] : code.includes('FIXED_SELLING_COST') ? [`fixedSellingCost${mode}`] : code.includes('PERCENTAGE_FEE') ? [`percentageFee${mode}`] : code.includes('TARGET_CONTRIBUTION') ? ['targetContributionRateA'] : code.includes('SELLING_PRICE') ? ['sellingPriceB'] : [];
        showError(form, fields, code === 'COMBINED_RATE_TOO_HIGH' ? '수수료율과 목표 비율의 합은 100% 미만이어야 합니다.' : '이 입력값을 확인해주세요.');
        const message = form.querySelector<HTMLElement>('[data-calculator-error]');
        if (message && code === 'COMBINED_RATE_TOO_HIGH') { message.textContent = '수수료율과 목표 비율의 합이 너무 높아 계산할 수 없습니다.'; message.hidden = false; }
      }
    });
  });
  activate('a', false);
}
