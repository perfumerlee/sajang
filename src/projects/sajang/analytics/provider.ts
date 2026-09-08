import { createAnalytics, type AnalyticsEventName, type AnalyticsIdentity } from '../../../engine/analytics';

const GTM_CONTAINER_ID = 'GTM-WTHLSBXR';
type DataLayerEntry = { event: AnalyticsEventName } & Record<string, string>;

const adapter = {
  dispatch(event: AnalyticsEventName, identity: AnalyticsIdentity): void {
    if (typeof window === 'undefined') return;
    const dataLayer = ((window as Window & { dataLayer?: DataLayerEntry[] }).dataLayer ??= []);
    const payload: DataLayerEntry = { event, project_id: identity.projectId, tool_id: identity.toolId };
    if (identity.categoryId) payload.category_id = identity.categoryId;
    if (identity.destinationToolId) payload.destination_tool_id = identity.destinationToolId;
    dataLayer.push(payload);
  },
};

export const sajangAnalytics = createAnalytics({ enabled: import.meta.env.PROD, adapter });
export const sajangGtmContainerId = GTM_CONTAINER_ID;

export function trackSajangEvent(event: AnalyticsEventName, identity: AnalyticsIdentity): void {
  sajangAnalytics.track(event, identity);
}
