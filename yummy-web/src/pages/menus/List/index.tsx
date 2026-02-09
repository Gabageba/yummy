import { Button, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CardsList from '@components/core/CardsList';
import './index.scss';
import PageLayout from '@components/core/PageLayout';
import MenuCard from '@components/menu/MenuCard';
import MenuModal from '@components/menu/MenuModal';
import type { IMenu } from './models';
import { useGetMenusQuery } from '../menuApi';

function MenusList() {
  const { t } = useTranslation();

  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);

  return (
    <PageLayout>
      <Flex justify="space-between" align="center" className="menu__title">
        <div>
          <Typography.Title level={2}>{t('yourMenus')}</Typography.Title>
          <Typography.Text type="secondary">{t('selectDishMenu')}</Typography.Text>
        </div>
        <Button onClick={() => setIsMenuModal(true)} icon={<PlusOutlined />} type="primary">
          {t('createMenu')}
        </Button>
      </Flex>
      <CardsList<IMenu>
        columnsCount={4}
        useQuery={useGetMenusQuery}
        cardRender={(menu) => <MenuCard menu={menu} />}
      />
      <MenuModal open={isMenuModal} onCancel={() => setIsMenuModal(false)} />
    </PageLayout>
  );
}

export default MenusList;
