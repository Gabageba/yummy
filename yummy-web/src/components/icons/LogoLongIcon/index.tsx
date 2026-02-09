import LogoIcon from '../LogoIcon';
import './index.scss';

interface IProps {
  className?: string;
  onClick?: () => void;
}

function LogoLongIcon({ className = '', onClick }: IProps) {
  return (
    <div className={`logo-long-icon ${className}`} onClick={onClick}>
      <LogoIcon /> ВКУСНЯШКА
    </div>
  );
}

export default LogoLongIcon;
