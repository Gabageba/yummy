import { Button, Flex, Grid, Layout, Spin, theme, Typography } from 'antd';
import { useMemo, type ReactNode } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './index.scss';

interface IProps {
  children: ReactNode;
  isLoading?: boolean;
  title?: ReactNode;
  description?: string;
  actions?: ReactNode;
  showBackButton?: boolean;
}

const PageLayout = ({
  showBackButton,
  children,
  isLoading = false,
  title,
  description,
  actions,
}: IProps) => {
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const isScreensCalculated = useMemo(
    () =>
      screens.lg !== undefined &&
      screens.md !== undefined &&
      screens.sm !== undefined &&
      screens.xs !== undefined &&
      screens.xl !== undefined &&
      screens.xxl !== undefined,
    [screens.lg, screens.md, screens.sm, screens.xs, screens.xl, screens.xxl],
  );

  return (
    <Layout className="page-layout">
      <Header />
      <Layout.Content className="page-layout__content page-layout__container">
        {isLoading || !isScreensCalculated ? (
          <Spin spinning />
        ) : (
          <>
            {(title || description || actions) && (
              <Flex
                justify="space-between"
                align="center"
                className="page-layout__title"
                gap={token.margin}
              >
                <div>
                  <Flex align="center" gap={token.marginXS}>
                    {showBackButton && (
                      <Button type="text" icon={<LeftOutlined />} onClick={() => navigate(-1)} />
                    )}
                    {title && <Typography.Title level={2}>{title}</Typography.Title>}
                  </Flex>
                  {description && <Typography.Text type="secondary">{description}</Typography.Text>}
                </div>
                {actions}
              </Flex>
            )}

            {children}
          </>
        )}
      </Layout.Content>
      {/* <Layout.Footer /> */}
    </Layout>
  );
};

export default PageLayout;
