import useValidation from '@hooks/useValidation';
import { Form, Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import InputFormItem from '@components/core/fields/InputFormItem';
import TextAreaFormItem from '@components/core/fields/TextAreaFormItem';
import SelectFormItem from '@components/core/fields/SelectFormItem';
import DifficultyFormItem from '@components/core/fields/difficulty/DifficultyFormItem';
import { Difficulty } from '@components/core/fields/difficulty/models';
import { useCreateDishMutation } from '@pages/dishes/dishesApi';
import type { IDish, IDishPayload } from '@pages/dishes/models';

interface IProps {
  initialValue?: IDish;
  open: boolean;
  onCancel: () => void;
}

function DishModal({ initialValue, open, onCancel }: IProps) {
  const { t } = useTranslation();
  const { required } = useValidation();
  const [form] = Form.useForm<IDishPayload>();

  const [create] = useCreateDishMutation();

  const onOk = () => {
    form
      .validateFields()
      .then((dish) => create(dish))
      .then(() => onCancel());
  };

  return (
    <Modal
      open={open}
      title={
        <Typography.Title level={4}>
          {initialValue?.id ? t('editDish') : t('createDish')}
        </Typography.Title>
      }
      onCancel={onCancel}
      onOk={onOk}
      okText={initialValue?.id ? t('save') : t('create')}
      cancelText={t('cancel')}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          initialValue || {
            difficulty: Difficulty.EASY,
          }
        }
      >
        <InputFormItem name="name" rules={[required]} label={t('title')} />
        <TextAreaFormItem name="description" label={t('description')} />
        <SelectFormItem
          name="tags"
          label={t('tags')}
          selectProps={{
            mode: 'tags',
          }}
        />
        <DifficultyFormItem rules={[required]} radioGroupProps={{ block: true }} />
        <SelectFormItem
          name="mainIngredients"
          label={t('mainIngredients')}
          selectProps={{
            mode: 'tags',
          }}
        />
      </Form>
    </Modal>
  );
}

export default DishModal;
