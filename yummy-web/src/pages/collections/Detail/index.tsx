import { useParams } from 'react-router-dom';
import PageLayout from '@components/core/PageLayout';
import PrimaryTag from '@components/core/PrimaryTag';
import { useTranslation } from 'react-i18next';
import { IUserRoles } from '@pages/ProfilePage/models';
import { useMemo, useState } from 'react';
import CollectionModal from '@components/collections/CollectionModal';
import { Button, Flex, Grid, Space } from 'antd';
import CardsList from '@components/core/CardsList';
import DishCard from '@components/dishes/DishCard';
import EditIcon from '@icons/EditIcon';
import RemoveFolderIcon from '@icons/RemoveFolderIcon';
import AddIcon from '@icons/AddIcon';
import useToken from '@hooks/useToken';
import {
  useGetCollectionDishesQuery,
  useGetCollectionQuery,
  useRemoveDishFromCollectionMutation,
} from '../collectionsApi';
import { CollectionActions } from '../List/models';
import AddDishesModal from './AddDishesModal';

function CollectionDetail() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const screens = Grid.useBreakpoint();
  const token = useToken();

  const [isEditCollectionModalOpen, setIsEditCollectionModalOpen] = useState<boolean>(false);
  const [isAddDishesModalOpen, setIsAddDishesModalOpen] = useState<boolean>(false);

  const { data: collection, isFetching } = useGetCollectionQuery(id!, { skip: !id });

  const [removeFromCollection, { isLoading: isRemoving }] = useRemoveDishFromCollectionMutation();

  const author = useMemo(
    () => collection?.allowedUsers?.find((user) => user.role === IUserRoles.CREATOR)?.username,
    [collection?.allowedUsers],
  );

  return (
    <PageLayout
      showBackButton
      isLoading={isFetching}
      actions={
        <Space>
          <Button icon={<EditIcon />} onClick={() => setIsEditCollectionModalOpen(true)} />
          <Button icon={<AddIcon />} type="primary" onClick={() => setIsAddDishesModalOpen(true)}>
            {screens.md && t('addDishes')}
          </Button>
        </Space>
      }
      title={
        <Flex
          align={screens.md ? 'center' : 'start'}
          gap={screens.md ? token.marginXS : 0}
          vertical={!screens.md}
        >
          {collection?.name}
          <PrimaryTag>
            {t('authorBy', {
              author,
            })}
          </PrimaryTag>
        </Flex>
      }
      description={collection?.description}
    >
      {collection && (
        <CardsList
          useQuery={useGetCollectionDishesQuery}
          additionalParams={{ collectionId: collection.id }}
          cardRender={(dish) => (
            <DishCard
              dish={dish}
              actions={
                collection.actions.includes(CollectionActions.EDIT)
                  ? [
                      <RemoveFolderIcon
                        size={15}
                        key="removeFromCollection"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCollection({
                            collectionId: collection.id,
                            dishId: dish.id,
                          });
                        }}
                        disabled={isRemoving}
                      />,
                    ]
                  : undefined
              }
            />
          )}
        />
      )}
      <CollectionModal
        initialValue={collection}
        open={isEditCollectionModalOpen}
        onCancel={() => setIsEditCollectionModalOpen(false)}
      />
      <AddDishesModal open={isAddDishesModalOpen} onCancel={() => setIsAddDishesModalOpen(false)} />
    </PageLayout>
  );
}

export default CollectionDetail;
