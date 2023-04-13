const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const hbs = require('express-handlebars');
const { handlebarsHelpers } = require('./utils/handlebars-helpers');

const homeRouter = require('./routes/home');
const configuratorRouter = require('./routes/configurator');
const orderRouter = require('./routes/order');

const app = express();

// dalej to wszystko to są middlewery

app.use(express.json()); // w tym zadaniu nie jest to nam potrzebne bo nie używamy jsona i generlanie to służy do przetwarzania nagłówków aplication/json
app.use(cookieParser()); // middlewere do odczytu ciasteczek
app.use(express.static(path.join(__dirname, 'public'))); // łączy ścieżke do folderu public
app.engine('.hbs', hbs.engine({ extname: '.hbs', helpers: handlebarsHelpers }));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/', homeRouter);
app.use('/configurator', configuratorRouter);
app.use('/order', orderRouter);

app.listen(3000, 'localhost');
