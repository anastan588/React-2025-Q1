import '$/styles/index.css';

import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ThemeProvider } from '$/components';
import { ErrorBoundary, SoundProvider } from '$/components';
import { wrapper } from '$/components';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <SoundProvider>
        <ThemeProvider>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </SoundProvider>
    </Provider>
  );
};

export default MyApp;
