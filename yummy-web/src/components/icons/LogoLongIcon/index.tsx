import LogoIcon from '../LogoIcon';
import './index.scss';

interface IProps {
  className?: string;
}

function LogoLongIcon({ className = '' }: IProps) {
  return (
    <div className={`logo-long-icon ${className}`}>
      <LogoIcon /> ВКУСНЯШКА
    </div>
  );
}

export default LogoLongIcon;
