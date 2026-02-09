import { Layout, Spin } from 'antd';
import type { ReactNode } from 'react';
import Header from './Header';
import './index.scss';

interface IProps {
  children: ReactNode;
  isLoading?: boolean;
}

const PageLayout = ({ children, isLoading = false }: IProps) => (
  <Layout className="page-layout">
    <Header />
    <Layout.Content className="page-layout__content page-layout__container">
      <Spin spinning={isLoading}>{children}</Spin>
    </Layout.Content>

    <Layout.Footer>footer</Layout.Footer>
  </Layout>
);

export default PageLayout;
