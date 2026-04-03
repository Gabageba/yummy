import { Button } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { ThemeMode } from '@components/themeMode/models';
import useThemeMode from '@components/themeMode/hooks/useThemeMode';

function ThemeButton() {
  const { themeMode, setThemeMode } = useThemeMode();

  const Icon = themeMode === ThemeMode.DARK ? MoonOutlined : SunOutlined;

  return (
    <Button
      type="text"
      icon={<Icon />}
      onClick={() => setThemeMode(themeMode === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK)}
    />
  );
}

export default ThemeButton;
