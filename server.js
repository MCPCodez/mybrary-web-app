// Check if we are in dev environment 
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts =  require('express-ejs-layouts');
// Import routes below
const indexRouter = require('./routes/index');
// Setup View engine
app.set('view engine','ejs');
// Set where views will be coming from 
app.set('views', __dirname + '/views');
// hookup express layouts
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
// hooks up all your other static files like stylesheets and more in the public folder.
app.use(express.static('public'));
// Import mongoose 
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', ()=> console.log('Connected on Mongoose'));
//Tells app to use the router
app.use('/', indexRouter);
//Tells the app to listen on the port given or port 3000
app.listen(process.env.PORT || 3000);
