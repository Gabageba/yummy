import useValidation from '@hooks/useValidation';
import { Form, Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import InputFormItem from '@components/core/formItems/InputFormItem';
import TextAreaFormItem from '@components/core/formItems/TextAreaFormItem';
import { ProfileOutlined } from '@ant-design/icons';
import { useCreateMenuMutation, useUpdateMenuMutation } from '@pages/menus/menuApi';
import type { IMenu } from '@pages/menus/List/models';

interface IProps {
  initialValue?: IMenu;
  open: boolean;
  onCancel: () => void;
}

function MenuModal({ initialValue, open, onCancel }: IProps) {
  const { t } = useTranslation();
  const { required } = useValidation();
  const [form] = Form.useForm<IMenu>();

  const [create] = useCreateMenuMutation();
  const [update] = useUpdateMenuMutation();

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  const onCreate = () => {
    form
      .validateFields()
      .then((menu) => (initialValue?.id ? update({ ...menu, id: initialValue.id }) : create(menu)))
      .then(handleClose);
  };

  return (
    <Modal
      open={open}
      title={
        <Typography.Title level={4}>
          {initialValue?.id ? t('editMenu') : t('createMenu')}
        </Typography.Title>
      }
      onCancel={handleClose}
      onOk={onCreate}
      okText={initialValue?.id ? t('save') : t('create')}
      cancelText={t('cancel')}
    >
      <Form form={form} layout="vertical" initialValues={initialValue}>
        <InputFormItem
          name="name"
          inputProps={{ prefix: <ProfileOutlined /> }}
          rules={[required]}
          label={t('title')}
        />
        <TextAreaFormItem name="description" label={t('description')} />
      </Form>
    </Modal>
  );
}

export default MenuModal;
