import tokens from '../../../static/enums/design_tokens.json';
import { capitalizeFirstChar } from '../../utils/stringUtils';
import classnames from '../../utils/classNames';
import s from './index.module.scss';
import {
  ColorInnerType,
  ColorSemanticLabel,
  ColorType,
  ColorTheme,
  PrimitiveColor,
} from './types';

const Colors = () => {
  const getColorValue = (
    type: ColorType,
    innerType: ColorInnerType,
    semanticLabel: ColorSemanticLabel,
    theme: ColorTheme,
  ) => {
    const colorValue =
      tokens['color-semantics']?.[theme]?.[type]?.[innerType]?.[semanticLabel]
        ?.value;
    if (!colorValue) {
      return '';
    }
    if (colorValue?.startsWith('#')) {
      return colorValue;
    }
    const [, colorName, shade] = colorValue.split('.');
    return tokens['color-primitives']?.[colorName as PrimitiveColor]?.[
      shade.replace('}', '') as ColorSemanticLabel
    ]?.value;
  };

  const renderColorBox = (
    type: ColorType,
    innerType: ColorInnerType,
    semanticLabel: ColorSemanticLabel,
    theme: ColorTheme,
  ) => {
    const colorValue = getColorValue(type, innerType, semanticLabel, theme);
    return (
      <div
        data-testid="colorCard"
        style={{
          background: colorValue,
        }}
        className={s.colorCard}
      >
        <div
          className={classnames(s.colorName, {
            [s.whiteText]: theme === 'light',
          })}
          data-testid="colorName"
        >{`--${type}-${innerType}-${semanticLabel}`}</div>
        <div
          className={classnames(s.colorCode, {
            [s.whiteText]: theme === 'light',
          })}
          data-testid="colorCode"
        >
          {colorValue}
        </div>
      </div>
    );
  };

  return (
    <div data-testid="colorsContainer" className={s.colorsContainer}>
      {Object.entries(tokens['color-semantics'].light).map(
        ([type, properties]) =>
          Object.entries(properties).map(([innerType, innerProperties]) => (
            <section key={type}>
              <div data-testid="type" className={s.sectionHeading}>
                {capitalizeFirstChar(type)}
              </div>
              <div data-testid="innerType" className={s.sectionHeading}>
                {capitalizeFirstChar(innerType)}
              </div>
              <div data-testid="themeHeader" className={s.themeHeader}>
                <div>Light</div>
                <div>Dark</div>
              </div>
              {Object.entries(innerProperties).map(([semanticLabel]) => (
                <div
                  data-testid="colorsRow"
                  key={`${type}-${innerType}-${semanticLabel}`}
                  className={s.colorsRow}
                >
                  {renderColorBox(
                    type as ColorType,
                    innerType as ColorInnerType,
                    semanticLabel as ColorSemanticLabel,
                    'light',
                  )}
                  {renderColorBox(
                    type as ColorType,
                    innerType as ColorInnerType,
                    semanticLabel as ColorSemanticLabel,
                    'dark',
                  )}
                </div>
              ))}
            </section>
          )),
      )}
    </div>
  );
};

export default Colors;
