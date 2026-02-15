import { useParams } from 'react-router-dom';
import PageLayout from '@components/core/PageLayout';
import { Button, Flex, Space, theme, Typography } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import PrimaryTag from '@components/core/PrimaryTag';
import { useTranslation } from 'react-i18next';
import { IUserRoles } from '@pages/ProfilePage/models';
import { useMemo, useState } from 'react';
import CollectionModal from '@components/collection/CollectionModal';
import DishList from '@components/dish/DishList';
import { useGetCollectionQuery } from '../collectionApi';

function CollectionDetail() {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { id } = useParams<{ id: string }>();

  const [isEditCollectionModalOpen, setIsEditCollectionModalOpen] = useState<boolean>(false);

  const { data: collection, isFetching } = useGetCollectionQuery(id!, { skip: !id });

  const author = useMemo(
    () => collection?.allowedUsers?.find((user) => user.role === IUserRoles.CREATOR)?.username,
    [collection?.allowedUsers],
  );

  return (
    <PageLayout isLoading={isFetching}>
      <Flex justify="space-between" align="center" className="collection__title">
        <div>
          <Flex align="center" gap={token.marginXS}>
            <Typography.Title level={2}>{collection?.name}</Typography.Title>
            <PrimaryTag>
              {t('authorBy', {
                author,
              })}
            </PrimaryTag>
            <Button
              size="middle"
              icon={<EditOutlined />}
              type="text"
              onClick={() => setIsEditCollectionModalOpen(true)}
            />
          </Flex>
          <Typography.Text type="secondary">{collection?.description}</Typography.Text>
        </div>
        <Space size={token.marginXS}>
          <Button icon={<PlusOutlined />} type="primary">
            {t('addDish')}
          </Button>
        </Space>
      </Flex>
      <CollectionModal
        initialValue={collection}
        open={isEditCollectionModalOpen}
        onCancel={() => setIsEditCollectionModalOpen(false)}
      />
      {collection && <DishList collectionId={collection?.id} />}
    </PageLayout>
  );
}

export default CollectionDetail;
