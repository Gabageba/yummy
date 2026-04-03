import type { ThemeConfig } from 'antd';
import { App, ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import { useTranslation } from 'react-i18next';
import Empty from '@components/core/Empty';
import { ADDITIONAL_COLORS, COLORS } from '@theme/variables';
import useThemeMode from '@components/themeMode/hooks/useThemeMode';
import { ThemeMode } from '@components/themeMode/models';

interface IProps {
  children: React.ReactNode;
}

function AntdConfigProvider({ children }: IProps) {
  const { t, i18n } = useTranslation();
  const { themeMode } = useThemeMode();
  const { token: antdToken } = theme.useToken();

  const colors = COLORS[themeMode];
  const additionalColors = ADDITIONAL_COLORS[themeMode];

  const token: ThemeConfig['token'] = {
    colorPrimary: colors.primary,
    colorLink: colors.primary,
    fontWeightStrong: 500,
    colorBgBase: colors.bg,
    colorTextBase: colors.text,
    colorText: colors.text,
    colorTextSecondary: colors.textSecondary,
    colorBgContainer: colors.bg,
  };

  const components: ThemeConfig['components'] = {
    Layout: {
      headerBg: token.colorBgBase,
      bodyBg: token.colorBgBase,
    },
    Input: {
      colorIcon: additionalColors.iconSecondary,
    },
    Select: {
      colorIcon: additionalColors.iconSecondary,
    },
    Divider: {
      colorTextHeading: token.colorTextSecondary,
      fontSizeLG: antdToken.fontSizeSM,
    },
    Dropdown: {
      fontSizeIcon: antdToken.fontSize,
    },
    Modal: {
      contentBg: token.colorBgBase,
    },
  };
  const antdTheme: ThemeConfig = {
    cssVar: {
      prefix: '',
    },
    algorithm: themeMode === ThemeMode.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token,
    components,
  };

  const antdLocale = i18n.language === 'ru' ? ruRU : enUS;
  const locale = {
    ...antdLocale,
    Modal: {
      ...antdLocale.Modal,
      okText: t('save'),
      cancelText: t('cancel'),
      justOkText: t('save'),
    },
  };

  return (
    <ConfigProvider theme={antdTheme} renderEmpty={() => <Empty />} locale={locale}>
      <App>{children}</App>
    </ConfigProvider>
  );
}

export default AntdConfigProvider;
