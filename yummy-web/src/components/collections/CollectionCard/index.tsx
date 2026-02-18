import type { CardProps } from 'antd';
import { Card, Flex, theme, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IUserRoles } from '@pages/ProfilePage/models';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@routes/models';
import './index.scss';
import { useDeleteCollectionMutation } from '@pages/collections/collectionsApi';
import type { ICollection } from '@pages/collections/List/models';
import { CollectionActions } from '@pages/collections/List/models';
import CoverIcon from '@components/CoverIcon';
import CollectionModal from '../CollectionModal';

interface IProps {
  collection: ICollection;
}

function CollectionCard({ collection }: IProps) {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const [isCollectionModal, setIsCollectionModal] = useState<boolean>(false);

  const [deleteCollection] = useDeleteCollectionMutation();

  const actions = useMemo(() => {
    const result: CardProps['actions'] = [];

    if (collection.actions.includes(CollectionActions.EDIT)) {
      result.push(
        <EditOutlined
          key="edit"
          onClick={(e) => {
            e.stopPropagation();
            setIsCollectionModal(true);
          }}
        />,
      );
    }
    if (collection.actions.includes(CollectionActions.DELETE)) {
      result.push(
        <DeleteOutlined
          key="delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteCollection(collection.id);
          }}
        />,
      );
    }

    return result;
  }, [collection.actions, deleteCollection, collection.id]);

  const author = useMemo(() => {
    const creator = collection.allowedUsers?.find((user) => user.role === IUserRoles.CREATOR);
    return creator?.username;
  }, [collection.allowedUsers]);

  return (
    <>
      <Card
        className="collection-card card"
        cover={<CoverIcon />}
        actions={actions}
        onClick={() => navigate(RoutePath.COLLECTION_DETAIL.replace(':id', collection.id))}
      >
        <Card.Meta
          title={
            <Flex vertical className="collection-card__title">
              <Typography.Title level={4}>{collection.name}</Typography.Title>
              <Typography.Text type="secondary">{t('authorBy', { author })}</Typography.Text>
            </Flex>
          }
          description={
            <Flex vertical gap={token.marginXS}>
              <Typography.Text>{collection.description}</Typography.Text>
            </Flex>
          }
        />
      </Card>
      <CollectionModal
        initialValue={collection}
        open={isCollectionModal}
        onCancel={() => setIsCollectionModal(false)}
      />
    </>
  );
}

export default CollectionCard;
