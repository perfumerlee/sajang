import { describe, expect, it } from 'vitest';
import type { ProjectDefinition } from '../src/engine/contracts';
import { DefinitionValidationError, validateProjectDefinition } from '../src/engine/validation';

const validTool = {
  identity: { id: 'unit-tool', slug: 'unit-tool', category: 'general', status: 'published' as const, version: '0.1.0' },
  search: { question: 'How much?', name: 'Unit Tool', title: 'Unit Tool', description: 'A useful unit tool.' },
  knowledge: {
    shortAnswer: 'A short answer.', definition: 'A definition.', howItWorks: 'It works.', formula: 'a + b',
    example: { title: 'Example', inputs: { value: 1 }, result: { total: 2 }, explanation: 'Verified.' },
    limitations: ['Limited example'], faq: [{ question: 'Why?', answer: 'Because.' }],
  },
  interaction: { inputs: [], outputs: [], calculator: 'unit-calculator' },
  relations: { relatedTools: [], sources: ['source-1'] },
  maintenance: { reviewedAt: '2026-09-08' },
};

function project(overrides: Partial<ProjectDefinition> = {}): ProjectDefinition {
  return {
    id: 'test-project', name: 'Test Project', description: 'Fixture project', locale: 'en', baseUrl: '/', owner: 'Test',
    navigation: [], features: { localStorage: false, analytics: false, ads: false, remoteData: false }, theme: { id: 'plain' },
    sources: [{ id: 'source-1', title: 'Test source' }],
    categories: [{ id: 'general', name: 'General', question: 'What?', description: 'General tools', tools: ['unit-tool'], status: 'published' }],
    tools: [validTool], ...overrides,
  };
}

const resolver = (id: string) => id === 'unit-calculator' ? () => ({ total: 2 }) : undefined;

describe('foundation', () => {
  it('has a working test environment', () => {
    expect(true).toBe(true);
  });

  it('accepts a valid project definition', () => {
    expect(() => validateProjectDefinition(project(), resolver)).not.toThrow();
  });

  it('rejects duplicate IDs and slugs', () => {
    const duplicate = { ...validTool, identity: { ...validTool.identity, id: 'unit-tool-2', slug: 'unit-tool' } };
    expect(() => validateProjectDefinition(project({ tools: [validTool, duplicate] }), resolver)).toThrow(/duplicate tool slug/);
  });

  it('rejects a missing related tool', () => {
    const tool = { ...validTool, relations: { ...validTool.relations, relatedTools: [{ toolId: 'missing-tool' }] } };
    expect(() => validateProjectDefinition(project({ tools: [tool] }), resolver)).toThrow(/related tool 'missing-tool'/);
  });

  it('rejects an unresolved source', () => {
    const tool = { ...validTool, relations: { ...validTool.relations, sources: ['missing-source'] } };
    expect(() => validateProjectDefinition(project({ tools: [tool] }), resolver)).toThrow(/source 'missing-source'/);
  });

  it('rejects an invalid published tool', () => {
    const tool = { ...validTool, search: { ...validTool.search, title: '' }, maintenance: { reviewedAt: '2026-02-30' } };
    expect(() => validateProjectDefinition(project({ tools: [tool] }), resolver)).toThrow(DefinitionValidationError);
  });
});
