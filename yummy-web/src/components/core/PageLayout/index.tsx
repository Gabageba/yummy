import { Flex, Grid, Layout, Spin, theme, Typography } from 'antd';
import { useMemo, type ReactNode } from 'react';
import Header from './Header';
import './index.scss';

interface IProps {
  children: ReactNode;
  isLoading?: boolean;
  title?: string;
  description?: string;
  actions?: ReactNode;
}

const PageLayout = ({
  children,
  isLoading = false,
  title,
  description,
  actions = <></>,
}: IProps) => {
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();

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
            <Flex
              justify="space-between"
              align="center"
              className="collection__title"
              gap={token.margin}
            >
              <div>
                {title && <Typography.Title level={2}>{title}</Typography.Title>}
                {description && <Typography.Text type="secondary">{description}</Typography.Text>}
              </div>
              {actions}
            </Flex>
            {children}
          </>
        )}
      </Layout.Content>

      <Layout.Footer>footer</Layout.Footer>
    </Layout>
  );
};

export default PageLayout;
