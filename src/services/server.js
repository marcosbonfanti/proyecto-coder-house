import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import mainRouter from '../routes/index';
import * as http from 'http';
import { socketService } from './socket';


const app = express();

const myHTTPServer = new http.Server(app);

socketService.initWsService(myHTTPServer);


/** DISPONIBILIZAR CARPETA PUBLIC */

const publicFolder = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolder));

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
app.use('/api', mainRouter);

app.get('/', (req, res) => {
  const datos = []
  res.render('main', datos);
});

export default myHTTPServer;