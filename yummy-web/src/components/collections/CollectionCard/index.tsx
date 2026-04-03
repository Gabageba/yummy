import type { CardProps } from 'antd';
import { Card, Flex, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserRoles } from '@pages/ProfilePage/models';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@routes/models';
import './index.scss';
import { useDeleteCollectionMutation } from '@pages/collections/collectionsApi';
import type { ICollection } from '@pages/collections/List/models';
import { CollectionActions } from '@pages/collections/List/models';
import CoverIcon from '@components/CoverIcon';
import EditIcon from '@icons/EditIcon';
import DeleteIcon from '@icons/DeleteIcon';
import useConfirmModal from '@hooks/useConfirmModal';
import useToken from '@hooks/useToken';
import CollectionModal from '../CollectionModal';

interface IProps {
  collection: ICollection;
}

function CollectionCard({ collection }: IProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { confirmDeletion } = useConfirmModal();
  const token = useToken();

  const [isCollectionModal, setIsCollectionModal] = useState<boolean>(false);

  const [deleteCollection, { isLoading: isDeleting }] = useDeleteCollectionMutation();
  const actions = useMemo(() => {
    const result: CardProps['actions'] = [];

    if (collection.actions.includes(CollectionActions.EDIT)) {
      result.push(
        <EditIcon
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
        <DeleteIcon
          key="delete"
          onClick={(e) => {
            e.stopPropagation();
            confirmDeletion(() => deleteCollection(collection.id));
          }}
          disabled={isDeleting}
        />,
      );
    }

    return result;
  }, [collection.actions, deleteCollection, collection.id, isDeleting, confirmDeletion]);

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
              <Typography.Title level={4} ellipsis={{ rows: 1, tooltip: true }}>
                {collection.name}
              </Typography.Title>
              <Typography.Text type="secondary" ellipsis={{ tooltip: true }}>
                {t('authorBy', { author })}
              </Typography.Text>
            </Flex>
          }
          description={
            <Flex vertical gap={token.marginXS}>
              <Typography.Paragraph
                ellipsis={{ rows: 4, tooltip: true }}
                className="collection-card__description"
              >
                {collection.description}
              </Typography.Paragraph>
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
