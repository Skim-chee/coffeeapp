// Sets environment variables using dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      axios = require('axios'),
      yelp = require('yelp-fusion');

      const app = express();
      app.use(express.static('public'));
      app.use(bodyParser.json());
      app.use(cors());
      var port = process.env.PORT || 4000;

      var client;

      const token = yelp.accessToken(process.env.YELP_KEY, process.env.YELP_SECRET).then(response =>{
          console.log(response.jsonBody.access_token);
          client = yelp.client(response.jsonBody.access_token);
        }).catch(e => {
          console.log(e);
        });

      app.get('/yelpSearch', (req, res) => {
        client.search({
          term:'Coffee',
          location: 'manhattan, ny'
        }).then(response => {
          const resJson = response.jsonBody
          let count = 0;
          let resVal;

          while (resVal === undefined) {
            if (resJson.businesses[count].rating >= 4) {
              console.log(resJson.businesses[0].name);
              res.send(resJson.businesses[0].name);
              resVal = resJson.businesses[0].name;
              console.log(resJson.businesses[count].rating);
            } else {
              count++;
            }
          }
        }).catch(e => {
          console.log(e);
        });
      })


      var server = app.listen(port, () => {
        console.log('Listening on port ' + port);
      });
