import type { ProjectDefinition, SourceDefinition, ToolDefinition } from '../../../../engine/contracts';
import { calculateDiscountProfit, formatPercent, formatQuantity, formatWon } from './calculator';
const exampleInput = { regularPrice: 20_000, currentQuantity: 100, unitCost: 10_000, fixedSellingCost: 1_000, percentageFee: 0.05, discountRate: 0.1 };
const exampleResult = calculateDiscountProfit(exampleInput);
export const discountProfitSources: SourceDefinition[] = [{ id: 'sajang-discount-profit-spec', title: '사장도구 할인 손익 계산 명세' }];
export const discountProfitTool: ToolDefinition = {
  identity: { id: 'discount-profit', slug: 'discount-profit', category: 'pricing', status: 'published', version: '0.1.0' },
  search: { question: '할인해도 될까?', name: '할인 손익 계산기', title: '할인 손익 계산기 - 할인해도 될까? | 사장도구', description: '할인 후 개당 남는 금액과 현재 총 남는 금액을 유지하는 데 필요한 판매량 증가율을 계산합니다.' },
  knowledge: {
    exampleInputDisplay: { percentageFee: formatPercent(0.05), discountRate: formatPercent(0.1) }, exampleLabels: { inputs: { regularPrice: '정상 판매가격', currentQuantity: '현재 판매량', unitCost: '단위 비용', fixedSellingCost: '고정 판매비', percentageFee: '판매 수수료율', discountRate: '할인율' }, result: { discountPrice: '할인 판매가격', discountUnitContribution: '할인 후 개당 남는 금액', requiredQuantity: '필요 판매량', requiredIncreaseRate: '판매량 증가 필요율' } },
    shortAnswer: `예를 들어 10% 할인하는 조건에서는 현재 총 남는 금액을 유지하기 위해 판매량이 약 ${formatPercent(exampleResult.requiredIncreaseRate)} 증가해야 합니다. 실제 결과는 계산기에 입력한 조건에 따라 달라집니다.`,
    definition: '할인 손익 계산기는 할인 전후의 개당 남는 금액을 비교하고, 할인으로 줄어든 개당 남는 금액을 보전하기 위해 필요한 판매량을 계산합니다.',
    howItWorks: '정상 판매가격에서 수수료와 비용을 뺀 현재 개당 남는 금액과 현재 총 남는 금액을 계산합니다. 할인 판매가격의 개당 남는 금액으로 현재 총 남는 금액을 나누어 필요한 판매량과 증가 필요율을 구합니다. 현재 판매량은 할인 전 기준이며 같은 비교 기간의 값입니다.',
    formula: '할인 판매가격 = 정상 판매가격 × (1 - 할인율)\n할인 전 개당 남는 금액 = 정상 판매가격 - 단위 비용 - 고정 판매비 - 정상 판매가격 × 판매 수수료율\n할인 전 총 남는 금액 = 할인 전 개당 남는 금액 × 현재 판매량\n할인 후 개당 남는 금액 = 할인 판매가격 - 단위 비용 - 고정 판매비 - 할인 판매가격 × 판매 수수료율\n필요 판매량 = 할인 전 총 남는 금액 / 할인 후 개당 남는 금액\n판매량 증가 필요율 = 필요 판매량 / 현재 판매량 - 1',
    example: { title: '정상 판매가격 20,000원, 현재 판매량 100개, 할인율 10%', inputs: exampleInput, result: { discountPrice: formatWon(exampleResult.discountPrice), discountUnitContribution: formatWon(exampleResult.discountUnitContribution), requiredQuantity: formatQuantity(exampleResult.requiredQuantity), requiredIncreaseRate: formatPercent(exampleResult.requiredIncreaseRate) }, explanation: `계산 결과 할인 판매가격 ${formatWon(exampleResult.discountPrice)}, 필요한 판매량 ${formatQuantity(exampleResult.requiredQuantity)}, 판매량 증가 필요율 ${formatPercent(exampleResult.requiredIncreaseRate)}입니다.` },
    limitations: ['사장도구의 계산 결과는 사용자가 입력한 조건을 기준으로 한 단순 추정입니다. 실제 사업 결과는 세금, 부가가치세, 금융비용, 환불, 폐기, 할인, 계절성 및 기타 비용 등에 따라 달라질 수 있습니다.', '할인 후 실제 판매량은 고객 반응, 상품 특성, 경쟁가격, 시장 수요 등에 따라 달라질 수 있습니다.', '이 계산기는 수요 예측 모델이 아니라 할인으로 감소한 개당 남는 금액을 보전하기 위해 필요한 판매량을 계산하는 의사결정 지원 도구입니다.'],
    faq: [{ question: '할인율 0%도 계산할 수 있나요?', answer: '네. 할인 판매가격과 개당 남는 금액 변화가 없고 현재와 같은 판매량이 필요하다는 결과를 보여줍니다.' }, { question: '할인 후 개당 남는 금액이 0 이하이면 어떻게 되나요?', answer: '판매량을 늘리는 것만으로 현재 총 남는 금액을 유지하는 계산이 성립하지 않으므로 경고를 표시합니다.' }],
  },
  interaction: { inputs: [], outputs: [], calculator: 'discount-profit' },
  relations: { relatedTools: [], relatedDecisions: [{ toolId: 'price-change', question: '할인 대신 가격을 바꾸면 필요한 판매량은 어떻게 달라질까요?', label: '가격 변경에 따른 판매량 변화를 확인해보세요.' }, { toolId: 'selling-price', question: '할인 전후 비용 기준 판매가격은 얼마인가요?', label: '판매가격과 남는 금액을 확인해보세요.' }], sources: ['sajang-discount-profit-spec'] },
  maintenance: { reviewedAt: '2026-09-08' },
};
export const discountProfitProject: ProjectDefinition = { id: 'sajang', name: '사장도구', description: '장사를 하며 필요한 숫자를 계산하는 도구', locale: 'ko-KR', baseUrl: '/', owner: 'Sajang', navigation: [], features: { localStorage: false, analytics: true, ads: false, remoteData: false }, theme: { id: 'working-ledger' }, categories: [{ id: 'pricing', name: '가격', question: '할인해도 될까?', description: '할인과 남는 금액 변화를 계산합니다.', tools: ['discount-profit'], status: 'published' }], tools: [discountProfitTool], sources: discountProfitSources };
