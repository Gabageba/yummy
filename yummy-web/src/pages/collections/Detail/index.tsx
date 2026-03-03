import { useParams } from 'react-router-dom';
import PageLayout from '@components/core/PageLayout';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import PrimaryTag from '@components/core/PrimaryTag';
import { useTranslation } from 'react-i18next';
import { IUserRoles } from '@pages/ProfilePage/models';
import { useMemo, useState } from 'react';
import CollectionModal from '@components/collections/CollectionModal';
import { Button, Flex, Grid, Space, theme } from 'antd';
import CardsList from '@components/core/CardsList';
import DishCard from '@components/dishes/DishCard';
import FolderRemoveOutlined from '@components/icons/FolderRemoveOutlined';
import {
  useGetCollectionDishesQuery,
  useGetCollectionQuery,
  useRemoveDishFromCollectionMutation,
} from '../collectionsApi';
import { CollectionActions } from '../List/models';

function CollectionDetail() {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { id } = useParams<{ id: string }>();
  const screens = Grid.useBreakpoint();

  const [isEditCollectionModalOpen, setIsEditCollectionModalOpen] = useState<boolean>(false);

  const { data: collection, isFetching } = useGetCollectionQuery(id!, { skip: !id });

  const [removeFromCollection] = useRemoveDishFromCollectionMutation();

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
          <Button icon={<EditOutlined />} onClick={() => setIsEditCollectionModalOpen(true)} />
          <Button icon={<PlusOutlined />} type="primary">
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
      <CollectionModal
        initialValue={collection}
        open={isEditCollectionModalOpen}
        onCancel={() => setIsEditCollectionModalOpen(false)}
      />

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
                      <FolderRemoveOutlined
                        size={15}
                        key="removeFromCollection"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCollection({
                            collectionId: collection.id,
                            dishId: dish.id,
                          });
                        }}
                      />,
                    ]
                  : undefined
              }
            />
          )}
        />
      )}
    </PageLayout>
  );
}

export default CollectionDetail;
