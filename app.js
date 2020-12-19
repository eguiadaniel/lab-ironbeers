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

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static('/public'));

// Add the route handlers here:

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi[0]);
      response.render('beers', {
        beersFromApi,
        pageTitle: beersFromApi.name
      });
    })

    .catch(error => console.log(error));
});

app.get('/random-beer', (request, response) => {
  punkAPI
    .getRandom()
    .then(randomBeerFromApi => {
      console.log('Random Beer from the database: ', randomBeerFromApi);
      response.render('random-beer', {
        randomBeer: randomBeerFromApi[0],
      });
    })

    .catch(error => console.log(error));
});

app.get('/:route', (request, response) => {
  const name = request.params.route;
  switch (name) {
    case 'home':
      response.render('index', { message: 'home' });
      break;
    case '/':
      response.render('index', { message: '/' });
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
