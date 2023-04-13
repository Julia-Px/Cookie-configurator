const showErrorPage = (res, description) => {
	res.render('error.hbs', { description });
};

module.exports = showErrorPage;
