import { useTranslation } from 'react-i18next';
import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import type { IDifficultyRadioGroupProps } from './DifficultyRadioGroup';
import DifficultyRadioGroup from './DifficultyRadioGroup';

interface IProps extends FormItemProps {
  radioGroupProps?: IDifficultyRadioGroupProps;
}

function DifficultyFormItem({
  label,
  name = 'difficulty',
  radioGroupProps = {},
  ...restProps
}: IProps) {
  const { t } = useTranslation();

  return (
    <Form.Item name={name} label={label || t('difficulty')} {...restProps}>
      <DifficultyRadioGroup {...radioGroupProps} />
    </Form.Item>
  );
}

export default DifficultyFormItem;
