import type { RadioGroupProps } from 'antd';
import { Flex, Radio, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { getDifficultyOptions } from '../models';
import './index.scss';

export interface IDifficultyRadioGroupProps extends Omit<
  RadioGroupProps,
  'optionType' | 'buttonStyle'
> {}

function DifficultyRadioGroup({ className, ...restProps }: IDifficultyRadioGroupProps) {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  return (
    <Radio.Group
      optionType="button"
      buttonStyle="solid"
      className={`difficulty-radio-group ${className}`}
      {...restProps}
    >
      {getDifficultyOptions(t).map(({ value, label, Icon }) => (
        <Radio.Button key={value} value={value} className={`difficulty-${value}`}>
          <Flex align="center" gap={token.marginXS}>
            <Icon />
            {label}
          </Flex>
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}

export default DifficultyRadioGroup;
