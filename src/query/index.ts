/* eslint-disable @typescript-eslint/no-explicit-any */
import { RestaurantList } from '../index.type';
import { generatePriceRangeInIDR, getRandomBoolean } from '../utils';

export const getList = async (filter?: string) => {
	let response;

	if (filter) {
		response = await fetch(
			`https://restaurant-api.dicoding.dev/search?q=${filter}`
		);
	} else {
		response = await fetch(`https://restaurant-api.dicoding.dev/list`);
	}
	if (response.ok && response.status === 200) {
		const data = await response.json();
		const filteredDataPromises = data.restaurants.map(async (el) => {
			const dataDetail = await fetch(
				`https://restaurant-api.dicoding.dev/detail/${el.id}`
			);
			let dataDetailJson = null;

			if (dataDetail.ok && dataDetail.status === 200) {
				dataDetailJson = await dataDetail.json();
			}

			return {
				...el,
				isOpen: getRandomBoolean(),
				price: generatePriceRangeInIDR(),
				dataDetail: dataDetailJson
					? (dataDetailJson as unknown as any).restaurant
					: {},
			} as RestaurantList;
		});

		const filteredData = await Promise.all(filteredDataPromises);

		const categoriesDuplicate: string[] = [];
		filteredData.forEach((el) => {
			el.dataDetail.categories.forEach((item: { name: string }) => {
				categoriesDuplicate.push(item.name);
			});
		});

		return {
			data: filteredData,
			categories: [...new Set(categoriesDuplicate)],
		};
	}
	return null;
};

export const getDetail = async (id?: string) => {
	const response = await fetch(
		`https://restaurant-api.dicoding.dev/detail/${id}`
	);
	if (response.ok && response.status === 200) {
		return await response.json();
	}
	return null;
};
