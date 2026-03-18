/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import toCapitalized from '@utils/toCapitalized';

const BASE_KEY = 'base';

type PrefixedKeys<P extends string, T extends Record<string, string | number>> = {
  [K in keyof T as K extends typeof BASE_KEY ? P : `${P & string}${Capitalize<string & K>}`]: T[K];
};

function prepareToken<P extends string, T extends Record<string, string | number>>(
  prefix: P,
  token: T,
): PrefixedKeys<P, T> {
  const entries = Object.entries(token).map(([key, value]) => [
    key === BASE_KEY ? prefix : `${prefix}${toCapitalized(key)}`,
    value,
  ]);
  return Object.fromEntries(entries) as PrefixedKeys<P, T>;
}

const COLORS = {
  white: '#fff',
  primary: '#F7A348',
  bg: '#fff',
  bgSecondary: '#fff',
  text: '#111827',
  textWhite: '#fff',
  iconSecondary: 'rgba(0,0,0,.25)',
  textSecondary: 'rgba(0,0,0,.45)',
  primaryLight: '#FEF6ED',
  primaryLightGradient: 'linear-gradient(180deg, #FFEDD5 0%, #FFF7ED 100%)',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  lightGray: '#EDEFF2',
  lightShadow: 'rgba(0, 0, 0, 0.1)',
} as const satisfies Record<string, string>;

const PADDINGS = {
  XXS: 4,
  XS: 8,
  SM: 12,
  base: 16,
  MD: 20,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const satisfies Record<string, number>;

const MARGINS = {
  XXS: 4,
  XS: 8,
  SM: 12,
  base: 16,
  MD: 20,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const satisfies Record<string, number>;

const FONT_SIZES = {
  XXS: 10,
  XS: 12,
  SM: 14,
  base: 16,
  LG: 20,
  XL: 24,
  XXL: 32,
  XXXL: 48,
} as const satisfies Record<string, number>;

const BREAKPOINTS = {
  XXS: 480,
  XXSMax: 479,
  XS: 576,
  XSMax: 575,
  SM: 768,
  SMMax: 767,
  MD: 992,
  MDMax: 991,
  LG: 1200,
  LGMax: 1199,
  XL: 1600,
  XLMax: 1599,
} as const satisfies Record<string, number>;

const HEIGHTS = {
  header: 64,
} as const satisfies Record<string, number>;

export const _colorToken = prepareToken('color', COLORS);
export const _paddingToken = prepareToken('padding', PADDINGS);
export const _marginToken = prepareToken('margin', MARGINS);
export const _fontSizeToken = prepareToken('fontSize', FONT_SIZES);
export const _breakpointToken = prepareToken('breakpoint', BREAKPOINTS);
export const _heightToken = prepareToken('height', HEIGHTS);

export type DesignToken = PrefixedKeys<'color', typeof COLORS> &
  PrefixedKeys<'padding', typeof PADDINGS> &
  PrefixedKeys<'margin', typeof MARGINS> &
  PrefixedKeys<'fontSize', typeof FONT_SIZES> &
  PrefixedKeys<'breakpoint', typeof BREAKPOINTS> &
  PrefixedKeys<'height', typeof HEIGHTS>;

export const token: DesignToken = {
  ..._colorToken,
  ..._paddingToken,
  ..._marginToken,
  ..._fontSizeToken,
  ..._breakpointToken,
  ..._heightToken,
};
