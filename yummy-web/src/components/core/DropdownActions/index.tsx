import MoreIcon from '@icons/MoreIcon';
import type { DropdownProps, MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';

interface IProps extends Omit<DropdownProps, 'menu'> {
  actions: MenuProps['items'];
}

function DropdownActions({ actions, ...restProps }: IProps) {
  return (
    <Dropdown menu={{ items: actions }} {...restProps}>
      <Button icon={<MoreIcon />} type="text" />
    </Dropdown>
  );
}

export default DropdownActions;
