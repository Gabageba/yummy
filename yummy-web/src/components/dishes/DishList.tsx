import CardsList from '@components/core/CardsList';
import { useGetDishesQuery } from '@pages/dishes/dishesApi';
import type { IDish } from '@pages/dishes/models';
import DishCard from './DishCard';

function DishList() {
  return (
    <CardsList<IDish>
      columnsCount={3}
      useQuery={useGetDishesQuery}
      cardRender={(dish) => <DishCard dish={dish} />}
    />
  );
}

export default DishList;
