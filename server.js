const path = require('path');
const express = require('express');

// Import express-session
// const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const seedDatabase = require('./seeds/seed');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// const sess = {
//   secret: process.env.USERPASS,
//   cookie: {
//     path: '/',
//     maxAge: 300000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: false,
//   store: new SequelizeStore({
//     db: sequelize
//   }),
// };

// app.use(session(sess));
const hbs = exphbs.create({
  defaultLayout: 'main',
  partialsDir: ['views'],
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  seedDatabase();
  app.listen(PORT, () => console.log(`Now listening  on ${PORT}`));
});
