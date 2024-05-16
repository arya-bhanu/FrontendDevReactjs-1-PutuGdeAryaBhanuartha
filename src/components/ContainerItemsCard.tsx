/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemsLoader from '../loader/ItemsLoader';
import CardsContainer from './CardsContainer';
import { RestaurantList } from '../index.type';
import { UseQueryResult } from '@tanstack/react-query';
import EmptyResult from './EmptyResult';
import { useState } from 'react';

const ContainerItemsCard = ({
	item,
	query,
}: {
	item: RestaurantList[] | undefined;
	query: UseQueryResult<{ data: any[]; categories: string[] } | null | Error>;
}) => {
	const [isContentAvail, setIsContentAvail] = useState(true);
	return (
		<section className='px-10 mt-12'>
			<h2 className='text-2xl'>All Restaurants</h2>
			<div className='mt-8'>
				{item && !query.isLoading ? (
					<CardsContainer item={item} />
				) : (
					<ItemsLoader />
				)}
				{item && item.length === 0 ? <EmptyResult /> : null}
			</div>
			{isContentAvail ? (
				<button className='py-2 max-w-56  mt-10 mb-8 mx-auto block w-full border border-cyan-900 text-cyan-900 bg-white hover:bg-cyan-900 hover:text-white transition'>
					LOAD MORE
				</button>
			) : null}
		</section>
	);
};

export default ContainerItemsCard;
