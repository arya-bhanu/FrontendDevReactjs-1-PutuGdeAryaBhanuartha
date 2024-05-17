import { GoPersonFill } from 'react-icons/go';
const Comment = ({
	name,
	comment,
	date,
}: {
	name: string;
	comment: string;
	date: string;
}) => {
	return (
		<div className='py-3 border-b border-y-gray-300/75'>
			<span className='flex items-center gap-x-2'>
				<span className='w-8 h-8 flex items-center justify-center border-2 rounded-full border-gray-600/40'>
					<GoPersonFill />
				</span>
				<span className='font-semibold text-xl'>{name}</span>
			</span>
			<p className='text-base text-gray-500'>"{comment}"</p>
			<span className='text-gray-500 font-semibold underline mt-3 block'>{date}</span>
		</div>
	);
};

export default Comment;
