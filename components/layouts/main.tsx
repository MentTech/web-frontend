import Header from '@components/common/Header';
import { LayoutProps } from '@models/common';
import * as React from 'react';

export function MainLayout ({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div>
        {children}
      </div>
    </>
  );
}
