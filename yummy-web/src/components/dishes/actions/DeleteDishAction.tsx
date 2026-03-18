import DeleteIcon from '@icons/DeleteIcon';
import { useDeleteDishMutation } from '@pages/dishes/dishesApi';

interface IProps {
  dishId: string;
}

function DeleteDishAction({ dishId }: IProps) {
  const [deleteDish, { isLoading }] = useDeleteDishMutation();

  return (
    <DeleteIcon
      disabled={isLoading}
      onClick={(e) => {
        e.stopPropagation();
        deleteDish(dishId);
      }}
    />
  );
}

export default DeleteDishAction;
