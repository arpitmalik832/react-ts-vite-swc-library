import { FunctionComponent, useEffect, useRef, useState } from 'react';

import iconsList from '../../../static/enums/icons_list';
import { capitalizeFirstChar } from '../../utils/stringUtils';
import { copyToClipboard } from '../../utils/commonUtils';
import { errorLog, log } from '../../utils/logsUtils';
import { IconProps } from '../../types/types.d';

import s from './index.module.scss';

const Icon = (props: IconProps) => {
  const { name } = props;
  const ImportedIconRef = useRef<FunctionComponent | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    import(`../../assets/icons/${name}`)
      .then((comp: SVGComponent) => {
        ImportedIconRef.current = comp.ReactComponent;
        setLoading(false);
      })
      .catch((e: Error) => {
        errorLog('Failed to fetch icon: ', e);
      });
  }, []);

  if (!name || loading || !ImportedIconRef.current) return null;
  // eslint-disable-next-line react/jsx-pascal-case
  return <ImportedIconRef.current />;
};

const Icons = () => {
  const [currentIcon, setCurrentIcon] = useState('');

  const getImportPath = () =>
    `import { ReactComponent as ${capitalizeFirstChar(
      currentIcon.split('/')[1].replace('.svg', ''),
    )} } from 'library_name/icons/${currentIcon}'`;

  const renderIconSection = (
    size: 'sm16' | 'rg24' | 'lg32',
    icons: typeof iconsList,
  ) => (
    <section className={s.iconSection}>
      <div className={s.sectionName}>{size}</div>
      <div className={s.icons}>
        {icons?.map((icon: string) => (
          <div
            role="button"
            tabIndex={0}
            aria-pressed="false"
            className={s.iconBox}
            key={icon}
            onClick={() => {
              setCurrentIcon(icon);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrentIcon(icon);
              }
            }}
          >
            <Icon name={icon} />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className={s.iconsListContainer}>
      {renderIconSection(
        'sm16',
        iconsList.filter((icon: string) => icon.includes('sm16'))?.sort(),
      )}
      {renderIconSection(
        'rg24',
        iconsList.filter((icon: string) => icon.includes('rg24'))?.sort(),
      )}
      {renderIconSection(
        'lg32',
        iconsList.filter((icon: string) => icon.includes('lg32'))?.sort(),
      )}
      {currentIcon && (
        <div className={s.modal}>
          <div
            role="button"
            tabIndex={0}
            aria-label="icon"
            aria-pressed="false"
            className={s.backdrop}
            onClick={() => {
              setCurrentIcon('');
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrentIcon('');
              }
            }}
          />
          <div className={s.content}>
            <section className={s.titleSection}>
              <div className={s.iconName}>{currentIcon}</div>
              <span
                role="button"
                tabIndex={0}
                aria-pressed="false"
                className={s.dismissIcon}
                onClick={() => {
                  setCurrentIcon('');
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setCurrentIcon('');
                  }
                }}
              >
                Close
              </span>
            </section>
            <section className={s.codeSection}>
              <code className={s.code}>{getImportPath()}</code>
              <span
                role="button"
                tabIndex={0}
                aria-pressed="false"
                className={s.copyIcon}
                onClick={() => {
                  copyToClipboard(getImportPath(), () => {
                    log('copied');
                  });
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    copyToClipboard(getImportPath(), () => {
                      log('copied');
                    });
                  }
                }}
              >
                Copy
              </span>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Icons;
