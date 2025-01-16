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
        return [propName, valueObj?.value];
      },
    );
    return Object.fromEntries<string>(styles);
  };

  return (
    <div className={s.typeContainer}>
      <section className={classnames(s.section, s.scaleSection)}>
        <div className={s.sectionHeading} data-testid="type-scale-heading">
          Type Scale
        </div>
        <table className={s.scaleTable} data-testid="scale-table">
          <thead data-testid="scale-table-head">
            <tr>
              <th data-testid="scale-category-head">Scale Category</th>
              <th data-testid="size-head">Size</th>
              <th data-testid="line-height-head">Line Height</th>
              <th data-testid="letter-spacing-head">Letter Spacing</th>
            </tr>
          </thead>
          <tbody data-testid="scale-table-body">
            {Object.entries(tokens?.typography?.scale).map(([name, meta]) => (
              <tr key={name}>
                <td
                  style={{
                    ...getStyleObject(meta),
                    fontWeight: 700,
                  }}
                  data-testid={`scale-${name}`}
                >
                  {name}
                </td>
                <td data-testid={`font-size-${name}`}>
                  {meta['font-size']?.value}
                </td>
                <td data-testid={`line-height-${name}`}>
                  {meta['line-height']?.value}
                </td>
                <td data-testid={`letter-spacing-${name}`}>
                  {parseFloat(meta['letter-spacing']?.value) / 1.0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className={classnames(s.section, s.weightSection)}>
        <div className={s.sectionHeading} data-testid="type-weight-heading">
          Type Weight
        </div>
        <div className={s.sectionBody}>
          {tokens?.typography?.weight &&
            Object.entries(tokens?.typography?.weight).map(([weight, meta]) => (
              <div
                key={weight}
                className={s.weightContainer}
                data-testid="weight-container"
              >
                <div
                  className={s.weightName}
                  data-testid={`weight-name-${weight}`}
                >
                  {capitalizeFirstChar(weight)}
                </div>
                <div className={s.weightDemoContainer}>
                  {Object.entries(tokens?.typography?.scale).map(
                    ([name, scalesMeta]) => (
                      <div
                        key={name}
                        data-testid={`weight-demo-${weight}-${name}`}
                        style={{
                          ...getStyleObject(scalesMeta),
                          fontWeight: meta.value,
                        }}
                      >
                        {`${name} - ${scalesMeta['font-size']?.value}/${scalesMeta['line-height']?.value}`}
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
