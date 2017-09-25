// Sets environment variables using dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var express = require('express')
      http = require('http'),
      https = require('https'),
      fs = require('fs'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      axios = require('axios'),
      yelpSearch = require('./src/routes/yelpSearch'),
      fbSearch = require('./src/routes/fbSearch');



      const app = express();
      app.use(express.static('public'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(cors());
      app.use(yelpSearch);
      app.use(fbSearch);
      var port = process.env.PORT || 4000;

      // If production, sets certificates for https
      var cert = fs.readFileSync('/etc/ssl/certs/nginx-selfsigned.crt');
      var key = fs.readFileSync('/etc/ssl/private/nginx-selfsigned.key');
      var options = {
        key: key,
        cert: cert
      };
      https.createServer(options, app).listen(4330);
      // if (process.env.NODE_ENV === 'production') {
      //
      // } else {
      //   var server = app.listen(port, () => {
      //     console.log('Listening on port ' + port);
      //   });
      // }
