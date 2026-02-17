import { Button, Grid } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import CardsList from '@components/core/CardsList';
import './index.scss';
import PageLayout from '@components/core/PageLayout';
import CollectionModal from '@components/collection/CollectionModal';
import CollectionCard from '@components/collection/CollectionCard';
import type { ICollection } from './models';
import { useGetCollectionsQuery } from '../collectionApi';

function CollectionsList() {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();

  const [isCollectionModal, setIsCollectionModal] = useState<boolean>(false);

  const columnsCount = useMemo(() => {
    if (!screens.sm) {
      return 1;
    }
    if (!screens.lg) {
      return 2;
    }
    if (!screens.xl) {
      return 3;
    }
    return 4;
  }, [screens]);

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
