export type ToolStatus = 'draft' | 'published' | 'archived';

export interface ProjectFeatures {
  localStorage: boolean;
  analytics: boolean;
  ads: boolean;
  remoteData: boolean;
}

export interface ProjectThemeReference {
  id: string;
  tokens?: Record<string, string>;
}

export interface ProjectNavigationItem {
  label: string;
  href: string;
}

export interface ProjectDefinition {
  id: string;
  name: string;
  description: string;
  locale: string;
  baseUrl: string;
  owner: string;
  navigation: ProjectNavigationItem[];
  features: ProjectFeatures;
  theme: ProjectThemeReference;
  categories: CategoryDefinition[];
  tools: ToolDefinition[];
  sources: SourceDefinition[];
}

export interface CategoryDefinition {
  id: string;
  name: string;
  question: string;
  description: string;
  tools: string[];
  status: ToolStatus;
}

export interface ToolIdentity {
  id: string;
  slug: string;
  category: string;
  status: ToolStatus;
  version: string;
}

export interface ToolSearchContent {
  question: string;
  name: string;
  title: string;
  description: string;
}

export interface ToolKnowledgeContent {
  shortAnswer: string;
  definition: string;
  howItWorks: string;
  formula: string;
  example: VerifiedExampleDefinition;
  limitations: string[];
  faq: Array<{ question: string; answer: string }>;
}

export type InputDefinition =
  | NumericInputDefinition
  | SelectInputDefinition
  | ToggleInputDefinition;

export type NumericInputKind =
  | 'money'
  | 'percentage'
  | 'number'
  | 'quantity'
  | 'days';

export interface NumericInputDefinition {
  kind: NumericInputKind;
  id: string;
  label: string;
  description?: string;
  unit?: string;
  required: boolean;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  inputMode?: 'decimal' | 'numeric';
}

export interface SelectInputDefinition {
  kind: 'select';
  id: string;
  label: string;
  description?: string;
  unit?: string;
  required: boolean;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
}

export interface ToggleInputDefinition {
  kind: 'toggle';
  id: string;
  label: string;
  description?: string;
  required: boolean;
  defaultValue?: boolean;
}

export interface OutputDefinition {
  id: string;
  label: string;
  unit?: string;
  kind: 'primary' | 'secondary' | 'comparison' | 'breakdown' | 'interpretation' | 'warning' | 'error';
}

export interface RelatedToolDefinition {
  toolId: string;
  label?: string;
}

export interface SourceDefinition {
  id: string;
  title: string;
  url?: string;
  publisher?: string;
}

export interface VerifiedExampleDefinition {
  title: string;
  inputs: Record<string, number | string | boolean>;
  result: Record<string, number | string>;
  explanation: string;
}

export interface ToolDefinition {
  identity: ToolIdentity;
  search: ToolSearchContent;
  knowledge: ToolKnowledgeContent;
  interaction: {
    inputs: InputDefinition[];
    outputs: OutputDefinition[];
    calculator: string;
  };
  relations: {
    relatedTools: RelatedToolDefinition[];
    sources: string[];
  };
  maintenance: {
    publishedAt?: string;
    reviewedAt: string;
    dataEffectiveAt?: string;
  };
}

export type CalculatorResolver = (calculatorId: string) => ((input: unknown) => unknown) | undefined;
