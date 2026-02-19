import { useParams } from 'react-router-dom';
import PageLayout from '@components/core/PageLayout';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import PrimaryTag from '@components/core/PrimaryTag';
import { useTranslation } from 'react-i18next';
import { IUserRoles } from '@pages/ProfilePage/models';
import { useMemo, useState } from 'react';
import CollectionModal from '@components/collections/CollectionModal';
import { Button, Flex, Space, theme } from 'antd';
import { useGetCollectionQuery } from '../collectionsApi';

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
    <PageLayout
      isLoading={isFetching}
      actions={
        <Space>
          <Button icon={<EditOutlined />} onClick={() => setIsEditCollectionModalOpen(true)} />
          <Button icon={<PlusOutlined />} type="primary">
            {t('addDish')}
          </Button>
        </Space>
      }
      title={
        <Flex align="center" gap={token.marginXS}>
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

      {/* {collection && <DishList collectionId={collection?.id} />} */}
    </PageLayout>
  );
}

export default CollectionDetail;
