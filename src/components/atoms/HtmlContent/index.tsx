import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { HtmlContentProps } from './types';

const HtmlContent = (props: HtmlContentProps) => {
  const { title, description } = props;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`${description}`} />
      </Helmet>
    </HelmetProvider>
  );
};

export default HtmlContent;
