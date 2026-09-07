import type { ProjectDefinition, ToolDefinition } from '../../../src/engine/contracts';

export const unitConverterTool: ToolDefinition = {
  identity: { id: 'length-converter', slug: 'length-converter', category: 'length', status: 'published', version: '0.1.0' },
  search: { question: 'How many centimeters are in a meter?', name: 'Length converter', title: 'Length converter | Unit Fixture', description: 'Convert meters to centimeters with a simple calculation.' },
  knowledge: {
    shortAnswer: 'Enter a value in meters to see the equivalent number of centimeters.',
    definition: 'This tool converts a length from meters to centimeters.',
    howItWorks: 'The input value is multiplied by 100.',
    formula: 'centimeters = meters × 100',
    example: { title: '1 meter', inputs: { meters: 1 }, result: { centimeters: 100 }, explanation: 'One meter equals 100 centimeters.' },
    limitations: ['This is a direct unit conversion and does not measure physical objects.'],
    faq: [{ question: 'Can I enter decimals?', answer: 'Yes, decimal meter values are supported.' }],
  },
  interaction: { inputs: [{ kind: 'number', id: 'meters', label: 'Meters', required: true, min: 0, inputMode: 'decimal' }], outputs: [{ id: 'centimeters', label: 'Centimeters', unit: 'cm', kind: 'primary' }], calculator: 'meters-to-centimeters' },
  relations: { relatedTools: [], sources: ['unit-fixture-source'] },
  maintenance: { reviewedAt: '2026-09-08' },
};

export const unitConverterProject: ProjectDefinition = {
  id: 'unit-fixture', name: 'Unit Fixture', description: 'A test project for reusable Tool Site Engine contracts.', locale: 'en', baseUrl: '/', owner: 'Fixture', navigation: [],
  features: { localStorage: false, analytics: false, ads: false, remoteData: false }, theme: { id: 'plain-fixture', tokens: { paper: '#ffffff' } },
  categories: [{ id: 'length', name: 'Length', question: 'How long is it?', description: 'Basic length conversions.', tools: ['length-converter'], status: 'published' }],
  tools: [unitConverterTool], sources: [{ id: 'unit-fixture-source', title: 'Unit Fixture reference' }],
};
