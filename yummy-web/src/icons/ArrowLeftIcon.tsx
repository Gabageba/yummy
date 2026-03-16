import type { IIconProps } from './Icon';
import Icon from './Icon';

function InternalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" {...props}>
      <path d="M640-93.85 253.85-480 640-866.15l56.77 56.77L367.38-480l329.39 329.38L640-93.85Z" />
    </svg>
  );
}

interface IProps extends IIconProps {}

function ArrowLeftIcon({ ...restProps }: IProps) {
  return <Icon component={InternalIcon} {...restProps} />;
}

export default ArrowLeftIcon;
