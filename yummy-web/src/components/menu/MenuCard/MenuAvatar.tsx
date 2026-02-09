import PizzaIcon from '@components/icons/PizzaIcon';
import './index.scss';
import TrayIcon from '@components/icons/TrayIcon';
import { MenuIcon } from '@pages/menus/models';

const getComponentByIcon = (icon?: MenuIcon) => {
  switch (icon) {
    case MenuIcon.PIZZA:
      return <PizzaIcon />;
    case MenuIcon.TRAY:
    default:
      return <TrayIcon />;
  }
};

interface IProps {
  icon?: MenuIcon;
}

function MenuAvatar({ icon }: IProps) {
  return <div className="menu-card__avatar">{getComponentByIcon(icon)}</div>;
}

export default MenuAvatar;
