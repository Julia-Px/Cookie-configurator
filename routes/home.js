const express = require('express');
const homeRouter = express.Router();
const { getCookieSettings } = require('../utils/get-cookie-settings');
//const { COOKIE_BASE, COOKIE_ADDONS } = require('../data/cookies-data');
//const { handlebarsHelpers } = require('../utils/handlebars-helpers');

homeRouter.get('/', (req, res) => {
	//1. Wyciągnięcie nazwy bazy (cookieBase) z ciastka (req.cookie) --> cookieBase (ciastko z nazwą bazy) utworzone w configurator.js
	//2. Utworzenie zmiennej sum - suma ceny bazy (find-price) + suma cen waszystkich dodatków (metoda reduce)
	//3. Odpowiedź res: wyrenderowanie widoku strony głównej (w opcjach podajemy obiekty z których mamy korzystać w handlebarsach)

	/* 	const { cookieBase, cookieAddons } = req.cookies; // bierzemy sobie nasze ciastko z bazą i ciasko z dodatkami (configurator.js)

	const addons = cookieAddons ? JSON.parse(cookieAddons) : [];

	const sum =
		(cookieBase ? handlebarsHelpers[`find-price`](Object.entries(COOKIE_BASE), cookieBase) : 0) + // jeżeli mamy cookieBase to zena cookieBase a jak nie to 0.
		addons.reduce((prev, curr) => {
			return prev + handlebarsHelpers['find-price'](Object.entries(COOKIE_ADDONS), curr);
		}, 0);
	// handlebarsHelpers[`find-price`] --> poprostu wywołujemy funkcję z pliku handlebarsHelpers tylko nawias kwadratowy bo myślnik

	res.render('home/index.hbs', {
		cookie: {
			//tworzymy obiekt w którym przechowujemy informacje o aktualnym ciastku - będzie to potrzebne do cookie-preview żeby wyswietlać dynamicznie
			base: cookieBase,
			addons: addons,
		},
		bases: Object.entries(COOKIE_BASE),
		addons: Object.entries(COOKIE_ADDONS),
		// object.entries - zamienia obiekt w tablice tablic
		sum,
	}); */

	// po utworzeniu pliku get-cookie-summary.js:

	const { sum, addons, base, allBases, allAddons } = getCookieSettings(req);

	res.render('home/index.hbs', {
		cookie: {
			base,
			addons,
		},
		allBases,
		allAddons,

		sum,
	});
});

module.exports = homeRouter;
