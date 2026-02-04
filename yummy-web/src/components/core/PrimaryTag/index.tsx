import { COLORS } from '@utils/antdTheme';
import type { TagProps } from 'antd';
import { Tag } from 'antd';
import { useMemo } from 'react';

interface IProps extends Omit<TagProps, 'color'> {}

function PrimaryTag({ variant, ...restProps }: IProps) {
  const style = useMemo((): TagProps['style'] => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: COLORS.SECONDARY_BG_COLOR,
          color: COLORS.PRIMARY_COLOR,
          borderColor: COLORS.PRIMARY_COLOR,
        };
      case 'solid':
        return {
          backgroundColor: COLORS.PRIMARY_COLOR,
          color: COLORS.BACKGROUND_COLOR,
        };
      case 'filled':
      default:
        return {
          backgroundColor: COLORS.SECONDARY_BG_COLOR,
          color: COLORS.PRIMARY_COLOR,
        };
    }
  }, [variant]);

  return <Tag style={style} {...restProps} />;
}

export default PrimaryTag;
