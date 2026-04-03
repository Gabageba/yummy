import { App } from 'antd';
import { useTranslation } from 'react-i18next';

function useConfirmModal() {
  const { modal } = App.useApp();
  const { t } = useTranslation();

  const confirmDeletion = (onOk: () => void) => {
    modal.confirm({
      title: t('confirmDelete'),
      content: t('deleteWarning'),
      okType: 'danger',
      onOk: () => onOk(),
      okText: t('delete'),
      okButtonProps: { type: 'primary' },
    });
  };

  return { confirmDeletion };
}

export default useConfirmModal;
