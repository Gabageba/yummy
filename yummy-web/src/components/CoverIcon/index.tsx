import type { CoverIconEnum } from './models';
import { getComponentByCoverIcon } from './models';
import './index.scss';

interface IProps {
  icon?: CoverIconEnum;
}

function CoverIcon({ icon }: IProps) {
  const Icon = getComponentByCoverIcon(icon);

  return (
    <div className="cover-icon">
      <Icon />
    </div>
  );
}

export default CoverIcon;
