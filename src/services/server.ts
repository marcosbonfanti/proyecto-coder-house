import express from 'express';
import path from 'path';
import * as http from 'http';
import { initWSServer } from './socket'
import apiRouter from '../routes/index';
import handlebars from 'express-handlebars';
import vistaRouter from '../routes/vista';
import session from 'express-session';


const myUser = 'pepe';
const myPassword = 'password';


const app = express();

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

/** HBS SETTINGS */

const layoutFolderPath = path.resolve(__dirname, '../../views/layouts');
const defaultLayerPath = path.resolve(__dirname, '../../views/layouts/index.hbs');
const partialFolderPath = path.resolve(__dirname, '../../views/partial');
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPath,
    extname: 'hbs',
  })
);

app.use(express.json());
app.use(
  session({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    cookie: { maxAge: 10*1000 },
    saveUninitialized: true,
    resave: false,
  })
);
app.use('/api', apiRouter);
app.use('/productos', vistaRouter);

app.get('/', (req, res) => {
    let loggedIn = false;
    let usernameSession
    if(req.session['loggedIn']){
      loggedIn = true
      usernameSession = req.session['username']
    }
    const datos = {
      loggedIn: loggedIn,
      username: usernameSession
    };
    res.render('main', datos);
});

app.get('/login', (req, res) => {
  const { username, password } = req.query;

  if (username == myUser && password == myPassword) {
    req.session['loggedIn'] = true;
    req.session['username'] = username;
    res.redirect('/')
  } else res.status(401).json({ msg: 'no estas autorizado' });
});

app.get('/logout', (req, res) => {
  console.log("Estoy en logout")
  req.session.destroy((data) => {
    res.redirect('/');
  });
  
});

const myServer = http.createServer(app);
initWSServer(myServer);

export default myServer;
