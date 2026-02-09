import { useParams } from 'react-router-dom';
import PageLayout from '@components/core/PageLayout';
import { Button, Flex, Space, theme, Typography } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import PrimaryTag from '@components/core/PrimaryTag';
import { useTranslation } from 'react-i18next';
import { IUserRoles } from '@pages/ProfilePage/models';
import { useMemo, useState } from 'react';
import MenuModal from '@components/menu/MenuModal';
import { useGetMenuQuery } from '../menuApi';

function MenuDetail() {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { id } = useParams<{ id: string }>();

  const [isEditMenuModalOpen, setIsEditMenuModalOpen] = useState<boolean>(false);

  const { data: menu, isFetching } = useGetMenuQuery(id!, { skip: !id });

  const author = useMemo(
    () => menu?.allowedUsers?.find((user) => user.role === IUserRoles.CREATOR)?.username,
    [menu?.allowedUsers],
  );

  return (
    <PageLayout isLoading={isFetching}>
      <Flex justify="space-between" align="center" className="menu__title">
        <div>
          <Flex align="center" gap={token.marginXS}>
            <Typography.Title level={2}>{menu?.name}</Typography.Title>
            <PrimaryTag>
              {t('authorBy', {
                author,
              })}
            </PrimaryTag>
            <Button
              size="middle"
              icon={<EditOutlined />}
              type="text"
              onClick={() => setIsEditMenuModalOpen(true)}
            />
          </Flex>
          <Typography.Text type="secondary">{menu?.description}</Typography.Text>
        </div>
        <Space size={token.marginXS}>
          <Button icon={<PlusOutlined />} type="primary">
            {t('addDish')}
          </Button>
        </Space>
      </Flex>
      <MenuModal
        initialValue={menu}
        open={isEditMenuModalOpen}
        onCancel={() => setIsEditMenuModalOpen(false)}
      />
    </PageLayout>
  );
}

export default MenuDetail;
