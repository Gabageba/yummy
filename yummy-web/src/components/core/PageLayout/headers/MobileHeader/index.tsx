import { Col, Flex, Layout, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import '../../index.scss';
import { token } from '@theme/token';
import { getMobileMenuItems, getSelectedKey } from '../utils';

function MobileHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = getMobileMenuItems(t);
  const selectedKey = getSelectedKey(location.pathname);

  return (
    <Layout.Header className="page-layout__header page-layout__header--mobile">
      <Row className="page-layout__header--mobile-menu" gutter={token.margin}>
        {menuItems.map(({ key, icon, label }) => (
          <Col
            key={key}
            span={24 / menuItems.length}
            className={`page-layout__header--mobile-menu-item ${key === selectedKey ? 'page-layout__header--mobile-menu-item-active' : ''}`}
          >
            <Flex
              key={key}
              onClick={() => navigate(key as string)}
              align="center"
              justify="center"
              vertical
            >
              {icon}
              <Typography.Text>{label}</Typography.Text>
            </Flex>
          </Col>
        ))}
      </Row>
    </Layout.Header>
  );
}

export default MobileHeader;
