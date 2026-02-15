import PizzaIcon from '@components/icons/PizzaIcon';
import './index.scss';
import TrayIcon from '@components/icons/TrayIcon';
import { CollectionIcon } from '@pages/collections/models';

const getComponentByIcon = (icon?: CollectionIcon) => {
  switch (icon) {
    case CollectionIcon.PIZZA:
      return <PizzaIcon />;
    case CollectionIcon.TRAY:
    default:
      return <TrayIcon />;
  }
};

interface IProps {
  icon?: CollectionIcon;
}

function CollectionAvatar({ icon }: IProps) {
  return <div className="collection-card__avatar">{getComponentByIcon(icon)}</div>;
}

export default CollectionAvatar;
