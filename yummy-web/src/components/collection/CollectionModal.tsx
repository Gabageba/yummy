import useValidation from '@hooks/useValidation';
import { Form, Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import InputFormItem from '@components/core/formItems/InputFormItem';
import TextAreaFormItem from '@components/core/formItems/TextAreaFormItem';
import { ProfileOutlined } from '@ant-design/icons';
import {
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
} from '@pages/collections/collectionApi';
import type { ICollection } from '@pages/collections/List/models';

interface IProps {
  initialValue?: ICollection;
  open: boolean;
  onCancel: () => void;
}

function CollectionModal({ initialValue, open, onCancel }: IProps) {
  const { t } = useTranslation();
  const { required } = useValidation();
  const [form] = Form.useForm<ICollection>();

  const [create] = useCreateCollectionMutation();
  const [update] = useUpdateCollectionMutation();

  const handleClose = () => {
    form.resetFields();
    onCancel();
  };

  const onCreate = () => {
    form
      .validateFields()
      .then((collection) =>
        initialValue?.id ? update({ ...collection, id: initialValue.id }) : create(collection),
      )
      .then(handleClose);
  };

  return (
    <Modal
      open={open}
      title={
        <Typography.Title level={4}>
          {initialValue?.id ? t('editCollection') : t('createCollection')}
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

export default CollectionModal;
