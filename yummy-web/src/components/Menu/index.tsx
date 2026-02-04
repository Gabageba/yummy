import { Button, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CardsList from '@components/core/CardsList';
import { useGetMenusQuery } from './menuApi';
import './index.scss';
import MenuCard from './components/MenuCard';
import type { IMenu } from './models';
import MenuModal from './components/MenuModal';

function Menu() {
  const { t } = useTranslation();

  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);

  return (
    <>
      <Flex justify="space-between" className="menu__title">
        <Typography.Title level={3}>{t('allMenus')}</Typography.Title>
        <Button
          size="middle"
          onClick={() => setIsMenuModal(true)}
          icon={<PlusOutlined />}
          type="primary"
        >
          {t('create')}
        </Button>
      </Flex>
      <CardsList<IMenu>
        columnsCount={1}
        useQuery={useGetMenusQuery}
        cardRender={(menu) => <MenuCard menu={menu} />}
      />
      <MenuModal open={isMenuModal} onCancel={() => setIsMenuModal(false)} />
    </>
  );
}

export default Menu;
