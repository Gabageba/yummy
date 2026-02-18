import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { theme } from 'antd';
import type { IIconProps } from './Icon';
import Icon from './Icon';

function InternalIcon(props: CustomIconComponentProps | React.SVGProps<SVGSVGElement>) {
  const { width = '1em', height = '1em', ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <rect width="64" height="64" rx="16" fill="currentColor" />
      <path
        d="M41 19C40.25 19 35 20.5 35 27.25V32.5C35 34.1547 36.3453 35.5 38 35.5H39.5V41.5C39.5 42.3297 40.1703 43 41 43C41.8297 43 42.5 42.3297 42.5 41.5V35.5V30.25V20.5C42.5 19.6703 41.8297 19 41 19ZM24.5 19.75C24.5 19.3656 24.2141 19.0469 23.8297 19.0047C23.4453 18.9625 23.1031 19.2156 23.0188 19.5859L21.5984 25.975C21.5328 26.2703 21.5 26.5703 21.5 26.8703C21.5 29.0219 23.1453 30.7891 25.25 30.9813V41.5C25.25 42.3297 25.9203 43 26.75 43C27.5797 43 28.25 42.3297 28.25 41.5V30.9813C30.3547 30.7891 32 29.0219 32 26.8703C32 26.5703 31.9672 26.2703 31.9016 25.975L30.4813 19.5859C30.3969 19.2109 30.0453 18.9625 29.6656 19.0047C29.2859 19.0469 29 19.3656 29 19.75V26.0406C29 26.2937 28.7937 26.5 28.5406 26.5C28.3016 26.5 28.1047 26.3172 28.0812 26.0781L27.4953 19.6844C27.4625 19.2953 27.1391 19 26.75 19C26.3609 19 26.0375 19.2953 26.0047 19.6844L25.4234 26.0781C25.4 26.3172 25.2031 26.5 24.9641 26.5C24.7109 26.5 24.5047 26.2937 24.5047 26.0406V19.75H24.5ZM26.7641 26.875H26.75H26.7359L26.75 26.8422L26.7641 26.875Z"
        fill="white"
      />
    </svg>
  );
}

interface IProps extends IIconProps {}

function LogoIcon({ color, ...restProps }: IProps) {
  const { token } = theme.useToken();

  return <Icon component={InternalIcon} color={color || token.colorPrimary} {...restProps} />;
}

export default LogoIcon;
