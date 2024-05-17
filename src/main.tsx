import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Detail from './Detail.tsx';
import AppLayout from './layouts/AppLayout.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				index: true,
				element: <App />,
			},
			{
				path: 'detail/:id',
				element: <Detail />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
