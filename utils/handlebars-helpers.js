const handlebarsHelpers = {
	/* Funkcja która szuka nam ceny wybranego spodu/dodatków - zależy co podamy w parametrach */
	'find-price': (entries, selectedItem) => {
		const found = entries.find((el) => el[0] === selectedItem);
		if (!found) {
			throw new Error(`Cannot find price of "${selectedItem}".`);
		}
		const [, price] = found; //destrukturyzacja tablicy
		return price;
	},

	pricify: (price) => price.toFixed(2), // robimy żeby cena miała dwa miejsc apo przecinku

	//	isNotInArray: (array, element) => !array.includes(element), //sprawdzamy czy elementu nie ma w tablicy

	isInArray: (array, element) => array.includes(element), //sprawdzamy czy elementu nie ma w tablicy

	not: (arg) => !arg, // zaprzeczam dany argument
};

module.exports = { handlebarsHelpers };
