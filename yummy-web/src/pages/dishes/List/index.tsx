import { PlusOutlined } from '@ant-design/icons';
import PageLayout from '@components/core/PageLayout';
import { Button, Grid } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardsList from '@components/core/CardsList';
import DishCard from '@components/dishes/DishCard';
import EditDishAction from '@components/dishes/actions/EditDishAction';
import AddDishToCollectionAction from '@components/dishes/actions/AddDishToCollectionAction';
import DeleteDishAction from '@components/dishes/actions/DeleteDishAction';
import type { IDish } from '../models';
import { useGetDishesQuery } from '../dishesApi';
import DishModal from '../DishModal';

function DishesList() {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();

  const [isDishModalOpen, setIsDishModalOpen] = useState<boolean>(false);

  const getCardActions = useCallback(
    (dish: IDish) => [
      <EditDishAction key="edit" dish={dish} />,
      <AddDishToCollectionAction key="addToCollection" dishId={dish.id} />,
      <DeleteDishAction key="delete" dishId={dish.id} />,
    ],
    [],
  );

  return (
    <PageLayout
      title={t('yourDishes')}
      description={t('Выберите ваше блюдо')}
      actions={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsDishModalOpen(true)}>
          {screens.sm && t('createDish')}
        </Button>
      }
    >
      <CardsList<IDish>
        useQuery={useGetDishesQuery}
        cardRender={(dish) => <DishCard dish={dish} actions={getCardActions(dish)} />}
      />

      <DishModal open={isDishModalOpen} onCancel={() => setIsDishModalOpen(false)} />
    </PageLayout>
  );
}

export default DishesList;
