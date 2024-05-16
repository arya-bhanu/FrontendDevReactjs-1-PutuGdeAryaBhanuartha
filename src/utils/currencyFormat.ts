export function formatRupiah(number: number) {
	const rupiah = Intl.NumberFormat('id-ID', {
		style: 'decimal',
		currency: 'IDR',
		minimumFractionDigits: 0,
	});

	return rupiah.format(number);
}
