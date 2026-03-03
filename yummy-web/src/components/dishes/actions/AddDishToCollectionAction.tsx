import { FolderAddOutlined } from '@ant-design/icons';
import DishCollectionsModal from '@pages/dishes/components/DishCollectionsModal';
import { useState } from 'react';
import './index.scss';

interface IProps {
  dishId: string;
}

function AddDishToCollectionAction({ dishId }: IProps) {
  const [isDishCollectionsModalOpen, setIsDishCollectionsModalOpen] = useState<boolean>(false);

  return (
    <>
      <FolderAddOutlined
        className="dish-actions__add-to-collection"
        onClick={(e) => {
          e.stopPropagation();
          setIsDishCollectionsModalOpen(true);
        }}
      />
      <DishCollectionsModal
        open={isDishCollectionsModalOpen}
        onCancel={() => setIsDishCollectionsModalOpen(false)}
        dishId={dishId}
      />
    </>
  );
}

export default AddDishToCollectionAction;
