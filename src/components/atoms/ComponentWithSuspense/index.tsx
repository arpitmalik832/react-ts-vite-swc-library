import { Suspense } from 'react';

import Loader from '../../organisms/Loader';
import type { ComponentWithSuspenseProps } from './types';

const ComponentWithSuspense = (props: ComponentWithSuspenseProps) => {
  const { component, fallback = <Loader /> } = props;

  return <Suspense fallback={fallback}>{component}</Suspense>;
};

export default ComponentWithSuspense;
