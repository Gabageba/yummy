import Avatar from '@components/avatar/Avatar';
import CoverIcon from '@components/CoverIcon';
import { CoverIconEnum } from '@components/CoverIcon/models';
import DifficultyLabel from '@components/DifficultyLabel';
import Empty from '@components/core/Empty';
import { Difficulty } from '@components/core/fields/difficulty/models';
import PageLayout from '@components/core/PageLayout';
import PrimaryTag from '@components/core/PrimaryTag';
import { RoutePath } from '@routes/models';
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Flex,
  Input,
  Progress,
  Radio,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

interface IDataSource {
  key: string;
  name: string;
  status: string;
}

const dataSource: IDataSource[] = [
  { key: '1', name: 'Готовка пасты', status: 'В процессе' },
  { key: '2', name: 'Сбор коллекции', status: 'Готово' },
];

const columns: ColumnsType<IDataSource> = [
  { title: 'Название', dataIndex: 'name', key: 'name' },
  { title: 'Статус', dataIndex: 'status', key: 'status' },
];

function ComponentsPage() {
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Компоненты"
      description="Демо-страница с компонентами Ant Design и компонентами приложения."
    >
      <Flex vertical gap={16}>
        <Card title="Компоненты страниц">
          <Space wrap>
            <Button onClick={() => navigate(RoutePath.MAIN)}>Main</Button>
            <Button onClick={() => navigate(RoutePath.COLLECTIONS)}>Collections</Button>
            <Button onClick={() => navigate(RoutePath.DISHES)}>Dishes</Button>
            <Button onClick={() => navigate(RoutePath.MORE)}>More</Button>
            <Button onClick={() => navigate(RoutePath.SETTINGS)}>Settings</Button>
            <Button onClick={() => navigate(RoutePath.PROFILE)}>Profile</Button>
            <Button onClick={() => navigate(RoutePath.LOGIN)}>Login</Button>
            <Button onClick={() => navigate(RoutePath.REGISTER)}>Register</Button>
            <Button onClick={() => navigate(RoutePath.NOT_FOUND)}>Not Found</Button>
          </Space>
        </Card>

        <Card title="Ant Design: базовые элементы">
          <Flex vertical gap={12}>
            <Space wrap>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="text">Text</Button>
              <Button danger>Danger</Button>
            </Space>
            <Space wrap>
              <Input placeholder="Input" style={{ width: 220 }} />
              <Select
                style={{ width: 220 }}
                defaultValue="one"
                options={[
                  { label: 'Вариант 1', value: 'one' },
                  { label: 'Вариант 2', value: 'two' },
                ]}
              />
              <DatePicker />
            </Space>
            <Space wrap>
              <Switch defaultChecked />
              <Checkbox defaultChecked>Checkbox</Checkbox>
              <Radio checked>Radio</Radio>
              <Rate defaultValue={4} />
            </Space>
            <Space wrap style={{ width: '100%' }}>
              <Slider defaultValue={35} style={{ width: 220 }} />
              <Progress percent={65} style={{ width: 220 }} />
            </Space>
            <Table<IDataSource>
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              size="small"
            />
            <Tabs
              items={[
                { key: '1', label: 'Tab 1', children: 'Контент таба 1' },
                { key: '2', label: 'Tab 2', children: 'Контент таба 2' },
              ]}
            />
            <Alert message="Демо-алерт" type="info" showIcon />
            <Space wrap>
              <Badge count={7}>
                <Tag>Badge + Tag</Tag>
              </Badge>
              <Tag color="magenta">Tag</Tag>
            </Space>
          </Flex>
        </Card>

        <Card title="Компоненты приложения">
          <Flex vertical gap={12}>
            <Typography.Text strong>PrimaryTag</Typography.Text>
            <Space wrap>
              <PrimaryTag>Filled</PrimaryTag>
              <PrimaryTag variant="solid">Solid</PrimaryTag>
              <PrimaryTag variant="outlined">Outlined</PrimaryTag>
            </Space>

            <Divider style={{ margin: '4px 0' }} />

            <Typography.Text strong>DifficultyLabel</Typography.Text>
            <Space wrap>
              <DifficultyLabel difficulty={Difficulty.EASY} />
              <DifficultyLabel difficulty={Difficulty.MEDIUM} />
              <DifficultyLabel difficulty={Difficulty.HARD} />
            </Space>

            <Divider style={{ margin: '4px 0' }} />

            <Typography.Text strong>CoverIcon и Avatar</Typography.Text>
            <Space wrap>
              <CoverIcon icon={CoverIconEnum.TRAY} />
              <CoverIcon icon={CoverIconEnum.PIZZA} />
              <CoverIcon icon={CoverIconEnum.QUESTION} />
              <Avatar
                user={{ id: 'demo-id', username: 'demo', email: 'demo@yummy.local' }}
                size={40}
              />
            </Space>

            <Divider style={{ margin: '4px 0' }} />

            <Typography.Text strong>Empty</Typography.Text>
            <Empty description="Пока нет данных для отображения." />
          </Flex>
        </Card>
      </Flex>
    </PageLayout>
  );
}

export default ComponentsPage;
