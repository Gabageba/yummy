import { Button, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CardsList from '@components/core/CardsList';
import { useGetMenusQuery } from './menuApi';
import './index.scss';
import type { IMenu } from './models';
import MenuModal from './components/MenuModal';
import MenuCard from './components/MenuCard';

function Menu() {
  const { t } = useTranslation();

  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);

  return (
    <>
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
        columnsCount={3}
        useQuery={useGetMenusQuery}
        cardRender={(menu) => <MenuCard menu={menu} />}
      />
      <MenuModal open={isMenuModal} onCancel={() => setIsMenuModal(false)} />
    </>
  );
}

export default Menu;
