import { Suspense } from 'react';

import Loader from '../../organisms/Loader';
import { ComponentWithSuspenseProps } from '../../../types/types.d';

function ComponentWithSuspense(props: ComponentWithSuspenseProps) {
  const { component, fallback = <Loader /> } = props;

  return <Suspense fallback={fallback}>{component}</Suspense>;
}

export default ComponentWithSuspense;
