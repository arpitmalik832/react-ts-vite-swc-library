import type { AxiosInstance } from 'axios';
import type { configureStore } from '@reduxjs/toolkit';

type AllParams =
  | string
  | string[]
  | object
  | object[]
  | number
  | number[]
  | bigint
  | bigint[]
  | boolean
  | boolean[];

interface VoidFunction extends VoidFunction {
  (...args: AllParams[]): void;
}

interface ComponentWithSuspenseProps {
  component: React.ReactNode;
  fallback?: React.ReactNode;
}

interface HtmlContentProps {
  title: string;
  description: string;
}

interface ReduxProviderProps {
  children?: React.ReactNode;
  store: ReturnType<typeof configureStore>;
}

interface IconProps {
  name: string;
}

type AbortControllers = Record<string, AbortController>;

interface RequestMetadata {
  startTime: Date;
  endTime: Date;
  responseTime: number | bigint;
}

interface AppRedux {
  theme: string;
}

interface ApisRedux {
  api1Host: string;
  api1Headers: Record<string, string>;
  api1AxiosInstance?: AxiosInstance;
}

interface NavigationRedux {
  stack: VoidFunction[];
}

interface ReduxState {
  app: AppRedux;
  apis: ApisRedux;
  navigation: NavigationRedux;
}

type ColorTheme = 'light' | 'dark';
type ColorType = 'background';
type ColorInnerType = 'primary';
type PrimitiveColor = 'black' | 'white';
type ColorSemanticLabel = '50' | '100' | '900';
type HexColor = `#${string & { length: 6 | 8 }}`;
type TypographyScale = 'h1';
type TypographyScaleValue = '*px';
type TypographyWeight = 'bold';
type TypographyWeightValue = number;
type TypographyScaleObject = Record<
  'font-size' | 'line-height' | 'letter-spacing',
  Record<'value', string>
>;
type TypographyWeightObject = Record<'value', TypographyWeightValue>;

interface DesignTokens {
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
  typography: {
    scale: Record<TypographyScale, TypographyScaleObject>;
    weight: Record<TypographyWeight, TypographyWeightObject>;
  };
}

type MQEventListener = (this: MediaQueryList, ev: MediaQueryListEvent) => void;

type EventListener = (this: Window, ev: Event) => void;

type BeforeUnloadEventListener = (this: Window, ev: BeforeUnloadEvent) => void;

interface EventListenerUtil<T> {
  callBackFn: T;
  subscribe(callBackFn: T): void;
  unSubscribe(): void;
}

interface KeyValuePair {
  key: string;
  value: string;
}

interface BuildStatsPluginOptions {
  outputPath?: string;
}

interface FileStats {
  fileName: string;
  size: number;
  gzippedSize: number;
  brotliSize: number;
  contentType: string;
}

interface CompleteStats {
  files: FileStats[];
  totalSize: number;
  totalGzippedSize: number;
  totalBrotliSize: number;
  noOfFiles: number;
  largestFile: FileStats | null;
  buildDuration: number;
}
