export type RestaurantList = {
	city: string;
	description: string;
	id: string;
	isOpen: boolean;
	name: string;
	pictureId: string;
	rating: number;
	price: {
		lowest: number;
		highest: number;
	};
	dataDetail: RestaurantDetail;
};

export type RestaurantDetail = {
	address: string;
	categories: NameItem[];
	city: string;
	customerReviews: {
		date: string;
		name: string;
		review: string;
	}[];
	description: string;
	id: string;
	menus: {
		drinks: NameItem[];
		foods: NameItem[];
	};
	name: string;
	pictureId: string;
	rating: number;
};

export type NameItem = {
	name: string;
};
