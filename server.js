const express=require('express');

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

var server=app.listen((process.env.PORT || 3010),function(){
console.log("We have started our server on port " +(process.env.PORT || 3010));
});


module.exports = app;