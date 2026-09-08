import type { ProjectDefinition, SourceDefinition, ToolDefinition } from '../../../../engine/contracts';
import { calculateDailySalesTarget, formatPercent, formatWon } from './calculator';

const exampleInput = { fixedCost: 4_000_000, variableRate: 0.35, targetProfit: 3_000_000, operatingDays: 26 };
const exampleResult = calculateDailySalesTarget(exampleInput);

export const dailySalesTargetSources: SourceDefinition[] = [
  { id: 'sajang-daily-sales-spec', title: '사장도구 하루 목표 매출 계산 명세' },
];

export const dailySalesTargetTool: ToolDefinition = {
  identity: { id: 'daily-sales-target', slug: 'daily-sales-target', category: 'sales', status: 'published', version: '0.1.0' },
  search: {
    question: '오늘 얼마 팔아야 하지?',
    name: '하루 목표 매출 계산기',
    title: '하루 목표 매출 계산기 - 오늘 얼마 팔아야 할까? | 사장도구',
    description: '월 고정비, 변동비율, 영업일과 목표수익을 입력하면 손익분기 월매출과 하루 목표 매출을 계산한다.',
  },
  knowledge: {
    exampleInputDisplay: { variableRate: formatPercent(exampleInput.variableRate) }, exampleLabels: { inputs: { fixedCost: '월 고정비', variableRate: '평균 변동비율', targetProfit: '월 목표수익', operatingDays: '월 영업일' }, result: { contributionRate: '공헌이익률', targetMonthly: '목표 월매출', targetDaily: '하루 목표 매출' } },
    shortAnswer: `예를 들어 월 고정비 4,000,000원, 평균 변동비율 35%, 월 목표수익 3,000,000원, 월 영업일 26일이라면 하루 목표 매출은 약 ${formatWon(exampleResult.targetDaily)}입니다. 실제 결과는 계산기에 입력한 조건에 따라 달라집니다.`,
    definition: '하루 목표 매출은 월 고정비와 월 목표수익을 공헌이익률로 나눈 뒤 월 영업일로 나눈 예상 기준입니다.',
    howItWorks: '변동비율을 제외한 공헌이익률을 구하고, 손익분기 매출과 목표수익을 포함한 목표 매출을 각각 계산합니다.',
    formula: '공헌이익률 = 1 - 평균 변동비율\n손익분기 월매출 = 월 고정비 / 공헌이익률\n손익분기 일매출 = 손익분기 월매출 / 월 영업일\n목표 월매출 = (월 고정비 + 월 목표수익) / 공헌이익률\n하루 목표 매출 = 목표 월매출 / 월 영업일\n필요 고객 수 = 하루 목표 매출 / 평균 객단가',
    example: {
      title: '월 고정비 4,000,000원, 변동비율 35%, 목표수익 3,000,000원, 월 영업일 26일',
      inputs: exampleInput,
      result: { contributionRate: formatPercent(exampleResult.contributionRate), targetMonthly: formatWon(exampleResult.targetMonthly), targetDaily: formatWon(exampleResult.targetDaily) },
      explanation: `계산 결과 공헌이익률 ${formatPercent(exampleResult.contributionRate)}, 목표 월매출 ${formatWon(exampleResult.targetMonthly)}, 하루 목표 매출 ${formatWon(exampleResult.targetDaily)}입니다.`,
    },
    limitations: ['입력한 비용과 조건을 바탕으로 한 단순 추정치입니다.', '실제 세금, 부가가치세, 금융비용 및 기타 비용에 따라 달라질 수 있습니다.', '목표수익은 세후 실수령액이 아니라 비용 충당 후 목표하는 추가 금액입니다.'],
    faq: [
      { question: '목표수익은 월급인가요?', answer: '아닙니다. 고정비를 충당한 뒤 추가로 목표하는 금액입니다.' },
      { question: '평균 객단가를 입력하지 않아도 되나요?', answer: '네. 하루 목표 매출까지는 계산할 수 있고, 객단가를 입력하면 필요한 고객/주문 수를 계산합니다.' },
    ],
  },
  interaction: { inputs: [], outputs: [], calculator: 'daily-sales-target' },
  relations: {
    relatedTools: [],
    relatedDecisions: [
      { toolId: 'selling-price', question: '이 매출을 만들려면 얼마에 팔아야 할까요?', label: '판매가격과 비용을 빼고 남는 금액을 계산해보세요.' },
      { toolId: 'price-change', question: '가격을 바꾸면 필요한 판매량은 어떻게 달라질까요?', label: '가격 변경에 따른 판매량 변화를 확인해보세요.' },
      { toolId: 'hiring-profit', question: '직원을 한 명 더 쓰려면 매출이 얼마나 더 필요할까요?', label: '추가 직원 비용에 필요한 매출을 계산해보세요.' },
    ],
    sources: ['sajang-daily-sales-spec'],
  },
  maintenance: { reviewedAt: '2026-09-08' },
};

export const dailySalesTargetProject: ProjectDefinition = {
  id: 'sajang', name: '사장도구', description: '장사를 하며 필요한 숫자를 계산하는 도구', locale: 'ko-KR', baseUrl: '/', owner: 'Sajang', navigation: [],
  features: { localStorage: false, analytics: true, ads: false, remoteData: false }, theme: { id: 'working-ledger' },
  categories: [{ id: 'sales', name: '매출', question: '오늘 얼마 팔아야 하지?', description: '매출 기준을 계산합니다.', tools: ['daily-sales-target'], status: 'published' }],
  tools: [dailySalesTargetTool], sources: dailySalesTargetSources,
};
