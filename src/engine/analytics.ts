export type AnalyticsEventName = 'tool_view' | 'tool_calculate' | 'related_tool_click';
export interface AnalyticsIdentity { projectId: string; categoryId?: string; toolId: string; destinationToolId?: string; }
export interface AnalyticsAdapter { dispatch(event: AnalyticsEventName, identity: AnalyticsIdentity): void; }

export function createAnalytics(options: { enabled: boolean; adapter?: AnalyticsAdapter }) {
  return {
    track(event: AnalyticsEventName, identity: AnalyticsIdentity): void {
      if (!options.enabled || !options.adapter) return;
      try { options.adapter.dispatch(event, { projectId: identity.projectId, categoryId: identity.categoryId, toolId: identity.toolId, destinationToolId: identity.destinationToolId }); } catch { /* optional infrastructure must not affect the application */ }
    },
  };
}
