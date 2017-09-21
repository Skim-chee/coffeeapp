// Sets environment variables using dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');

      const app = express();
      app.use(express.static('public'));
      app.use(bodyParser.json());
      app.use(cors());
      var port = process.env.PORT || 4000;

      var server = app.listen(port, () => {
        console.log('Listening on port ' + port);
      });
