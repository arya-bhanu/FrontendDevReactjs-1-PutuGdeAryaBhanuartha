import { useEffect, useState } from 'react';
import { RestaurantList } from '../index.type';
import CardRestaurant from './CardRestaurant';

const CardsContainer = ({ item }: { item: RestaurantList[] }) => {
	const limit = 8;
	const [itemLength, setItemLength] = useState(0);
	const [slicedItem, setSlicedItem] = useState(item);
	useEffect(() => {
		setItemLength(item.length);
		const slice = item.slice(0, 8);
		setSlicedItem(slice);
	}, [item]);
	return (
		<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
			{slicedItem.map((el) => {
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
