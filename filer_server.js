const dotenv = require('dotenv')
const express = require('express')
const search_router = require('./routes/search_clips')
const dbConnect = require('./db/mongo_connect.js')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const session = require('express-session')
const http = require('http')
const passport = require('passport')
const path = require('path')
const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken')

// const helmet = require('helmet')
// const hpp = require('hpp')
// const csurf = require('csurf')
// const cookie_session = require('cookie-session')


//Load config
dotenv.config({path: './config/config.env'})

require('./config/passport')(passport)

dbConnect()
const app = express();
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

const PORT = process.env.PORT || 8500


// handlebars
// //Serves static files (we need it to import a css file)
// app.use(express.static('public'))
// //Sets a basic route


//loogging
if (process.env.NODE_ENV === "development") {
      app.use(morgan('dev'))
}



app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// static folder
app.use(express.static(path.join(__dirname, 'public')))


app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())


// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
//app.get('/', (req, res) => res.send('Hello World !'));
// app.use(
//       session({
//             name: 'session',
//             secret: 'someSecretKeyLikeStickyNotes',
//             expires: new Date(Date.now() + 1000*60*60)
//       })
// )


app.listen(
      PORT, 
      console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
)
