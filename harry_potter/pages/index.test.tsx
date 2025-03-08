import { waitFor } from '@testing-library/react';
import { IncomingMessage, ServerResponse } from 'http';
import { GetServerSidePropsContext } from 'next';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { getServerSideProps } from '.';

vi.mock('$components', () => ({
  potterApi: {
    endpoints: {
      getCharacters: {
        initiate: vi.fn().mockResolvedValue({ data: [] }),
      },
    },
    util: {
      getRunningQueriesThunk: vi.fn(),
    },
  },
}));

describe('AppPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  interface CustomIncomingMessage extends IncomingMessage {
    cookies: Partial<{ [key: string]: string }>;
  }

  const mockContext = (
    query: Record<string, string>
  ): GetServerSidePropsContext => ({
    req: {
      method: 'GET',
      headers: {},
      url: '/?page=1&details=123',
      cookies: {},
    } as CustomIncomingMessage,
    res: {} as ServerResponse,
    query,
    resolvedUrl: '?page=1&details=123',
  });

  test('should handle details page correctly', async () => {
    const context = mockContext({ details: '123' });
    const result = await getServerSideProps(context);
    await waitFor(() => {
      expect(result).haveOwnProperty('props');
    });
  });
});
