import type { CardProps } from 'antd';
import { Card, Flex, theme, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IUserRoles } from '@pages/ProfilePage/models';
import { useTranslation } from 'react-i18next';
import { MenuActions, type IMenu } from '../../models';
import { useDeleteMenuMutation } from '../../menuApi';
import MenuModal from '../MenuModal';
import './index.scss';
import MenuAvatar from './MenuAvatar';

interface IProps {
  menu: IMenu;
}

function MenuCard({ menu }: IProps) {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);

  const [deleteMenu] = useDeleteMenuMutation();

  const actions = useMemo(() => {
    const result: CardProps['actions'] = [];

    if (menu.actions.includes(MenuActions.EDIT)) {
      result.push(<EditOutlined onClick={() => setIsMenuModal(true)} />);
    }
    if (menu.actions.includes(MenuActions.DELETE)) {
      result.push(<DeleteOutlined onClick={() => deleteMenu(menu.id)} />);
    }

    return result;
  }, [menu.actions, deleteMenu, menu.id]);

  const author = useMemo(() => {
    const creator = menu.allowedUsers?.find((user) => user.role === IUserRoles.CREATOR);
    return creator?.username;
  }, [menu.allowedUsers]);

  return (
    <>
      <Card className="menu-card" cover={<MenuAvatar />} actions={actions}>
        <Card.Meta
          title={
            <Flex gap={8} align="center" justify="space-between" className="menu-card__title">
              <Typography.Title level={4}>{menu.name}</Typography.Title>
            </Flex>
          }
          description={
            <Flex vertical gap={token.marginXS}>
              <Typography.Text type="secondary">{t('authorBy', { author })}</Typography.Text>

              <Typography.Text>{menu.description}</Typography.Text>
            </Flex>
          }
        />
      </Card>
      <MenuModal initialValue={menu} open={isMenuModal} onCancel={() => setIsMenuModal(false)} />
    </>
  );
}

export default MenuCard;
