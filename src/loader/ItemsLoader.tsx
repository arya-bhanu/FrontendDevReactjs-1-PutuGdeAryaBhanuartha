import CardLoader from './components/CardLoader';

const ItemsLoader = () => {
	return (
		<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
			{Array.from({ length: 8 }, () => {
				return <CardLoader />;
			})}
		</div>
	);
};

export default ItemsLoader;
