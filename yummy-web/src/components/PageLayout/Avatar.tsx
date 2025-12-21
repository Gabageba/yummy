import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';
import './index.scss';
import { useTranslation } from 'react-i18next';

const UserAvatar = () => {
  const { t } = useTranslation();

  const items: MenuProps['items'] = [
    {
      key: 'exit',
      label: t('exit'),
      onClick: () => console.log('exit'),
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomCenter">
      <Avatar icon={<UserOutlined />} size={45} className="page-layout__header--avatar" />
    </Dropdown>
  );
};

export default UserAvatar;
