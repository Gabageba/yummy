import type { ThemeConfig } from 'antd';

const PRIMARY_COLOR = '#f7a348';
const SECONDARY_BG_COLOR = '#fefaf0';
const BACKGROUND_COLOR = '#fff';

const token: ThemeConfig['token'] = { colorPrimary: PRIMARY_COLOR };
const components: ThemeConfig['components'] = {
  Layout: {
    colorBgHeader: SECONDARY_BG_COLOR,
    bodyBg: BACKGROUND_COLOR,
  },
};

export const antdTheme: ThemeConfig = {
  token,
  components,
};
