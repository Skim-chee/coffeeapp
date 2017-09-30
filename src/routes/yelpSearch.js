var express = require('express'),
       yelp = require('yelp-fusion');
var router = express.Router();



var client;

const token = yelp.accessToken(process.env.YELP_KEY, process.env.YELP_SECRET).then(response =>{
    client = yelp.client(response.jsonBody.access_token);
  }).catch(e => {
    console.log(e);
  });

function randomGenerator (numBus) {
  return Math.floor(Math.random() * numBus);
}

function yelpSearch(query, lat, lon, rad) {

}

router.post('/yelpSearch', (req, res) => {
  let query = req.body.data.query;
  let coords = req.body.data.coords.split(',');
  // Splits the coordinates into latitude and longitude values
  let lat = coords[0], lon = coords[1];
  // Radius of search in meters
  let rad = 9000;
  // If stay, shows radius of 1 mile, otherwise 6 miles
  if (req.body.data.stay) {
    rad = 500;
  } else {
    rad = 9000;
  }
  console.log("HI");
  //TODO: Increase search radius if nothing found
  //TODO: Probably put search in own function, put into a while loop
  //TODO: Return 404 on errors, alert on page of error
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

      while (resVal === undefined) {
        let randBusiness = resJson.businesses[randBus]
        // Only marks cafes with a 4 or higher rating
        if (randBusiness.rating >= 4) {
          // Returns the selected business name
          return res.status(200).json(resJson.businesses[randBus]);
          resVal = resJson.businesses[randBus].name;
        } else {
          // Loops with another randomly generated business number
          randBus = randomGenerator(count);
        }
      }
    }).catch(e => {
      return res.status(404).json({data: "Failed to find :("});
      console.log(e);
    });
  }
})

module.exports = router;
