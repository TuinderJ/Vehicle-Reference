const router = require('express').Router();
const { getVehicle } = require('../utils/vehicleHelpers');
const { getCategory } = require('../utils/categoryHelpers');
const axios = require('axios');
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    let jokeObj = undefined;
    try {
      const options = {
        method: 'GET',
        url: 'https://jokeapi-v2.p.rapidapi.com/joke/Programming',
        params: {
          format: 'json',
          idRange: '0-150',
          blacklistFlags: 'nsfw,racist,explicit,sexist',
          'safe-mode': 'safe-mode',
        },
        headers: {
          'X-RapidAPI-Key': process.env.JOKE_API,
          'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com',
        },
      };

      const joke = await axios.request(options);
      console.log(joke);
      jokeObj = {
        joke: joke.data.joke,
        setup: joke.data.setup,
        delivery: joke.data.delivery,
      };
    } catch (err) {
      jokeObj.joke = 'Sorry, no joke today.';
    }

    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    if (unitNumber || customerUnitNumber || vin || last8) {
      const data = await getVehicle({ unitNumber, customerUnitNumber, vin, last8 });

      if (typeof data === 'string') {
        res.render('homepage', {
          error: 'This vehicle was not found.',
          logged_in: req.session.logged_in,
          jokeObj,
        });
      } else {
        res.render('homepage', { data, logged_in: req.session.logged_in, jokeObj });
      }
    } else {
      res.render('homepage', { logged_in: req.session.logged_in, jokeObj });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.json({ err });
  }
});

router.get('/add', async (req, res) => {
  try {
    const { unitNumber, customerUnitNumber, vin, last8 } = req.query;
    const categories = await getCategory({ req });
    if (categories.loggedIn === false) res.redirect('/');
    if (unitNumber || customerUnitNumber || vin || last8) {
      res.render('add-vehicle', { edit: true, categories, logged_in: req.session.logged_in });
    } else {
      res.render('add-vehicle', { categories, logged_in: req.session.logged_in });
    }
  } catch (err) {}
});

module.exports = router;
