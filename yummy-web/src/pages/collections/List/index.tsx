import { Button, Flex, Grid, theme, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import CardsList from '@components/core/CardsList';
import './index.scss';
import PageLayout from '@components/core/PageLayout';
import CollectionCard from '@components/collection/CollectionCard';
import CollectionModal from '@components/collection/CollectionModal';
import type { ICollection } from './models';
import { useGetCollectionsQuery } from '../collectionApi';

function CollectionsList() {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();

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
    <PageLayout>
      <Flex justify="space-between" align="center" className="collection__title" gap={token.margin}>
        <div>
          <Typography.Title level={2}>{t('yourCollections')}</Typography.Title>
          <Typography.Text type="secondary">{t('selectDishCollection')}</Typography.Text>
        </div>
        <Button onClick={() => setIsCollectionModal(true)} icon={<PlusOutlined />} type="primary">
          {screens.sm && t('createCollection')}
        </Button>
      </Flex>
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
