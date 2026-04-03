import camelToKebab from '@utils/camelToKebab';
import {
  _borderSizeToken,
  _colorDarkToken,
  _colorGeneralToken,
  _colorLightToken,
  _fontFamilyToken,
  _fontSizeToken,
  _heightToken,
  _sizeToken,
} from './variables';

const toCssVars = (token: Record<string, number | string>, suffix: string = ''): string[] =>
  Object.entries(token).map(([key, value]) => `--${camelToKebab(key)}:${value}${suffix}`);

export const cssVars = [
  ...toCssVars(_colorGeneralToken),
  ...toCssVars(_sizeToken, 'px'),
  ...toCssVars(_borderSizeToken, 'px'),
  ...toCssVars(_heightToken, 'px'),
  ...toCssVars(_fontSizeToken, 'px'),
  ...toCssVars(_fontFamilyToken),
];

const darkCssVars = [...toCssVars(_colorDarkToken)];
const lightCssVars = [...toCssVars(_colorLightToken)];

export const injectCSSVariables = (): void => {
  const style = document.createElement('style');
  style.textContent = `
  :root{${cssVars.join(';')}}
  :root[data-yummy-theme="dark"]{${darkCssVars.join(';')}}
  :root[data-yummy-theme="light"]{${lightCssVars.join(';')}}
  `;
  document.head.appendChild(style);
};
