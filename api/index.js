const express = require('express');
const redis = require('redis');
const uuid = require('uuid').v4;
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

const redisClient = redis.createClient({    
  url: 'redis://redisstore:6379'
});

// app.get('/', async function(req, res) {
//     try {
//         var numVisits = await redisClient.get('numVisits');
//         numVisitsToDisplay = parseInt(numVisits) + 1;
//         if (isNaN(numVisitsToDisplay)) {
//             numVisitsToDisplay = 1;
//         }
//         numVisits++;
//         await redisClient.set('numVisits', numVisits);
//         res.send('Number of visits is: ' + numVisitsToDisplay);        
//     } catch (error) {
//         console.log(error);
//         res.send('error');
//     }
// });


app.post('/register', async (req,res) => {
    const identifier = uuid();
    await redisClient.set(`user.${identifier}`, 1, {
        EX: 60 
    });
    res.json({
        id: identifier
    });
});

app.post('/heartbeat', async (req,res) => {
    const identifier = req.body.id;
    await redisClient.set(`user.${identifier}`, 1, {
        EX: 60 
    });
    res.json({
        id: identifier,
    });
})

app.get('/users', async (req,res) => {
    const users = await redisClient.keys('user.*');
    res.json({
        users
    });
});


app.get('/', (req, res) => {
    res.render('index.html', {
        user: {
            name: 'Dhar'
        }
    });
})


app.listen(3000, async function() {
    try {
        await redisClient.connect();
        console.log('Web application is listening on port 3000');        
    } catch (error) {
        console.log(error);
    }
});
