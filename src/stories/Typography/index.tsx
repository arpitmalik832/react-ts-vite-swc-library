import tokens from '../../../static/enums/design_tokens.json';
import type { TypographyScaleObject } from './types';
import classnames from '../../utils/classNames';
import { capitalizeFirstChar } from '../../utils/stringUtils';

import s from './index.module.scss';

const Typography = () => {
  const getStyleObject = (
    input: TypographyScaleObject,
  ): Record<string, string> => {
    const styles: [PropertyKey, string][] = Object.entries(input).map(
      ([property, valueObj]) => {
        const propName = property
          ?.split('-')
          ?.map((namePart, idx) =>
            idx > 0 ? capitalizeFirstChar(namePart) : namePart,
          )
          ?.join('');
        return [propName, valueObj.value];
      },
    );
    return Object.fromEntries<string>(styles);
  };

  return (
    <div className={s.typeContainer}>
      <section className={classnames(s.section, s.scaleSection)}>
        <div className={s.sectionHeading}>Type Scale</div>
        <table className={s.scaleTable}>
          <thead>
            <tr>
              <th>Scale Category</th>
              <th>Size</th>
              <th>Line Height</th>
              <th>Letter Spacing</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tokens?.typography?.scale).map(([name, meta]) => (
              <tr key={name}>
                <td
                  style={{
                    ...getStyleObject(meta),
                    fontWeight: 700,
                  }}
                >
                  {name}
                </td>
                <td>{meta['font-size'].value.replace('px', '')}</td>
                <td>{meta['line-height'].value.replace('px', '')}</td>
                <td>
                  {parseFloat(meta['letter-spacing'].value.replace('px', '')) /
                    1.0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className={classnames(s.section, s.weightSection)}>
        <div className={s.sectionHeading}>Type Weight</div>
        <div className={s.sectionBody}>
          {Object.entries(tokens?.typography?.weight).map(([weight, meta]) => (
            <div key={weight} className={s.weightContainer}>
              <div className={s.weightName}>{capitalizeFirstChar(weight)}</div>
              <div className={s.weightDemoContainer}>
                {Object.entries(tokens?.typography?.scale).map(
                  ([name, scalesMeta]) => (
                    <div
                      key={name}
                      style={{
                        ...getStyleObject(scalesMeta),
                        fontWeight: meta.value,
                      }}
                    >
                      {`${name} - ${scalesMeta['font-size'].value.replace(
                        'px',
                        '',
                      )}/${scalesMeta['line-height'].value.replace('px', '')}`}
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Typography;
