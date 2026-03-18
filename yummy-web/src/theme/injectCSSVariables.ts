import camelToKebab from '@utils/camelToKebab';
import {
  _breakpointToken,
  _colorToken,
  _fontSizeToken,
  _heightToken,
  _marginToken,
  _paddingToken,
} from './token';

const toCssVars = (token: Record<string, number | string>, suffix: string = ''): string[] =>
  Object.entries(token).map(([key, value]) => `--${camelToKebab(key)}:${value}${suffix}`);

export const cssVars = [
  ...toCssVars(_colorToken),
  ...toCssVars(_paddingToken, 'px'),
  ...toCssVars(_marginToken, 'px'),
  ...toCssVars(_fontSizeToken, 'px'),
  ...toCssVars(_breakpointToken, 'px'),
  ...toCssVars(_heightToken, 'px'),
];

export const injectCSSVariables = (): void => {
  const style = document.createElement('style');
  style.textContent = `:root{${cssVars.join(';')}}`;
  document.head.appendChild(style);
};
