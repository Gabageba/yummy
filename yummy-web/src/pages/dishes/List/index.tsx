import { PlusOutlined } from '@ant-design/icons';
import PageLayout from '@components/core/PageLayout';
import DishModal from '@components/dishes/DishModal';
import { Button, Grid } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DishList from '@components/dishes/DishList';

function DishesList() {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();

  const [isDishModalOpen, setIsDishModalOpen] = useState<boolean>(false);

  return (
    <PageLayout
      title={t('yourDishes')}
      description={t('Выберите ваше блюдо')}
      actions={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsDishModalOpen(true)}>
          {screens.sm && t('addDish')}
        </Button>
      }
    >
      <DishList />
      <DishModal open={isDishModalOpen} onCancel={() => setIsDishModalOpen(false)} />
    </PageLayout>
  );
}

export default DishesList;
