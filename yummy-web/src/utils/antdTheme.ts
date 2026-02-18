import type { ThemeConfig } from 'antd';

export const COLORS = {
  PRIMARY_COLOR: '#f7a348',
  BACKGROUND_COLOR: '#F9FAFB',
  SECONDARY_BG_COLOR: '#fff',
  TEXT_COLOR: '#111827',
  TEXT_WHITE_COLOR: '#fff',
  PRIMARY_LIGHT_COLOR: '#FEF6ED',
  PRIMARY_LIGHT_GRADIENT_COLOR: 'linear-gradient(180deg, #FFEDD5 0%, #FFF7ED 100%)',
};

const token: ThemeConfig['token'] = {
  colorPrimary: COLORS.PRIMARY_COLOR,
  colorText: COLORS.TEXT_COLOR,
  colorLink: COLORS.PRIMARY_COLOR,
  fontWeightStrong: 500,
};
const components: ThemeConfig['components'] = {
  Layout: {
    headerBg: COLORS.SECONDARY_BG_COLOR,
    bodyBg: COLORS.BACKGROUND_COLOR,
  },
};

export const antdTheme: ThemeConfig = {
  token,
  components,
};
