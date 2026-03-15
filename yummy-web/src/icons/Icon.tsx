import type { IconBaseProps, IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import AntIcon from '@ant-design/icons';
import React from 'react';

export interface IIconProps extends Omit<IconBaseProps, 'component'> {
  size?: number;
  color?: string;
  /** Соотношение height/width из viewBox. Если задано, size задаёт высоту (1em), ширина считается по пропорции. */
  aspectRatio?: number;
}

interface IProps extends IconComponentProps {
  size?: number;
  color?: string;
  aspectRatio?: number;
}

function Icon({ component, size, color, style, aspectRatio, ...restProps }: IProps) {
  const resolvedStyle = { ...style };

  if (size !== undefined) {
    resolvedStyle.fontSize = size;
  }

  if (color !== undefined) {
    resolvedStyle.color = color;
  }

  const ComponentWithComputedSize = (
    props: React.ComponentProps<NonNullable<typeof component>>,
  ) => {
    const computedSize =
      aspectRatio != null
        ? {
            width: `${1 / aspectRatio}em`,
            height: '1em',
            preserveAspectRatio: 'xMidYMid meet' as const,
          }
        : {};
    // При aspectRatio подменяем размеры; иначе оставляем width/height от Ant Design (1em), иначе SVG не отображается
    const { width, height, ...rest } = props;
    const sizeProps = aspectRatio != null ? computedSize : { width, height };
    return React.createElement(component as React.ComponentType<typeof rest>, {
      ...rest,
      ...sizeProps,
    });
  };

  return (
    <AntIcon
      component={ComponentWithComputedSize as React.ComponentType<React.SVGProps<SVGSVGElement>>}
      style={resolvedStyle}
      {...restProps}
    />
  );
}

export default Icon;
