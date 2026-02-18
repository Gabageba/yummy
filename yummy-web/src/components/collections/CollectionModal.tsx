import useValidation from '@hooks/useValidation';
import { Form, Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import InputFormItem from '@components/core/fields/InputFormItem';
import TextAreaFormItem from '@components/core/fields/TextAreaFormItem';
import {
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
} from '@pages/collections/collectionsApi';
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

  const onOk = () => {
    form
      .validateFields()
      .then((collection) =>
        initialValue?.id ? update({ ...collection, id: initialValue.id }) : create(collection),
      )
      .then(onCancel);
  };

  return (
    <Modal
      open={open}
      afterClose={form.resetFields}
      title={
        <Typography.Title level={4}>
          {initialValue?.id ? t('editCollection') : t('createCollection')}
        </Typography.Title>
      }
      onCancel={onCancel}
      onOk={onOk}
      okText={initialValue?.id ? t('save') : t('create')}
      cancelText={t('cancel')}
    >
      <Form form={form} layout="vertical" initialValues={initialValue}>
        <InputFormItem name="name" rules={[required]} label={t('title')} />
        <TextAreaFormItem name="description" label={t('description')} />
      </Form>
    </Modal>
  );
}

export default CollectionModal;
