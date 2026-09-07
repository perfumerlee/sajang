import type { CalculatorResolver, ProjectDefinition, ToolDefinition } from './contracts';

export interface ValidationIssue {
  path: string;
  message: string;
}

export class DefinitionValidationError extends Error {
  constructor(public readonly issues: ValidationIssue[]) {
    super(issues.map(({ path, message }) => `${path}: ${message}`).join('\n'));
    this.name = 'DefinitionValidationError';
  }
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function duplicateValues(values: string[]): string[] {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

function validateTool(tool: ToolDefinition, project: ProjectDefinition, calculatorResolver: CalculatorResolver, issues: ValidationIssue[]): void {
  const path = `tools[${tool.identity.id}]`;
  if (!ID_PATTERN.test(tool.identity.id)) issues.push({ path: `${path}.identity.id`, message: 'must be a lowercase kebab-case ID' });
  if (!ID_PATTERN.test(tool.identity.slug)) issues.push({ path: `${path}.identity.slug`, message: 'must be a lowercase kebab-case slug' });
  if (!project.categories.some((category) => category.id === tool.identity.category)) {
    issues.push({ path: `${path}.identity.category`, message: 'referenced category does not exist' });
  }
  if (!calculatorResolver(tool.interaction.calculator)) {
    issues.push({ path: `${path}.interaction.calculator`, message: 'calculator cannot be resolved' });
  }
  for (const related of tool.relations.relatedTools) {
    if (!project.tools.some((candidate) => candidate.identity.id === related.toolId)) {
      issues.push({ path: `${path}.relations.relatedTools`, message: `related tool '${related.toolId}' does not exist` });
    }
  }
  for (const sourceId of tool.relations.sources) {
    if (!projectSources(project, sourceId)) {
      issues.push({ path: `${path}.relations.sources`, message: `source '${sourceId}' does not exist` });
    }
  }
  if (tool.identity.status === 'published') {
    const required = [
      ['search.title', tool.search.title],
      ['search.description', tool.search.description],
      ['knowledge.shortAnswer', tool.knowledge.shortAnswer],
      ['knowledge.example', tool.knowledge.example],
    ] as const;
    for (const [field, value] of required) {
      if (!value || (typeof value === 'string' && !hasText(value))) issues.push({ path: `${path}.${field}`, message: 'is required for a published tool' });
    }
  }
  if (!isValidDate(tool.maintenance.reviewedAt)) {
    issues.push({ path: `${path}.maintenance.reviewedAt`, message: 'must be a valid YYYY-MM-DD date' });
  }
}

function projectSources(project: ProjectDefinition, sourceId: string): boolean {
  return project.sources.some((source) => source.id === sourceId);
}

export function validateProjectDefinition(project: ProjectDefinition, calculatorResolver: CalculatorResolver): void {
  const issues: ValidationIssue[] = [];
  if (!ID_PATTERN.test(project.id)) issues.push({ path: 'project.id', message: 'must be a lowercase kebab-case ID' });
  const categoryIds = project.categories.map((category) => category.id);
  for (const duplicate of duplicateValues(categoryIds)) issues.push({ path: 'categories', message: `duplicate category ID '${duplicate}'` });
  const toolIds = project.tools.map((tool) => tool.identity.id);
  const slugs = project.tools.map((tool) => tool.identity.slug);
  for (const duplicate of duplicateValues(toolIds)) issues.push({ path: 'tools', message: `duplicate tool ID '${duplicate}'` });
  for (const duplicate of duplicateValues(slugs)) issues.push({ path: 'tools', message: `duplicate tool slug '${duplicate}'` });
  for (const tool of project.tools) validateTool(tool, project, calculatorResolver, issues);
  if (issues.length > 0) throw new DefinitionValidationError(issues);
}
