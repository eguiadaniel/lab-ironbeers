const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static('public'));

// Add the route handlers here:

app.get('/:route', (request, response) => {
  const name = request.params.route;
  switch (name) {
    case 'home':
      response.render('index', { message: 'home' });
      break;
    case 'beers':
      response.render('index', { message: 'beers' });
      break;
    case 'random-beer':
      response.render('index', { message: 'random' });
      break;
    default:
      response.render('index', { message: `default ${name}` });
  }
});

/*
app.get('/', (req, res) => {
  res.render('index');
});
*/

app.listen(3000, () => console.log('🏃‍ on port 3000'));
