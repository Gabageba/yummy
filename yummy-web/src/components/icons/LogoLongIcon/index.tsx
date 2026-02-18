import type { IIconProps } from '../Icon';
import LogoIcon from '../LogoIcon';
import './index.scss';

interface IProps extends IIconProps {
  className?: string;
  onClick?: () => void;
}

function LogoLongIcon({ className = '', onClick, size, color, ...restProps }: IProps) {
  return (
    <div
      className={`logo-long-icon ${className}`}
      style={{ fontSize: size, color }}
      onClick={onClick}
    >
      <LogoIcon size={size} color={color} {...restProps} /> ВКУСНЯШКА
    </div>
  );
}

export default LogoLongIcon;
