import useConfirmModal from '@hooks/useConfirmModal';
import DeleteIcon from '@icons/DeleteIcon';
import { useDeleteDishMutation } from '@pages/dishes/dishesApi';

interface IProps {
  dishId: string;
}

function DeleteDishAction({ dishId }: IProps) {
  const { confirmDeletion } = useConfirmModal();
  const [deleteDish, { isLoading }] = useDeleteDishMutation();

  return (
    <DeleteIcon
      disabled={isLoading}
      onClick={(e) => {
        e.stopPropagation();
        confirmDeletion(() => deleteDish(dishId));
      }}
    />
  );
}

export default DeleteDishAction;
