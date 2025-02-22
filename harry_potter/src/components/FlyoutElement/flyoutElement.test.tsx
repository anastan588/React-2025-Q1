import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { FlyoutElement } from '$/components';
import { store } from '$/data';

describe('Flyout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => 'mockedUrl');
  });

  test('renders Flyout with correct content', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <FlyoutElement />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Unselect all'));
    expect(screen.getByText('Download'));
  });

  test('calls createObjectURL', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <FlyoutElement />
        </Provider>
      </MemoryRouter>
    );
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
});
