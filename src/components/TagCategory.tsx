const TagCategory = ({ category }: { category: string }) => {
	return (
		<span className='text-white bg-cyan-700 text-sm px-2 py-1 rounded-md'>
			{category}
		</span>
	);
};

export default TagCategory;
