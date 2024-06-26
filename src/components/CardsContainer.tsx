import { RestaurantList } from '../index.type';
import CardRestaurant from './CardRestaurant';

const CardsContainer = ({ item }: { item: RestaurantList[] }) => {
	return (
		<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
			{item.map((el) => {
				return (
					<CardRestaurant
						key={el.id}
						{...el}
					/>
				);
			})}
		</div>
	);
};

export default CardsContainer;
