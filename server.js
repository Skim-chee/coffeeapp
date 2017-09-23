// Sets environment variables using dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      axios = require('axios'),
      yelp = require('yelp-fusion');

      const app = express();
      app.use(express.static('public'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(cors());
      var port = process.env.PORT || 4000;

      var client;

      const token = yelp.accessToken(process.env.YELP_KEY, process.env.YELP_SECRET).then(response =>{
          console.log(response.jsonBody.access_token);
          client = yelp.client(response.jsonBody.access_token);
        }).catch(e => {
          console.log(e);
        });

      function randomGenerator (numBus) {
        return Math.floor(Math.random() * numBus);
      }

      app.post('/yelpSearch', (req, res) => {
        let query = req.body.data.query;
        let coords = req.body.data.coords.split(',');
        // Splits the coordinates into latitude and longitude values
        let lat = coords[0], lon = coords[1];
        // Radius of search in meters
        let rad = 9000;
        // If stay, shows radius of 1 mile, otherwise 6 miles
        if (req.body.data.stay) {
          rad = 1500;
        } else {
          rad = 9000;
        }
        // Check to make sure query and coords got passed through
        if (query || coords === undefined) {
          client.search({
            term: query,
            latitude: lat ,
            longitude: lon ,
            radius: rad,
            categories: ("coffee"),
            limit: 50
          }).then(response => {
            const resJson = response.jsonBody
            // Variable to check when response value found
            let resVal;

            // Generates a random business number upto 50
            let count = resJson.businesses.length;
            let randBus = randomGenerator(count);

            console.log("business length: " + count);
            console.log(randBus);

            while (resVal === undefined) {
              // Only marks cafes with a 4 or higher rating
              if (resJson.businesses[randBus].rating >= 4) {
                console.log(resJson.businesses[randBus].name);
                console.log(resJson.businesses[randBus].rating);

                // Returns the selected business name
                res.status(200).json(resJson.businesses[randBus].name);
                resVal = resJson.businesses[randBus].name;
              } else {
                // Loops with another randomly generated business number
                randBus = randomGenerator(count);
              }
            }
          }).catch(e => {
            console.log(e);
          });
        }
      })


      var server = app.listen(port, () => {
        console.log('Listening on port ' + port);
      });
