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

function yelpS (query, lat, lon, rad, res, offset, times) {
  client.search({
    term: query,
    latitude: lat ,
    longitude: lon ,
    radius: rad,
    categories: ("coffee"),
    offset: offset,
    limit: 50
  }).then(response => {
    const resJson = response.jsonBody;
    const filteredJson = resJson.businesses.filter(({rating}) => rating >= 4);
    // console.log(filteredJson);
    let count = filteredJson.length;

    if (count > 0) {
      for (let f = 0; f < count; f++) {
        let filter = filteredJson[f];
        console.log("Found: " + filter.name + " with rating of: " + filter.rating);
      }
      let randBus = randomGenerator(count);
      return res.status(200).json(filteredJson[randBus]);
    }

    if (count == 0 && times < 7) {
      console.log("expanding search radius to: " + rad);
      rad *= 2;
      times += 1;

      yelpS(query, lat, lon, rad, res, offset, times);
    } else if (count == 0 && times == 7) {
      return res.status(200).json({name: "Could not find :("});
    }

  }).catch(e => {
    console.log(e);
    return res.status(400).json({name: "Could not find :("});
  });
}

router.post('/yelpSearch', (req, res) => {
  let query = req.body.data.query;
  let coords = req.body.data.coords.split(',');
  // Splits the coordinates into latitude and longitude values
  let lat = coords[0], lon = coords[1];
  // Radius of search in meters
  let rad = 9000;
  let times = 0;
  let stay = req.body.data.stay;
  let offset = 0;
  console.log("Your query is: " + query + " , coords are: " + coords + " , and stay is: " + stay );
  // If stay, shows radius of 100m, otherwise 6 miles
  if (stay) {
    let randRad = randomGenerator(3);
    rad = 250 + (100*randRad);
  } else {
    rad = 9000;
    offset = 500;
  }
  console.log("Search radius is: " + rad + ", offset is: " + offset);
  // Check to make sure query and coords got passed through
  if (query || coords === undefined) {
    yelpS(query, lat, lon, rad, res, offset, times);
  }
})

module.exports = router;
