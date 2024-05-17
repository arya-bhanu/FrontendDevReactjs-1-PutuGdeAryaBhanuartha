import { Outlet } from 'react-router-dom';

export default function AppLayout() {
	return (
		<html lang='en'>
			<body className='container py-6'>
				<main>
					<Outlet />
				</main>
			</body>
		</html>
	);
}
