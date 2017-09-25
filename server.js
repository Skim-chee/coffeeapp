// Sets environment variables using dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var express = require('express'),
      http = require('http'),
      https = require('https'),
      forceSsl = require('express-force-ssl'),
      fs = require('fs'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      axios = require('axios'),
      yelpSearch = require('./src/routes/yelpSearch'),
      fbSearch = require('./src/routes/fbSearch');

      const app = express();
      app.use(forceSsl);
      app.use(express.static('public'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(cors());
      app.use(yelpSearch);
      app.use(fbSearch);
      var port = process.env.PORT || 4000;

      // If production, sets certificates for https
      if (process.env.NODE_ENV === 'production') {
        var key = fs.readFileSync('/etc/letsencrypt/live/thecitythatneversleeps.me/privkey.pem');
        var cert = fs.readFileSync( '/etc/letsencrypt/live/thecitythatneversleeps.me/fullchain.pem' );
        var ca = fs.readFileSync(
          '/etc/letsencrypt/live/thecitythatneversleeps.me/chain1.pem'
        )
        var options = {
          key: key,
          cert: cert,
          ca: ca
        };
        https.createServer(options, app).listen(4330);
      }
      http.createServer(app).listen(port, () => {
        console.log('Listening on port ' + port);
      });
