import { IconType } from 'react-icons';

const TagMenu = ({ text, icon }: { text: string; icon: IconType }) => {
	const Icon = icon;
	return (
		<span className='py-2 px-5 flex items-center gap-x-1.5 text-center border-2 border-cyan-900 bg-white text-cyan-900 hover:bg-cyan-900 hover:text-white transition'>
			<Icon />
			{text}
		</span>
	);
};

export default TagMenu;
