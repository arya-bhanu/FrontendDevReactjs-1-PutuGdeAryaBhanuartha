export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className='container pt-6'>{children}</body>
		</html>
	);
}