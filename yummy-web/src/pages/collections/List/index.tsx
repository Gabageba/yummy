import { Button, Grid } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CardsList from '@components/core/CardsList';
import './index.scss';
import PageLayout from '@components/core/PageLayout';
import CollectionModal from '@components/collections/CollectionModal';
import CollectionCard from '@components/collections/CollectionCard';
import useCardListColumnsCount from '@hooks/useCardListColumnsCount';
import type { ICollection } from './models';
import { useGetCollectionsQuery } from '../collectionsApi';

function CollectionsList() {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();
  const columnsCount = useCardListColumnsCount();

  const [isCollectionModal, setIsCollectionModal] = useState<boolean>(false);

  return (
    <PageLayout
      actions={
        <Button onClick={() => setIsCollectionModal(true)} icon={<PlusOutlined />} type="primary">
          {screens.sm && t('createCollection')}
        </Button>
      }
      title={t('yourCollections')}
      description={t('selectDishCollection')}
    >
      <CardsList<ICollection>
        columnsCount={columnsCount}
        useQuery={useGetCollectionsQuery}
        cardRender={(collection) => <CollectionCard collection={collection} />}
      />
      <CollectionModal open={isCollectionModal} onCancel={() => setIsCollectionModal(false)} />
    </PageLayout>
  );
}

export default CollectionsList;
