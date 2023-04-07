import { ReactNode } from 'react';

export const repeatComponentForDebug = (component: ReactNode, num: number) => {
  return <>{new Array(num).fill(1).map((item) => component)}</>;
};
