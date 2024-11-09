import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';
import type { configureStore } from '@reduxjs/toolkit';

interface VoidFunction extends VoidFunction {
  (...args: any[]): void;
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
  stack: Array<VoidFunction>;
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
    Theme,
    Record<
      Type,
      Record<
        InnerType,
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
    scale: Record<
      TypographyScale,
      Record<
        'font-size' | 'line-height' | 'letter-spacing',
        Record<'value', TypographyScaleValue>
      >
    >;
    weight: Record<TypographyWeight, Record<'value', TypographyWeightValue>>;
  };
}

type MQEventListener = (this: MediaQueryList, ev: MediaQueryListEvent) => void;

type EventListener = (this: Window, ev: Event) => void;

type BeforeUnloadEventListener = (this: Window, ev: BeforeUnloadEvent) => void;
