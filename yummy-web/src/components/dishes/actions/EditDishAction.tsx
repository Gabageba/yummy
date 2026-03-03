import { EditOutlined } from '@ant-design/icons';
import DishModal from '@pages/dishes/DishModal';
import type { IDish } from '@pages/dishes/models';
import { useState } from 'react';

interface IProps {
  dish: IDish;
}

function EditDishAction({ dish }: IProps) {
  const [isDishModalOpen, setIsDishModalOpen] = useState<boolean>(false);
  return (
    <>
      <EditOutlined
        onClick={(e) => {
          e.stopPropagation();
          setIsDishModalOpen(true);
        }}
      />
      <DishModal
        initialValue={dish}
        open={isDishModalOpen}
        onCancel={() => setIsDishModalOpen(false)}
      />
    </>
  );
}

export default EditDishAction;
