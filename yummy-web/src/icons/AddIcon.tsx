import type { IIconProps } from './Icon';
import Icon from './Icon';

function InternalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z" />
    </svg>
  );
}

interface IProps extends IIconProps {}

function AddIcon({ ...restProps }: IProps) {
  return <Icon component={InternalIcon} {...restProps} />;
}

export default AddIcon;
