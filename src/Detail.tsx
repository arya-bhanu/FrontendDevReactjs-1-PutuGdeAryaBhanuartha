import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getDetail } from './query';
import { useEffect, useState } from 'react';
import { RestaurantDetail } from './index.type';
import SectionLoader from './loader/SectionLoader';
import TagCategory from './components/TagCategory';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import TagMenu from './components/TagMenu';
import { IoFastFood } from 'react-icons/io5';
import { RiDrinks2Line } from 'react-icons/ri';
import Comment from './components/Comment';

const Detail = () => {
	const { id } = useParams();
	const [dataDetail, setDetailData] = useState<RestaurantDetail | null>(null);
	const query = useQuery({
		queryKey: ['detail'],
		queryFn: () => getDetail(id),
	});
	useEffect(() => {
		if (query.data) {
			setDetailData(query.data.restaurant);
		}
	}, [query.data]);
	function renderStar(rating: number) {
		return (
			<div className='flex items-center gap-x-1'>
				{Array.from({ length: rating }, () => (
					<FaStar className='text-cyan-600' />
				))}
				{Array.from({ length: 5 - rating }, () => (
					<FaRegStar className='text-cyan-600' />
				))}
			</div>
		);
	}
	return (
		<div>
			<h1 className='text-3xl'>Restaurant Detail</h1>
			{!query.isLoading && dataDetail ? (
				<>
					<section className='flex gap-x-14 flex-wrap mt-12 lg:flex-row flex-col gap-y-7'>
						<img
							src={`https://restaurant-api.dicoding.dev/images/medium/${dataDetail.pictureId}`}
							className='lg:w-[45%] lg:h-[25rem] object-cover h-[30rem] w-full'
						/>
						<div className='flex-1'>
							<h2 className='text-5xl tracking-wide font-semibold'>
								{dataDetail.name}
							</h2>
							<p className='mt-4'>{dataDetail.description}</p>
							<div className='mt-4 py-4 border-y border-gray-300/50 flex item-center gap-x-3'>
								{dataDetail.categories.map((el) => (
									<TagCategory
										category={el.name}
										key={el.name}
									/>
								))}
							</div>
							<div className='flex items-center gap-x-2 mt-4'>
								{renderStar(Number(dataDetail.rating.toFixed(0)))}{' '}
								{Number(dataDetail.rating.toFixed(0))}
							</div>
						</div>
					</section>
					<section className='mt-8'>
						<h2 className='text-2xl font-semibold py-3 border-b border-b-gray-400/35'>
							Address
						</h2>
						<p className='text-xl mt-2'>{dataDetail.address}</p>
					</section>
					<section className='mt-7'>
						<h2 className='text-2xl font-semibold py-3 border-b border-b-gray-400/35'>
							Menus
						</h2>
						<div className='mt-3 flex flex-col gap-y-4'>
							<div>
								<h3 className='text-xl font-semibold'>Food</h3>
								<div className='flex flex-wrap items-center gap-3 mt-2'>
									{dataDetail.menus.foods.map((el) => {
										return (
											<TagMenu
												text={el.name}
												icon={IoFastFood}
												key={el.name}
											/>
										);
									})}
								</div>
							</div>
							<div>
								<h3 className='text-xl font-semibold'>Drinks</h3>
								<div className='flex flex-wrap items-center gap-3 mt-2'>
									{dataDetail.menus.drinks.map((el) => {
										return (
											<TagMenu
												text={el.name}
												key={el.name}
												icon={RiDrinks2Line}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</section>
					<section className='mt-7'>
						<h2 className='text-2xl font-semibold py-3 border-b border-b-gray-400/35'>
							Comments
						</h2>
						<div>
							{dataDetail.customerReviews.map((el) => {
								return (
									<Comment
										comment={el.review}
										date={el.date}
										name={el.name}
										key={el.review}
									/>
								);
							})}
						</div>
					</section>
				</>
			) : null}
			{query.isLoading ? <SectionLoader /> : null}
		</div>
	);
};

export default Detail;
