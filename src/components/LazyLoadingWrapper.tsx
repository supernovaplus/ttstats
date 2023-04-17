import React, { Suspense } from 'react';
import PageWrapper from './PageWrapper';

// const gagasdgasdg = React.lazy(() => import(filePath));

interface Props {
  component: React.ComponentType;
}

export default function LazyLoadingWrapper({ component: Component }: Props) {
  return (
    <Suspense fallback={<PageWrapper title="Loading..."></PageWrapper>}>
      <Component />
    </Suspense>
  );
}
