const express=require('express');
const path=require('path');
const bodyParser = require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const morgan=require('morgan');
const session =require('express-session');
mongoose.connect('mongodb://localhost:27017/finalProject',function(err)
{
    if(err)
    {
        console.log('not connected')
    }
    else{
        console.log('success on db connection');
    }
});

const app=express();
const users=require('../SeProject/app/routes/userRoutes');
const activityroutes = require('./app/routes/activityRoutes');
const port=8080;


//app.use('./users',users);

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(session({
    secret:'super secret',
   
    cookie:{maxAge:60000}
}));
require('./config/passport')(passport);


app.use('/activities', activityroutes);
app.use('/users', users);

app.get('/', function(req, res) {
    res.sendFile('/home/yehia/Desktop/SeProject/public/views/home.html'); // load our public/index.html file
});

app.listen(port,function()
{
    console.log('Running on port '+port);
});
//27017q