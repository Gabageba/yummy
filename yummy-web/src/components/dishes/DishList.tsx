import CardsList from '@components/core/CardsList';
import { useGetDishesQuery } from '@pages/dishes/dishesApi';
import type { IDish } from '@pages/dishes/models';
import useCardListColumnsCount from '@hooks/useCardListColumnsCount';
import DishCard from './DishCard';

function DishList() {
  const columnsCount = useCardListColumnsCount();

  return (
    <CardsList<IDish>
      columnsCount={columnsCount}
      useQuery={useGetDishesQuery}
      cardRender={(dish) => <DishCard dish={dish} />}
    />
  );
}

export default DishList;
