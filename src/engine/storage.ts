export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  key(index: number): string | null;
  readonly length: number;
}

interface StoredValue<T> { version: number; value: T; }

const STORAGE_VERSION = 1;
const getBrowserStorage = (): StorageLike | undefined => {
  try { return typeof window !== 'undefined' && window.localStorage ? window.localStorage : undefined; }
  catch { return undefined; }
};

export function createProjectStorage(projectId: string, storage: StorageLike | undefined = getBrowserStorage()) {
  const prefix = `toolsite:${projectId}:`;
  const keyFor = (scope: string, key: string) => `${prefix}${scope}:${key}`;
  const safe = <T>(action: () => T, fallback: T): T => { try { return action(); } catch { return fallback; } };
  return {
    get<T>(scope: string, key: string): T | undefined {
      return safe(() => { if (!storage) return undefined; const raw = storage.getItem(keyFor(scope, key)); if (!raw) return undefined; const parsed = JSON.parse(raw) as StoredValue<T>; return parsed.version === STORAGE_VERSION ? parsed.value : undefined; }, undefined);
    },
    set<T>(scope: string, key: string, value: T): boolean {
      return safe(() => { if (!storage) return false; storage.setItem(keyFor(scope, key), JSON.stringify({ version: STORAGE_VERSION, value } satisfies StoredValue<T>)); return true; }, false);
    },
    remove(scope: string, key: string): boolean { return safe(() => { if (!storage) return false; storage.removeItem(keyFor(scope, key)); return true; }, false); },
    clearScope(scope: string): number {
      return safe(() => { if (!storage) return 0; const prefixForScope = `${prefix}${scope}:`; const keys: string[] = []; for (let i = 0; i < storage.length; i += 1) { const key = storage.key(i); if (key?.startsWith(prefixForScope)) keys.push(key); } keys.forEach((key) => storage.removeItem(key)); return keys.length; }, 0);
    },
  };
}
