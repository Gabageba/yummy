import { Layout } from 'antd';
import type { ReactNode } from 'react';
import Header from './Header';
import './index.scss';

interface IProps {
  children: ReactNode;
}

const PageLayout = ({ children }: IProps) => (
  <Layout className="page-layout">
    <Header />
    <Layout.Content className="page-layout__content">{children}</Layout.Content>
    <Layout.Footer>footer</Layout.Footer>
  </Layout>
);

export default PageLayout;
