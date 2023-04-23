import React, { Suspense } from 'react';
import ContentBlock from './ContentBlock';

// const gagasdgasdg = React.lazy(() => import(filePath));

interface Props {
  component: React.ComponentType;
}

export default function LazyLoadingWrapper({ component: Component }: Props) {
  return (
    <Suspense fallback={<ContentBlock title="Loading..."/>}>
      <Component />
    </Suspense>
  );
}
