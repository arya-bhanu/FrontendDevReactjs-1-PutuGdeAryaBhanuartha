export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className='container py-6'>{children}</body>
		</html>
	);
}
