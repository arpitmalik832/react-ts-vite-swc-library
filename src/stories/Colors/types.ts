export type ColorTheme = 'light' | 'dark';
export type ColorType = 'background';
export type ColorInnerType = 'primary';
export type PrimitiveColor = 'black' | 'white';
export type ColorSemanticLabel = '50' | '100' | '900';
export type HexColor = `#${string & { length: 6 | 8 }}`;

export interface DesignTokens {
  'color-primitives': Record<
    PrimitiveColor,
    Record<
      ColorSemanticLabel,
      {
        type: 'value';
        color: HexColor;
      }
    >
  >;
  'color-semantics': Record<
    ColorTheme,
    Record<
      ColorType,
      Record<
        ColorInnerType,
        Record<
          ColorSemanticLabel,
          {
            type: 'value';
            color: HexColor;
          }
        >
      >
    >
  >;
}
