const { COOKIE_BASE, COOKIE_ADDONS } = require('../data/cookies-data');
const { handlebarsHelpers } = require('../utils/handlebars-helpers');

function getCookieSettings(req) {
	const { cookieBase: base } = req.cookies; // bierzemy sobie nasze ciastko z bazą i ciasko z dodatkami (configurator.js)
	const { cookieAddons } = req.cookies;

	const addons = cookieAddons ? JSON.parse(cookieAddons) : [];

	const allBases = Object.entries(COOKIE_BASE);
	const allAddons = Object.entries(COOKIE_ADDONS);

	const sum =
		(base ? handlebarsHelpers[`find-price`](Object.entries(COOKIE_BASE), base) : 0) + // jeżeli mamy base to cena base a jak nie to 0.
		addons.reduce((prev, curr) => {
			return prev + handlebarsHelpers['find-price'](Object.entries(COOKIE_ADDONS), curr);
		}, 0);

	return {
		//Selected stuff

		addons,
		base,

		//Caltulations
		sum,

		//All possibilities

		allBases,
		allAddons,
	};
}

module.exports = { getCookieSettings };
