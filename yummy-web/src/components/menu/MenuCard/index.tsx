import type { CardProps } from 'antd';
import { Card, Flex, theme, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IUserRoles } from '@pages/ProfilePage/models';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '@routes/models';
import './index.scss';
import { useDeleteMenuMutation } from '@pages/menus/menuApi';
import type { IMenu } from '@pages/menus/List/models';
import { MenuActions } from '@pages/menus/List/models';
import MenuAvatar from './MenuAvatar';
import MenuModal from '../MenuModal';

interface IProps {
  menu: IMenu;
}

function MenuCard({ menu }: IProps) {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const [isMenuModal, setIsMenuModal] = useState<boolean>(false);

  const [deleteMenu] = useDeleteMenuMutation();

  const actions = useMemo(() => {
    const result: CardProps['actions'] = [];

    if (menu.actions.includes(MenuActions.EDIT)) {
      result.push(
        <EditOutlined
          key="edit"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuModal(true);
          }}
        />,
      );
    }
    if (menu.actions.includes(MenuActions.DELETE)) {
      result.push(
        <DeleteOutlined
          key="delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteMenu(menu.id);
          }}
        />,
      );
    }

    return result;
  }, [menu.actions, deleteMenu, menu.id]);

  const author = useMemo(() => {
    const creator = menu.allowedUsers?.find((user) => user.role === IUserRoles.CREATOR);
    return creator?.username;
  }, [menu.allowedUsers]);

  return (
    <>
      <Card
        className="menu-card"
        cover={<MenuAvatar />}
        actions={actions}
        onClick={() => navigate(RoutePath.MENU_DETAIL.replace(':id', menu.id))}
      >
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
