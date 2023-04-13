const express = require('express');
const configuratorRouter = express.Router();
const { COOKIE_ADDONS, COOKIE_BASE } = require('../data/cookies-data');
const showErrorPage = require('../utils/errorPage.js'); // przy pojedynczych funkcjach w pliku nie używamy {} bo chuja zadziała !!!!

configuratorRouter

	.get('/select-base/:baseName', (req, res) => {
		//1. Utworzenie zmiennej baseName (req.params)
		//2. W odpowiedzi:
		// a) utworzeni ciastka z nazwą bazy (potrzebne w home.js)
		// b) wyrenderowanie nazwy bazy w widoku z  podziękowaniem za wybór bazy (w opcjach podajemy baseName do handlebarsów)

		const { baseName } = req.params; // Destrukturyzacja obiektu req. BaseName to jest nasze {{this[0]}} w index.hbs. Index.hbs bierze z COOKIE_BASES

		if (!COOKIE_BASE[baseName]) {
			// sprawdzamy czy dodatek isnieje
			return showErrorPage(res, `There is no such base as "${baseName}".`);
		}

		res.cookie('cookieBase', baseName).render('configurator/base-selected.hbs', {
			baseName, // podajemy baseName żeby widok hbs wiedział co podstawić pod zmienną. Plus res.cookie - przechowujemy dane o bazie w ciastku
		});
	})

	.get('/select-addon/:addonName', (req, res) => {
		// z addonsami jest ten problem, że jest to tablica, a nie tekst. Zatem dane z req musimy przekształcić na json

		//1. utworzenie zmiennej addonName (req.params)
		//2. Walidacja - sprawdzenie czy dany dodatek istnieje
		//2. odwołanie się do tablicy cookieAddons (req.cookies)
		//3. utworzenie zmiennej addons - sparsowana tablica cookieAddons (a jak brak tablicy cookieAddons w req.cookie - to pusta tablica [])
		//4. Wypuszowanie do tablicy addons dodatku addonName.

		const { addonName } = req.params;

		if (!COOKIE_ADDONS[addonName]) {
			// sprawdzamy czy dodatek isnieje
			return showErrorPage(res, `There is no such addon as "${addonName}".`);
		}

		const { cookieAddons } = req.cookies; //tablica w req cookies. Bierzemy to tutaj bo może są tam już jakieś dodatki i jest utworzona. Wtedy kolejny dodatek musimy tylko do niej dodać.

		const addons = cookieAddons ? JSON.parse(cookieAddons) : []; // UWAGA!! Jeśli sparsujemy '[]' pustą tablice - spoko, pokaże nam []. Jeśli sparsujemy null - spoko, pokaże nam null. Ale jeśli sparsujemy undefined - to wyskoczy nam error. A puste ciastko to ciastko undefined. Zatem na początku zanim dodamy dodatki wyskoczy nam error, bo nie ma takiego klucza w obiekcie cookies. Dlatego zamiast samo JSON.parse(cookieAddons), robimy operator warunkowy.

		if (addons.includes(addonName)) {
			// sprawdzamy czy w dodatkach nie ma dwa razy tego samego dodatku
			return res.render('error.hbs', {
				description: `${addonName} is already on your cookie. You cannot add it twice`,
			});
		}

		addons.push(addonName);

		res.cookie('cookieAddons', JSON.stringify(addons)).render('configurator/added.hbs', {
			addonName,
		});
	})

	.get('/delete-addon/:addonName', (req, res) => {
		//1. robimy metodą get choć tak napraw epowinno być delete

		const { addonName } = req.params;

		/* dwie poniższe linijki Kuba zapisał w funkcji:
		
		function getAddonsFromReq(req){
			const { cookieAddons } = req.cookies;
			return cookieAddons ? JSON.parse(cookieAddons) : [];
		}
		
		*/

		const { cookieAddons } = req.cookies;
		const oldAddons = cookieAddons ? JSON.parse(cookieAddons) : []; // najpirw parsujemy tablicę oldAddons

		if (!oldAddons.includes(addonName)) {
			//walidacja, sprawdzamy czy dany dodatke jest na liście dodanych dodatkó (żeby ktoś nie chciał usuwać czegoś czego nei ma)
			return showErrorPage(res, `Cannot delete something that is not already added to the cookie ${addonName}`);
		}

		const addons = oldAddons.filter((addon) => addon !== addonName); //Przefiltruj wszystkie te elementy które nie nazywają się tak jak ten który aktualnie chcemy usunąć (tzn poprostu usuń)

		res.cookie('cookieAddons', JSON.stringify(addons)).render('configurator/deleted.hbs', {
			addonName,
		});
	});

module.exports = configuratorRouter;
