const express = require('express');
const dateFormat = require('dateformat');
var request = require('request');


// Initialisation
const app=express();
const router = express.Router();

app.use(express.static(__dirname + '/src'));

app.set('views',__dirname);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.get('/fetchBusData', (req, res) => {

  generateDepartureUrl(function(url){

      console.log("url is "+url)
      var token = 'apikey sXm3TGx8PqEc5lX6APrEM6ySbPjw0sSTYqHf';
      
      request.get({url,
        headers : {
          "Authorization" : token
        }
      },
      function (error, response, body) {

        if (error) {
          console.error('failed:', error);
          return res.status(409).send(error)
        }

        var parsedBody = JSON.parse(body);
        var stopEvents = parsedBody.stopEvents;
        var m30List = [];
        var itemsProcessed = 0;

        stopEvents.forEach(function(value){
          if(value.transportation.disassembledName == "M30"){
            m30List.push(value);
          }

          itemsProcessed++;
          if(itemsProcessed === stopEvents.length) {
            return res.status(409).send(m30List)
          }
        });

      }
    );
  })

});

function generateDepartureUrl(callback) {
  
  var url = "https://api.transport.nsw.gov.au/v1/tp/departure_mon?outputFormat=rapidJSON&coordOutputFormat=EPSG%3A4326&mode=direct&type_dm=stop&name_dm=200051&departureMonitorMacro=true&TfNSWDM=true&version=10.2.1.42";

  // var now = new Date();
  // var date = dateFormat(now, "yyyymmdd");
  // var time = dateFormat(now, "HHMM");
  // console.log(time)
  // // var time = "0530";

  // var fullUrl = url+"itdDate="+date+"&"+"itdTime="+time+"&departureMonitorMacro=true&TfNSWDM=true&version=10.2.1.42";

  callback(url);
}

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

var server=app.listen((process.env.PORT || 3010),function(){
console.log("We have started our server on port " +(process.env.PORT || 3010));
});


module.exports = app;