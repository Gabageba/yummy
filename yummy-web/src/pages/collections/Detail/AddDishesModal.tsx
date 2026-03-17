import { Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function AddDishesModal({ open, onCancel }: IProps) {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={<Typography.Title level={4}>{t('addDishes')}</Typography.Title>}
    />
  );
}

export default AddDishesModal;
