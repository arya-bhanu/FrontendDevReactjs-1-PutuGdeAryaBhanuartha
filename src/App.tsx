/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getList } from './query';
import { RestaurantList } from './index.type';
import { filterPrice } from './query/filter';
import { formatRupiah } from './utils/currencyFormat';
import ContainerItemsCard from './components/ContainerItemsCard';

export default function App() {
	const [isOpenNow, setIsOpenNow] = useState<boolean | null>(null);
	const [currPrice, setCurrPrice] = useState<number>(0);
	const [currCategory, setCurrCategory] = useState('');
	const [categories, setCategories] = useState<string[]>([]);
	const [item, setItem] = useState<RestaurantList[] | undefined>(undefined);

	const query = useQuery({
		queryKey: ['restaurants', currCategory],
		queryFn: () => getList(currCategory),
		refetchOnWindowFocus: false,
	});

	// handle on init browser data
	useEffect(() => {
		const collected = window.localStorage.getItem('collected');
		const category = window.localStorage.getItem('category');

		if (query.data && !collected) {
			window.localStorage.setItem('collected', JSON.stringify(query.data.data));
			filterDataCollection(isOpenNow, currPrice);
		}
		if (query.data && !category) {
			window.localStorage.setItem(
				'category',
				JSON.stringify(query.data.categories)
			);
			setCategories(query.data.categories);
		}

		if (collected) {
			setItem(JSON.parse(collected));
		}

		if (category) {
			setCategories(JSON.parse(category));
		}
	}, [currPrice, isOpenNow, query.data]);

	// client side searching
	useEffect(() => {
		filterDataCollection(isOpenNow, currPrice);
	}, [currPrice, isOpenNow]);

	// server side searching
	// handle on category change
	useEffect(() => {
		window.localStorage.removeItem('collected');
	}, [currCategory]);

	// filter price
	const handleChangePriceFilter = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCurrPrice(Number(event.target.value));
	};

	// filter category
	const handleChangeCategoryFilter = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setCurrCategory(event.target.value);
	};

	// clear filter
	const handleClearFilter = () => {
		setIsOpenNow(null);
		setCurrPrice(0);
		setCurrCategory('');
	};

	// filter data collection on each search
	const filterDataCollection = (
		isOpenNow: boolean | null,
		currPrice: number
	) => {
		const item = window.localStorage.getItem('collected');
		if (item) {
			const parsedItem = JSON.parse(item) as RestaurantList[];
			const filteredItem = parsedItem.filter((el) => {
				if (isOpenNow) {
					return el.isOpen === isOpenNow && el.price.lowest > currPrice;
				}
				return el.price.lowest > currPrice;
			});
			setItem(filteredItem);
		}
	};

	return (
		<div className='flex flex-col gap-y-7'>
			<div className='px-10 space-y-5'>
				<h1 className='text-4xl'>Restaurants</h1>
				<p className='text-gray-500 max-w-xl '>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>
			<div className='py-3 border-y border-gray-300/65 flex justify-between items-center flex-wrap gap-y-3 mt-1'>
				<div className='px-10 flex gap-x-5 gap-y-2 flex-wrap items-center'>
					<span>Filter by:</span>
					<div className='flex flex-wrap gap-x-4 gap-y-3'>
						<div className='filter-wrapper'>
							<input
								type='radio'
								id='is_open'
								className='min-w-0 sm:min-w-6'
								onChange={() => setIsOpenNow(true)}
								checked={isOpenNow ? true : false}
							/>
							<label htmlFor='is_open'>Open now</label>
						</div>
						<div className='filter-wrapper'>
							<select
								name='price'
								id='price'
								className='min-w-0 sm:min-w-24'
								onChange={handleChangePriceFilter}
								value={currPrice}
							>
								<option value={0}>Price</option>
								{filterPrice.map((el) => {
									return (
										<option key={el} value={el}>{'Rp > ' + formatRupiah(el)}</option>
									);
								})}
							</select>
						</div>
						<div className='filter-wrapper'>
							<select
								name='category'
								id='category'
								className='min-w-0 sm:min-w-40'
								onChange={handleChangeCategoryFilter}
								value={currCategory}
							>
								<option value={''}>Categories</option>
								{categories
									? categories.map((el) => {
											return <option key={el} value={el}>{el}</option>;
									  })
									: ''}
							</select>
						</div>
					</div>
				</div>
				<div className='px-10'>
					<button
						onClick={handleClearFilter}
						className='py-2 w-full px-5 text-white bg-cyan-800 hover:bg-cyan-600 transition'
					>
						CLEAR ALL
					</button>
				</div>
			</div>
			<ContainerItemsCard
				key={'container_items_card'}
				item={item}
				query={query}
			/>
		</div>
	);
}
