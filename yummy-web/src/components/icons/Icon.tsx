import type { IconBaseProps, IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import AntIcon from '@ant-design/icons';

export interface IIconProps extends Omit<IconBaseProps, 'component'> {
  size?: number;
  color?: string;
}

interface IProps extends IconComponentProps {
  size?: number;
  color?: string;
}

function Icon({ component, size, color, style, ...restProps }: IProps) {
  const resolvedStyle = { ...style };

  if (size !== undefined) {
    resolvedStyle.fontSize = size;
  }

  if (color !== undefined) {
    resolvedStyle.color = color;
  }

  return <AntIcon component={component} style={resolvedStyle} {...restProps} />;
}

export default Icon;
