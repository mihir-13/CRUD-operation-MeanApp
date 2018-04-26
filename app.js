const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const passport = require('passport');



// Express-Session Middleware
app.use(session({
    secret: 'firstTrySession',
    resave: true,
    saveUninitialized: true
}));

// PASSPORT Middleware
app.use(passport.initialize());
app.use(passport.session());


// Handlebars MiddleWare
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method-Override Middleware
app.use(methodOverride('_method'));



// Connect Flash Middleware
app.use(flash());
// Global variables for Connect Flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// DB Config
const db = require('./config/database');
//Connect to Mongoose
mongoose.connect(db.mongoURI, {
    // useMongoClient: true (Not mandatory in mongoose v5)

}).then(() => console.log('MongoDB connected!')).catch(err => console.log('Error', err));


// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/ideas', ideas);
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

// About Route
app.get('/about', (req, res) => {
    res.render('about');
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});