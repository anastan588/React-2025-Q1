'use client';
import '$/styles/index.css';

import React from 'react';

import StoreProvider from '../components/context/StoreProvider';
import { ThemeProvider } from '$/components';
import { ErrorBoundary, SoundProvider } from '$/components';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <SoundProvider>
            <ThemeProvider>
              <ErrorBoundary>{children}</ErrorBoundary>
            </ThemeProvider>
          </SoundProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
