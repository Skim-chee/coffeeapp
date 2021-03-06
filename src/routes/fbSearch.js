var express = require('express'),
    graph = require('fbgraph'),
    axios = require('axios'),
    fs = require('fs'),
    request = require('request');

var router = express.Router();

router.post('/fbSearch', (req, res) => {
  // Sets the FB app access token in "id|key" form in place of an access token
  const token = process.env.FB_KEY + "|" + process.env.FB_SECRET;
  graph.setAccessToken(token);
  graph.setAppSecret(process.env.FB_SECRET);
  graph.setVersion('2.10');

  // Gets first part of name to prevent name mismatches between yelp and graphAPI
  let name = req.body.data.name.split(" ")[0];
  if (name.toLowerCase() == "cafe") {
    name = req.body.data.name.split(" ")[1];
  }
  let coords = req.body.data.coords;
  let imageURLS = [];

  var searchOptions = {
    q: name,
    type: 'place',
    center: coords,
    distance: 500
  }

  let idResult;
  graph.search(searchOptions, (err, r) => {
    if (r) {
      // Gets id of location based on searchOption using graphAPI
      idResult = r.data[0].id;
      // If id not found, return empty array and show error message
      if (!idResult) {
        return res.status(200).send(imageURLS);
      }
      const queryString = "https://www.instagram.com/explore/locations/" + idResult + "/?__a=1";

      // Loads URL and loads in JSON response to parse
      request(queryString, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let topPosts = JSON.parse(body).location.top_posts.nodes;
          //  Creates an array of the "top posts" of location
          for (p = 0; p < topPosts.length; p++) {
            imageURLS.push(topPosts[p].thumbnail_src);
          }
          // Returns with 200 status and array of image urls
          return res.status(200).send(imageURLS);
        } else {
          console.log(error);
          return res.status(400);
        }
      });
    } else {
      console.log(err);
      return res.status(400);
    }
  });
})

module.exports = router;
