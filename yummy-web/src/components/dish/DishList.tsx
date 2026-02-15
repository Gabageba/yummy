import CardsList from '@components/core/CardsList';
import { useGetDishesQuery } from '@pages/dishes/dishApi';

interface IProps {
  collectionId: string;
}

function DishList({ collectionId }: IProps) {
  return (
    <CardsList
      useQuery={useGetDishesQuery}
      cardRender={() => <></>}
      additionalParams={{ collectionId }}
    />
  );
}

export default DishList;
