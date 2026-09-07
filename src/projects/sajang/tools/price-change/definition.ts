import type { ProjectDefinition, SourceDefinition, ToolDefinition } from '../../../../engine/contracts';
import { calculatePriceChange, formatPercent, formatQuantity, formatWon } from './calculator';

const exampleInput = { currentPrice: 20_000, currentQuantity: 100, unitCost: 10_000, fixedSellingCost: 1_000, percentageFee: 0.05, newPrice: 23_000 };
const exampleResult = calculatePriceChange(exampleInput);
export const priceChangeSources: SourceDefinition[] = [{ id: 'sajang-price-change-spec', title: '사장도구 가격 변경 계산 명세' }];

export const priceChangeTool: ToolDefinition = {
  identity: { id: 'price-change', slug: 'price-change', category: 'pricing', status: 'published', version: '0.1.0' },
  search: { question: '가격 올려도 될까?', name: '가격 변경 계산기', title: '가격 변경 계산기 - 가격 올려도 될까? | 사장도구', description: '현재 판매가격과 변경 판매가격을 비교해 현재 총 기여금을 유지하는 데 필요한 판매량과 예상 기여금 변화를 계산합니다.' },
  knowledge: {
    shortAnswer: `판매가격을 20,000원에서 23,000원으로 바꾸면 현재 총 기여금을 유지하는 데 필요한 판매량은 ${formatQuantity(exampleResult.requiredQuantity)}입니다.`,
    definition: '가격 변경 계산기는 현재 판매가격과 변경 판매가격에서 개당 기여금이 어떻게 달라지는지 비교하고, 현재 총 기여금을 유지하기 위한 판매량 변화를 계산합니다.',
    howItWorks: '현재와 변경 판매가격에서 수수료와 비용을 뺀 개당 기여금을 계산한 뒤, 현재 총 기여금을 변경 후 개당 기여금으로 나눕니다. 예상 판매량을 입력하면 입력 조건 기준 예상 총 기여금도 비교합니다. 현재 판매량과 예상 판매량은 같은 비교 기간의 값이어야 합니다.',
    formula: '현재 개당 기여금 = 현재 판매가격 - 단위 비용 - 고정 판매비 - 현재 판매가격 × 판매 수수료율\n현재 총 기여금 = 현재 개당 기여금 × 현재 판매량\n변경 후 개당 기여금 = 변경 판매가격 - 단위 비용 - 고정 판매비 - 변경 판매가격 × 판매 수수료율\n필요 판매량 = 현재 총 기여금 / 변경 후 개당 기여금\n판매량 변화율 = 필요 판매량 / 현재 판매량 - 1\n변경 후 예상 총 기여금 = 변경 후 개당 기여금 × 예상 판매량',
    example: { title: '현재 판매가격 20,000원, 판매량 100개에서 변경 판매가격 23,000원으로 인상', inputs: exampleInput, result: { currentTotalContribution: formatWon(exampleResult.currentTotalContribution), newUnitContribution: formatWon(exampleResult.newUnitContribution), requiredQuantity: formatQuantity(exampleResult.requiredQuantity), quantityChangeRate: formatPercent(exampleResult.quantityChangeRate) }, explanation: `production calculator 결과 현재 총 기여금 ${formatWon(exampleResult.currentTotalContribution)}을 유지하려면 약 ${formatQuantity(exampleResult.requiredQuantity)}이 필요하며, 판매량은 ${formatPercent(exampleResult.quantityChangeRate)} 변화합니다.` },
    limitations: ['사장도구의 계산 결과는 사용자가 입력한 조건을 기준으로 한 단순 추정입니다. 실제 사업 결과는 세금, 부가가치세, 금융비용, 환불, 폐기, 할인, 계절성 및 기타 비용 등에 따라 달라질 수 있습니다.', '가격 변경 후 실제 판매량은 고객 반응, 경쟁가격, 시장 수요 등에 따라 달라질 수 있습니다.', '이 계산기는 수요 예측 모델이 아니라 사용자가 입력한 예상 판매량과 현재 조건을 비교하는 의사결정 지원 도구입니다.'],
    faq: [{ question: '현재 판매량과 예상 판매량의 기간은 달라도 되나요?', answer: '아니요. 현재 판매량과 예상 판매량은 같은 비교 기간을 기준으로 입력해야 합니다.' }, { question: '변경 후 개당 기여금이 0 이하이면 어떻게 되나요?', answer: '판매량 증가만으로 현재 총 기여금을 유지하는 정상적인 계산이 성립하지 않으므로 경고를 표시합니다.' }],
  },
  interaction: { inputs: [], outputs: [], calculator: 'price-change' },
  relations: { relatedTools: [], relatedDecisions: [{ toolId: 'discount-profit', question: '가격을 내리면 어떨까요?', label: '할인 후 필요한 판매량을 검토해보세요.' }, { toolId: 'daily-sales-target', question: '변경 가격으로 목표 매출을 달성할 수 있을까요?', label: '하루 목표 매출을 함께 확인해보세요.' }, { toolId: 'selling-price', question: '비용 기준 가격은 얼마인가요?', label: '계산된 판매가격을 확인해보세요.' }], sources: ['sajang-price-change-spec'] },
  maintenance: { reviewedAt: '2026-09-08' },
};

export const priceChangeProject: ProjectDefinition = {
  id: 'sajang', name: '사장도구', description: '장사를 하며 필요한 숫자를 계산하는 도구', locale: 'ko-KR', baseUrl: '/', owner: 'Sajang', navigation: [],
  features: { localStorage: false, analytics: false, ads: false, remoteData: false }, theme: { id: 'working-ledger' },
  categories: [{ id: 'pricing', name: '가격', question: '가격을 어떻게 바꾸면 좋을까?', description: '가격 변경과 기여금 변화를 계산합니다.', tools: ['price-change'], status: 'published' }], tools: [priceChangeTool], sources: priceChangeSources,
};
