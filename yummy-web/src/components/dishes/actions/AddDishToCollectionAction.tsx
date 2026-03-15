import DishCollectionsModal from '@pages/dishes/components/DishCollectionsModal';
import { useState } from 'react';
import './index.scss';
import AddFolderIcon from '@icons/AddFolderIcon';

interface IProps {
  dishId: string;
}

function AddDishToCollectionAction({ dishId }: IProps) {
  const [isDishCollectionsModalOpen, setIsDishCollectionsModalOpen] = useState<boolean>(false);

  return (
    <>
      <AddFolderIcon
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
