import type { SourceDefinition, ToolDefinition } from '../../../engine/contracts';

export const staticTool: ToolDefinition = {
  identity: { id: 'unit-converter', slug: 'unit-converter', category: 'general', status: 'published', version: '0.1.0' },
  search: {
    question: '단위를 어떻게 바꾸나요?',
    name: '단위 변환 예시',
    title: '단위 변환을 확인하는 방법',
    description: '공통 단위 변환의 구조를 설명하는 정적 fixture 문서입니다.',
  },
  knowledge: {
    shortAnswer: '기준 단위에 변환 계수를 곱해 결과 단위로 바꿉니다.',
    definition: '단위 변환은 같은 양을 다른 표기 단위로 표현하는 과정입니다.',
    howItWorks: '입력값과 변환 계수를 확인한 뒤 결과를 정적 문서에 표시합니다.',
    formula: '결과값 = 입력값 × 변환 계수',
    example: {
      title: '미터를 센티미터로 변환',
      inputs: { 입력값: 2, 변환계수: 100 },
      result: { 결과값: '200cm' },
      explanation: '2m에 100을 곱하면 200cm가 됩니다.',
    },
    limitations: ['이 fixture는 정적 콘텐츠 렌더링만 보여줍니다.', '실시간 입력과 계산은 PHASE 4 범위입니다.'],
    faq: [{ question: '이 페이지에서 값을 입력할 수 있나요?', answer: '아닙니다. 현재는 JavaScript 없이 읽는 지식 문서입니다.' }],
  },
  interaction: { inputs: [], outputs: [], calculator: 'fixture-calculator' },
  relations: { relatedTools: [], sources: ['fixture-source'] },
  maintenance: { reviewedAt: '2026-09-08' },
};

export const staticToolSources: SourceDefinition[] = [{ id: 'fixture-source', title: 'Sajang Engine fixture specification' }];
