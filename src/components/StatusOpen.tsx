const StatusOpen = ({ isOpen }: { isOpen: boolean }) => {
	return (
		<span className='flex items-center gap-x-2'>
			<div
				className={`w-3 h-3 rounded-full ${
					isOpen ? 'bg-green-600' : 'bg-red-600'
				}`}
			></div>
			<span className='tracking-widest text-base'>
				{isOpen ? 'NOW OPEN' : 'CLOSE'}
			</span>
		</span>
	);
};

export default StatusOpen;
