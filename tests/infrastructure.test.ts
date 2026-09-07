import { describe, expect, it, vi } from 'vitest';
import { createProjectStorage, type StorageLike } from '../src/engine/storage';
import { createAnalytics } from '../src/engine/analytics';

function memoryStorage(): StorageLike {
  const values = new Map<string, string>();
  return { get length() { return values.size; }, getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); }, key: (index) => [...values.keys()][index] ?? null };
}

describe('PHASE 13 infrastructure safety', () => {
  it('provides project-scoped storage with safe read/write/remove/clear', () => {
    const storage = memoryStorage(); const sajang = createProjectStorage('sajang', storage); const other = createProjectStorage('other', storage);
    expect(sajang.set('tool', 'draft', { value: 1 })).toBe(true); expect(sajang.get('tool', 'draft')).toEqual({ value: 1 });
    expect(other.get('tool', 'draft')).toBeUndefined(); expect(sajang.remove('tool', 'draft')).toBe(true); expect(sajang.get('tool', 'draft')).toBeUndefined();
    sajang.set('tool', 'one', 1); sajang.set('other', 'two', 2); other.set('tool', 'foreign', 3); expect(sajang.clearScope('tool')).toBe(1); expect(other.get('tool', 'foreign')).toBe(3); expect(sajang.get('other', 'two')).toBe(2);
  });

  it('falls back safely for malformed, unavailable, throwing, and version-mismatched storage', () => {
    const storage = memoryStorage(); storage.setItem('toolsite:sajang:tool:bad', '{'); storage.setItem('toolsite:sajang:tool:old', JSON.stringify({ version: 99, value: 1 }));
    const adapter = createProjectStorage('sajang', storage); expect(adapter.get('tool', 'bad')).toBeUndefined(); expect(adapter.get('tool', 'old')).toBeUndefined();
    const unavailable = createProjectStorage('sajang', undefined); expect(unavailable.get('tool', 'x')).toBeUndefined(); expect(unavailable.set('tool', 'x', 1)).toBe(false); expect(unavailable.clearScope('tool')).toBe(0);
    const throwing = { ...storage, getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('quota'); } }; const safe = createProjectStorage('sajang', throwing); expect(safe.get('tool', 'x')).toBeUndefined(); expect(safe.set('tool', 'x', 1)).toBe(false);
  });

  it('dispatches only identity metadata when explicitly enabled and never lets providers break flow', () => {
    const dispatch = vi.fn(); const disabled = createAnalytics({ enabled: false, adapter: { dispatch } });
    disabled.track('tool_calculate', { projectId: 'sajang', toolId: 'daily-sales-target' }); expect(dispatch).not.toHaveBeenCalled();
    const enabled = createAnalytics({ enabled: true, adapter: { dispatch } }); enabled.track('related_tool_click', { projectId: 'sajang', categoryId: 'sales', toolId: 'daily-sales-target', destinationToolId: 'selling-price' }); expect(dispatch).toHaveBeenCalledWith('related_tool_click', expect.objectContaining({ projectId: 'sajang', toolId: 'daily-sales-target', destinationToolId: 'selling-price' }));
    const failing = createAnalytics({ enabled: true, adapter: { dispatch: () => { throw new Error('provider'); } } }); expect(() => failing.track('tool_view', { projectId: 'sajang', toolId: 'daily-sales-target' })).not.toThrow();
  });

  it('keeps automatic persistence and provider activation absent from production contracts', () => {
    const source = ['src/projects/sajang/tools/daily-sales-target/client.ts', 'src/projects/sajang/tools/selling-price/client.ts', 'src/projects/sajang/tools/price-change/client.ts', 'src/projects/sajang/tools/discount-profit/client.ts', 'src/projects/sajang/tools/hiring-profit/client.ts'].map((path) => require('node:fs').readFileSync(path, 'utf8')).join('\n');
    expect(source).not.toMatch(/localStorage|sessionStorage|URLSearchParams|fetch\(/);
  });
});
