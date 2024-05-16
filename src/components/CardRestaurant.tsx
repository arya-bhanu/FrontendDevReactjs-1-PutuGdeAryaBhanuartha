import { Link } from 'react-router-dom';
import { RestaurantList } from '../index.type';
import TagCategory from './TagCategory';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { SiGooglemaps } from 'react-icons/si';
import StatusOpen from './StatusOpen';

const CardRestaurant: React.FC<RestaurantList> = ({
	name,
	city,
	isOpen,
	price,
	dataDetail,
	id,
	rating,
	pictureId,
}) => {
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
		<figure className=''>
			<img
				className='h-44 w-full object-cover'
				src={`https://restaurant-api.dicoding.dev/images/small/${pictureId}`}
			/>
			<figcaption className='mt-3'>
				<h4 className='text-2xl font-semibold line-clamp-1'>{name}</h4>
				<div className='my-2'>{renderStar(Number(rating.toFixed(0)))}</div>
				<p className='font-semibold flex items-center'>
					<SiGooglemaps className='text-cyan-700' />
					{city}
				</p>
				<div className='flex items-center gap-x-2 mt-1'>
					{dataDetail.categories.map((el) => {
						return (
							<TagCategory
								key={el.name}
								category={el.name}
							/>
						);
					})}
				</div>
				<div className='flex flex-col  my-3  gap-1'>
					<p className='text-lg'>
						Rp. {price.lowest} - Rp. {price.highest}
					</p>
					<StatusOpen isOpen={isOpen} />
				</div>
				<Link
					className='bg-cyan-900 text-white w-full py-2 block text-center hover:bg-white hover:text-black border border-cyan-900 transition'
					to={`/detail/${id}`}
				>
					LEARN MORE
				</Link>
			</figcaption>
		</figure>
	);
};

export default CardRestaurant;
