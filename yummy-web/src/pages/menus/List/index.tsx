import { Button, Flex, Grid, theme, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import CardsList from '@components/core/CardsList';
import './index.scss';
import PageLayout from '@components/core/PageLayout';
import MenuCard from '@components/menu/MenuCard';
import MenuModal from '@components/menu/MenuModal';
import type { IMenu } from './models';
import { useGetMenusQuery } from '../menuApi';

function MenusList() {
  const { t } = useTranslation();
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();

  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);

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
      <Flex justify="space-between" align="center" className="menu__title" gap={token.margin}>
        <div>
          <Typography.Title level={2}>{t('yourMenus')}</Typography.Title>
          <Typography.Text type="secondary">{t('selectDishMenu')}</Typography.Text>
        </div>
        <Button onClick={() => setIsMenuModal(true)} icon={<PlusOutlined />} type="primary">
          {screens.sm && t('createMenu')}
        </Button>
      </Flex>
      <CardsList<IMenu>
        columnsCount={columnsCount}
        useQuery={useGetMenusQuery}
        cardRender={(menu) => <MenuCard menu={menu} />}
      />
      <MenuModal open={isMenuModal} onCancel={() => setIsMenuModal(false)} />
    </PageLayout>
  );
}

export default MenusList;
