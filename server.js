const express=require('express');
var request = require('request');

// Initialisation
const app=express();
const router = express.Router();

app.use(express.static(__dirname + '/src'));

app.set('views',__dirname);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.get('*', (req, res) => {
  res.render('./dist/index.html');
});

// Error handling
app.use(function (err, req, res, next) {
    // Return 500 for any uncaught errors
    console.log(err);
    res.status(500).send('Something broke!');
});

// cron.schedule('0 0 */1 * * *', function () {
//     console.log('running a task every 5 seconds');
//     recommendedlisting.calculateRecommendations();
// });

var url = "https://api.transport.nsw.gov.au/v1/tp/departure_mon?outputFormat=rapidJSON&coordOutputFormat=EPSG%3A4326&mode=direct&type_dm=stop&name_dm=200051&itdDate=20180408&itdTime=1710&departureMonitorMacro=true&TfNSWDM=true&version=10.2.1.42";
var token = 'apikey sXm3TGx8PqEc5lX6APrEM6ySbPjw0sSTYqHf';

request.get({url,
    headers : {
      "Authorization" : token
    }
  },
  function (error, response, body) {
    if (error) {
      return console.error('failed:', error);
    }
    console.log('Request success:', body);
  }
);

var server=app.listen((process.env.PORT || 3010),function(){
console.log("We have started our server on port " +(process.env.PORT || 3010));
});


module.exports = app;