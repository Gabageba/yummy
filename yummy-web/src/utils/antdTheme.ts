import type { ThemeConfig } from 'antd';

export const COLORS = {
  PRIMARY_COLOR: '#f7a348',
  SECONDARY_BG_COLOR: '#fefaf0',
  BACKGROUND_COLOR: '#fff',
  TEXT_COLOR: '#5A4A3A',
  TEXT_WHITE_COLOR: '#fff',
};

const token: ThemeConfig['token'] = {
  colorPrimary: COLORS.PRIMARY_COLOR,
  colorText: COLORS.TEXT_COLOR,
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
