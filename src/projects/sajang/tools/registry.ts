import type { ToolDefinition } from '../../../engine/contracts';
import { dailySalesTargetTool } from './daily-sales-target/definition';
import { sellingPriceTool } from './selling-price/definition';
import { priceChangeTool } from './price-change/definition';
import { discountProfitTool } from './discount-profit/definition';
import { hiringProfitTool } from './hiring-profit/definition';

export const sajangTools: ToolDefinition[] = [dailySalesTargetTool, sellingPriceTool, priceChangeTool, discountProfitTool, hiringProfitTool];

export function resolveRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  const seen = new Set<string>();
  return (tool.relations.relatedDecisions ?? [])
    .map((relation) => sajangTools.find((candidate) => candidate.identity.id === relation.toolId))
    .filter((candidate): candidate is ToolDefinition => {
      if (!candidate || candidate.identity.id === tool.identity.id || candidate.identity.status !== 'published' || seen.has(candidate.identity.id)) return false;
      seen.add(candidate.identity.id);
      return true;
    });
}
