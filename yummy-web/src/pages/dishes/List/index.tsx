import PageLayout from '@components/core/PageLayout';
import { useTranslation } from 'react-i18next';

function DishesList() {
  const { t } = useTranslation();

  return <PageLayout title={t('yourDishes')}>sdfasd</PageLayout>;
}

export default DishesList;
