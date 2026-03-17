import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import { useTranslation } from 'react-i18next';
import { antdTheme } from '@utils/antdTheme';
import Empty from '@components/core/Empty';

interface IProps {
  children: React.ReactNode;
}

function AntdConfigProvider({ children }: IProps) {
  const { t, i18n } = useTranslation();

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
      {children}
    </ConfigProvider>
  );
}

export default AntdConfigProvider;
