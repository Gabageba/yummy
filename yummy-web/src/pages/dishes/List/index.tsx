import { DeleteOutlined, EditOutlined, FolderAddOutlined, PlusOutlined } from '@ant-design/icons';
import PageLayout from '@components/core/PageLayout';
import DishModal from '@pages/dishes/DishModal';
import { Button, Grid } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardsList from '@components/core/CardsList';
import useCardListColumnsCount from '@hooks/useCardListColumnsCount';
import DishCard from '@components/dishes/DishCard';
import type { IDish } from '../models';
import { useDeleteDishMutation, useGetDishesQuery } from '../dishesApi';
import DishCollectionsModal from '../components/DishCollectionsModal';

function DishesList() {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();
  const columnsCount = useCardListColumnsCount();

  const [deleteDish] = useDeleteDishMutation();

  const [dishModal, setDishModal] = useState<{ initialValues: IDish | undefined } | undefined>(
    undefined,
  );
  const [dishCollectionsModal, setDishCollectionsModal] = useState<string | undefined>(undefined);

  const getCardActions = useCallback(
    (dish: IDish) => [
      <EditOutlined
        key="edit"
        onClick={(e) => {
          e.stopPropagation();
          setDishModal({ initialValues: dish });
        }}
      />,
      <FolderAddOutlined
        key="addToCollection"
        onClick={(e) => {
          e.stopPropagation();
          setDishCollectionsModal(dish.id);
        }}
      />,
      <DeleteOutlined
        key="delete"
        onClick={(e) => {
          e.stopPropagation();
          deleteDish(dish.id);
        }}
      />,
    ],
    [deleteDish],
  );

  return (
    <PageLayout
      title={t('yourDishes')}
      description={t('Выберите ваше блюдо')}
      actions={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDishModal({ initialValues: undefined })}
        >
          {screens.sm && t('addDish')}
        </Button>
      }
    >
      <CardsList<IDish>
        columnsCount={columnsCount}
        useQuery={useGetDishesQuery}
        cardRender={(dish) => <DishCard dish={dish} actions={getCardActions(dish)} />}
      />
      <DishModal
        initialValue={dishModal?.initialValues}
        open={!!dishModal}
        onCancel={() => setDishModal(undefined)}
      />
      <DishCollectionsModal
        open={!!dishCollectionsModal}
        onCancel={() => setDishCollectionsModal(undefined)}
        dishId={dishCollectionsModal}
      />
    </PageLayout>
  );
}

export default DishesList;
