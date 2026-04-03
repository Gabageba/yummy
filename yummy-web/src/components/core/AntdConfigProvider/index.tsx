import type { ThemeConfig } from 'antd';
import { App, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import { useTranslation } from 'react-i18next';
import Empty from '@components/core/Empty';
import { token } from '@theme/token';

interface IProps {
  children: React.ReactNode;
}

function AntdConfigProvider({ children }: IProps) {
  const { t, i18n } = useTranslation();

  const antdToken: ThemeConfig['token'] = {
    colorPrimary: token.colorPrimary,
    colorText: token.colorText,
    colorLink: token.colorPrimary,
    fontWeightStrong: 500,
  };
  const components: ThemeConfig['components'] = {
    Layout: {
      headerBg: token.colorBgSecondary,
      bodyBg: token.colorBg,
    },
    Input: {
      colorIcon: token.colorIconSecondary,
    },
    Select: {
      colorIcon: token.colorIconSecondary,
    },
    Divider: {
      colorTextHeading: token.colorTextSecondary,
      fontSizeLG: token.fontSizeSM,
    },
    Dropdown: {
      fontSizeIcon: token.fontSize,
    },
  };
  const antdTheme: ThemeConfig = {
    token: antdToken,
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
