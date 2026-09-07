import type { ProjectDefinition, SourceDefinition, ToolDefinition } from '../../../../engine/contracts';
import { calculateSellingPriceModeA, formatPercent, formatWon } from './calculator';

const exampleInput = { unitCost: 10_000, fixedSellingCost: 2_000, percentageFee: 0.03, targetContributionRate: 0.4 };
const exampleResult = calculateSellingPriceModeA(exampleInput);
export const sellingPriceSources: SourceDefinition[] = [{ id: 'sajang-selling-price-spec', title: '사장도구 판매가격 계산 명세' }];

export const sellingPriceTool: ToolDefinition = {
  identity: { id: 'selling-price', slug: 'selling-price', category: 'pricing', status: 'published', version: '0.1.0' },
  search: { question: '얼마에 팔아야 하지?', name: '판매가격 계산기', title: '판매가격 계산기 - 얼마에 팔아야 하지? | 사장도구', description: '단위 비용과 판매 수수료, 목표 기여율을 바탕으로 계산된 판매가격과 현재 가격의 예상 기여금을 확인합니다.' },
  knowledge: {
    shortAnswer: `단위 비용 10,000원, 고정 판매비 2,000원, 수수료 3%, 목표 기여율 40%라면 계산된 판매가격은 ${formatWon(exampleResult.sellingPrice)}입니다.`,
    definition: '판매가격은 입력한 단위 비용과 판매에 붙는 고정비용을 회수하고 목표 기여율을 확보하기 위해 계산하는 기준입니다.',
    howItWorks: '판매가격을 계산할 때는 비용을 합산하고 수수료율과 목표 기여율을 제외한 비율로 나눕니다. 현재 가격을 확인할 때는 판매가격에서 비용과 수수료를 차감해 예상 기여금과 기여율을 계산합니다.',
    formula: 'C = 단위 비용 + 고정 판매비\nF = 판매 수수료율\nM = 목표 기여율\n계산된 판매가격 = C / (1 - F - M)\n판매 수수료 = 현재 판매가격 × F\n예상 기여금 = 현재 판매가격 - 단위 비용 - 고정 판매비 - 판매 수수료\n기여율 = 예상 기여금 / 현재 판매가격',
    example: { title: '단위 비용 10,000원, 고정 판매비 2,000원, 판매 수수료율 3%, 목표 기여율 40%', inputs: exampleInput, result: { sellingPrice: formatWon(exampleResult.sellingPrice), contributionRate: formatPercent(exampleResult.contributionRate) }, explanation: `production calculator 결과 계산된 판매가격 ${formatWon(exampleResult.sellingPrice)}, 비용과 목표 기여율을 제외하고 남는 비율 ${formatPercent(exampleResult.contributionRate)}입니다.` },
    limitations: ['입력한 비용과 수수료를 바탕으로 한 계산입니다.', '예상 기여금은 입력 비용 차감 후 금액이며 순이익이나 마진과 같은 의미가 아닙니다.', '시장 수요나 경쟁가격을 고려한 판매가격 추천이 아닙니다.'],
    faq: [{ question: '계산된 판매가격이 시장 가격과 달라도 되나요?', answer: '이 도구는 비용과 목표 기여율 기준을 계산하므로 시장 수요와 경쟁가격을 별도로 확인해야 합니다.' }, { question: '수수료율과 목표 기여율의 합이 100%면 어떻게 되나요?', answer: '비용을 나눌 기준이 없어 유효한 판매가격을 계산하지 않고 오류를 표시합니다.' }],
  },
  interaction: { inputs: [], outputs: [], calculator: 'selling-price' },
  relations: { relatedTools: [], relatedDecisions: [{ toolId: 'daily-sales-target', question: '계산된 가격으로 목표 매출을 달성할 수 있을까요?', label: '하루 목표 매출과 필요한 판매량을 함께 확인해보세요.' }], sources: ['sajang-selling-price-spec'] },
  maintenance: { reviewedAt: '2026-09-08' },
};

export const sellingPriceProject: ProjectDefinition = {
  id: 'sajang', name: '사장도구', description: '장사를 하며 필요한 숫자를 계산하는 도구', locale: 'ko-KR', baseUrl: '/', owner: 'Sajang', navigation: [],
  features: { localStorage: false, analytics: false, ads: false, remoteData: false }, theme: { id: 'working-ledger' },
  categories: [{ id: 'pricing', name: '가격', question: '가격을 어떻게 정해야 하지?', description: '판매가격과 기여금을 계산합니다.', tools: ['selling-price'], status: 'published' }], tools: [sellingPriceTool], sources: sellingPriceSources,
};
