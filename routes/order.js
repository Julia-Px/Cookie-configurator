const express = require('express');
const orderRouter = express.Router();
const { COOKIE_BASE, COOKIE_ADDONS } = require('../data/cookies-data');
const { handlebarsHelpers } = require('../utils/handlebars-helpers');
const { getCookieSettings } = require('../utils/get-cookie-settings');

orderRouter
	.get('/summary', (req, res) => {
		const { sum, addons, base, allBases, allAddons } = getCookieSettings(req);

		res.render('order/summary.hbs', {
			cookie: {
				base,
				addons,
			},
			allBases,
			allAddons,

			sum,
		});
	})

	.get('/thanks', (req, res) => {
		const { sum } = getCookieSettings(req); //Robimy tutaj funkcję getCookieSettings, która jest w osobnym module. Ona z requestu sobie wszystko pobierze, bo z req bierze ciasteczka które korzystają z naszej "bazy danych"

		res.clearCookie('cookieBase').clearCookie('cookieAddons').render('order/thanks.hbs', { sum });
	});

module.exports = orderRouter;
