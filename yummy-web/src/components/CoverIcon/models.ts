import { QuestionOutlined } from '@ant-design/icons';
import PizzaIcon from '@components/icons/PizzaIcon';
import TrayIcon from '@components/icons/TrayIcon';

export enum CoverIconEnum {
  PIZZA = 'PIZZA',
  TRAY = 'TRAY',
  QUESTION = 'QUESTION',
}

export const getComponentByCoverIcon = (icon?: CoverIconEnum) => {
  switch (icon) {
    case CoverIconEnum.PIZZA:
      return PizzaIcon;
    case CoverIconEnum.QUESTION:
      return QuestionOutlined;
    case CoverIconEnum.TRAY:
    default:
      return TrayIcon;
  }
};
