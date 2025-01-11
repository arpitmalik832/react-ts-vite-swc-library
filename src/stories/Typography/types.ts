export type TypographyScale = 'h1';
export type TypographyScaleValue = '*px';
export type TypographyWeight = 'bold';
export type TypographyWeightValue = number;
export type TypographyScaleObject = Record<
  'font-size' | 'line-height' | 'letter-spacing',
  Record<'value', string>
>;
export type TypographyWeightObject = Record<'value', TypographyWeightValue>;

export interface DesignTokens {
  typography: {
    scale: Record<TypographyScale, TypographyScaleObject>;
    weight: Record<TypographyWeight, TypographyWeightObject>;
  };
}
