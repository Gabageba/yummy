import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, type ButtonProps } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';

interface IAction extends Omit<MenuItemType, 'onClick'> {
  onClick: () => void;
}

interface IInternalButtonProps {
  type?: ButtonProps['type'];
  action: IAction;
}

function InternalButton({ action, type }: IInternalButtonProps) {
  const { label, onClick, icon } = action;
  return (
    <Button type={type} onClick={onClick} icon={icon}>
      {label}
    </Button>
  );
}

interface IProps {
  type?: ButtonProps['type'];
  actions: IAction[];
}

function ButtonGroup({ actions = [], type }: IProps) {
  if (actions.length <= 1) {
    // eslint-disable-next-line no-console
    console.error('Задайте минимум 2 экшена, в противном случае используйте Button');
    return <></>;
  }

  return (
    <Space.Compact>
      <InternalButton type={type} action={actions[0]} />
      {actions.length === 2 ? (
        <InternalButton type={type} action={actions[1]} />
      ) : (
        <Dropdown menu={{ items: actions.slice(1) }}>
          <Button type={type} icon={<EllipsisOutlined />} />
        </Dropdown>
      )}
    </Space.Compact>
  );
}

export default ButtonGroup;
