import useValidation from '@hooks/useValidation';
import { App, Form, Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import InputFormItem from '@components/core/fields/InputFormItem';
import TextAreaFormItem from '@components/core/fields/TextAreaFormItem';
import {
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
} from '@pages/collections/collectionsApi';
import type { ICollection } from '@pages/collections/List/models';
import useApiValidationErrors from '@hooks/useApiValidationErrors';
import useAutoFocus from '@hooks/useAutoFocus';

interface IProps {
  initialValue?: ICollection;
  open: boolean;
  onCancel: () => void;
}

function CollectionModal({ initialValue, open, onCancel }: IProps) {
  const { t } = useTranslation();
  const { required } = useValidation();
  const [form] = Form.useForm<ICollection>();
  const { handleValidationErrors } = useApiValidationErrors(form);
  const { afterOpenChange } = useAutoFocus('name', form);
  const { notification } = App.useApp();

  const [create, { isLoading: isCreating }] = useCreateCollectionMutation();
  const [update, { isLoading: isUpdating }] = useUpdateCollectionMutation();

  const onOk = () => {
    form
      .validateFields()
      .then((collection) =>
        initialValue?.id ? update({ ...collection, id: initialValue.id }) : create(collection),
      )
      .then(() => {
        notification.success({
          message: t('collectionSuccessfullyCreated'),
          placement: 'bottomLeft',
        });
        onCancel();
      })
      .catch(handleValidationErrors);
  };

  return (
    <Modal
      open={open}
      afterOpenChange={afterOpenChange}
      afterClose={form.resetFields}
      title={
        <Typography.Title level={4}>
          {initialValue?.id ? t('editCollection') : t('createCollection')}
        </Typography.Title>
      }
      onCancel={onCancel}
      onOk={onOk}
      okText={initialValue?.id ? t('save') : t('create')}
      okButtonProps={{ loading: isUpdating || isCreating }}
    >
      <Form form={form} layout="vertical" initialValues={initialValue}>
        <InputFormItem name="name" rules={[required]} label={t('title')} />
        <TextAreaFormItem name="description" label={t('description')} />
      </Form>
    </Modal>
  );
}

export default CollectionModal;
