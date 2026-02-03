import { Button } from 'antd';
import { useCreateMenuMutation } from './menuApi';

function Menu() {
  const [createMenu] = useCreateMenuMutation();

  return (
    <>
      Menu
      <Button onClick={() => createMenu({ name: 'fdsadsf' })}>CreateMenu</Button>
    </>
  );
}

export default Menu;
