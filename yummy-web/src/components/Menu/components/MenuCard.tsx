import type { MenuProps } from 'antd';
import { Card, Flex } from 'antd';
import { useMemo } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { IUserRoles } from '@pages/ProfilePage/models';
import DropdownActions from '@components/core/DropdownActions';
import PrimaryTag from '@components/core/PrimaryTag';
import { MenuActions, type IMenu } from '../models';

interface IProps {
  menu: IMenu;
}

function MenuCard({ menu }: IProps) {
  const { t } = useTranslation();

  const actions = useMemo(() => {
    const result: MenuProps['items'] = [];

    if (menu.actions.includes(MenuActions.EDIT)) {
      result.push({
        key: 'edit',
        label: t('edit'),
        icon: <EditOutlined />,
      });
    }
    if (menu.actions.includes(MenuActions.DELETE)) {
      result.push({
        key: 'delete',
        label: t('delete'),
        icon: <DeleteOutlined />,
      });
    }

    return result;
  }, [menu.actions, t]);

  const author = useMemo(() => {
    const creator = menu.allowedUsers?.find((user) => user.role === IUserRoles.CREATOR);
    return creator?.username;
  }, [menu.allowedUsers]);

  return (
    <Card
      title={
        <Flex gap={8} align="center">
          {menu.name}
          <PrimaryTag>{`${t('author')}: ${author}`}</PrimaryTag>
        </Flex>
      }
      extra={<DropdownActions actions={actions} placement="bottomRight" />}
    >
      {menu.description}
    </Card>
  );
}

export default MenuCard;
