import { COLORS } from '@utils/antdTheme';
import type { TagProps } from 'antd';
import { Tag } from 'antd';
import { useMemo } from 'react';
import './index.scss';

interface IProps extends Omit<TagProps, 'color' | 'className'> {}

function PrimaryTag({ variant, ...restProps }: IProps) {
  const style = useMemo((): TagProps['style'] => {
    switch (variant) {
      case 'outlined':
        return {
          background: COLORS.PRIMARY_LIGHT_COLOR,
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
          backgroundColor: COLORS.PRIMARY_LIGHT_COLOR,
          color: COLORS.PRIMARY_COLOR,
        };
    }
  }, [variant]);

  return <Tag style={style} className="primary-tag" {...restProps} />;
}

export default PrimaryTag;
