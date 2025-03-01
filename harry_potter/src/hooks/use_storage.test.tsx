import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { useSearchStringLS } from '$/hooks';

describe('useSearchStringLS Hook', () => {
  const mockKey = 'testKey';
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  test('check local storage value', async () => {
    localStorage.setItem(mockKey, 'testValue');
    const { result } = renderHook(() => useSearchStringLS(mockKey));
    expect(result.current[0]).toBe('testValue');
  });
});
