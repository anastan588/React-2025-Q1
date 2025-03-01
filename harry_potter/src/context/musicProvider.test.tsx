import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { SoundContext, SoundProvider } from '$/context';

interface MockAudio {
  play: () => Promise<void>;
  pause: () => void;
  loop: boolean;
}

describe('SoundProvider Component', () => {
  let audioElementMock: MockAudio;

  beforeEach(() => {
    audioElementMock = {
      play: vi.fn().mockResolvedValue(undefined),
      pause: vi.fn(),
      loop: false,
    };
    global.Audio = vi.fn(() => audioElementMock) as unknown as typeof Audio;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('plays audio', () => {
    render(
      <SoundProvider>
        <SoundContext.Consumer>
          {({ sound, toggleSound }) => (
            <div>
              <div>{sound}</div>
              <button onClick={toggleSound}>Toggle Sound</button>
            </div>
          )}
        </SoundContext.Consumer>
      </SoundProvider>
    );
    const button = screen.getByText('Toggle Sound');
    fireEvent.click(button);
    expect(audioElementMock.play).toHaveBeenCalled();
    fireEvent.click(button);
    expect(audioElementMock.pause).toHaveBeenCalled();
  });

  test('sets audio to loop', () => {
    render(
      <SoundProvider>
        <SoundContext.Consumer>{() => null}</SoundContext.Consumer>
      </SoundProvider>
    );
    expect(audioElementMock.loop).toBe(true);
  });
});
