import type { IIconProps } from './Icon';
import Icon from './Icon';

function InternalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="M140-254.62v-59.99h680v59.99H140ZM140-450v-60h680v60H140Zm0-195.39v-59.99h680v59.99H140Z" />
    </svg>
  );
}

interface IProps extends IIconProps {}

function MenuIcon({ ...restProps }: IProps) {
  return <Icon component={InternalIcon} {...restProps} />;
}

export default MenuIcon;
