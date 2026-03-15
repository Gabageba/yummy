import DeleteIcon from '@icons/DeleteIcon';
import { useDeleteDishMutation } from '@pages/dishes/dishesApi';

interface IProps {
  dishId: string;
}

function DeleteDishAction({ dishId }: IProps) {
  const [deleteDish] = useDeleteDishMutation();

  return (
    <DeleteIcon
      onClick={(e) => {
        e.stopPropagation();
        deleteDish(dishId);
      }}
    />
  );
}

export default DeleteDishAction;
