import type { TagProps } from 'antd';
import { Tag } from 'antd';
import { useMemo } from 'react';
import './index.scss';
import useToken from '@hooks/useToken';

interface IProps extends Omit<TagProps, 'color' | 'className'> {}

function PrimaryTag({ variant, ...restProps }: IProps) {
  const token = useToken();

  const style = useMemo((): TagProps['style'] => {
    switch (variant) {
      case 'outlined':
        return {
          background: token.colorPrimaryLight,
          color: token.colorPrimary,
          borderColor: token.colorPrimary,
        };
      case 'solid':
        return {
          backgroundColor: token.colorPrimary,
          color: token.colorBgBase,
        };
      case 'filled':
      default:
        return {
          backgroundColor: token.colorPrimaryLight,
          color: token.colorPrimary,
        };
    }
  }, [variant, token]);

  return <Tag style={style} className="primary-tag" {...restProps} />;
}

export default PrimaryTag;
