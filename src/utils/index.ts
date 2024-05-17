import { maxPrice, minPrice } from '../query/filter';
export const getRandomBoolean = () => {
	return Math.random() < 0.5;
};

export function generatePriceRangeInIDR(): { lowest: number; highest: number } {
	const range = maxPrice - minPrice;

	let lowest = Math.floor(Math.random() * range) + minPrice;
	let highest = Math.floor(Math.random() * range) + minPrice;

	if (lowest > highest) {
		// swap values to ensure lowest is always less than or equal to highest
		const temp = lowest;
		lowest = highest;
		highest = temp;
	}

	return { lowest, highest };
}
