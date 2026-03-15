import QuestionIcon from '@icons/QuestionIcon';
import PizzaIcon from '@icons/PizzaIcon';
import TrayIcon from '@icons/TrayIcon';

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
      return QuestionIcon;
    case CoverIconEnum.TRAY:
    default:
      return TrayIcon;
  }
};
