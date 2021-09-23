import express from 'express';
import path from 'path';
import * as http from 'http';
import { initWSServer } from './socket'
import apiRouter from '../routes/index';
import handlebars from 'express-handlebars';
import vistaRouter from '../routes/vista';

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
app.use('/api', apiRouter);
app.use('/productos', vistaRouter);

app.get('/', (req, res) => {
    const datos = []
    res.render('main', datos);
});

const myServer = http.createServer(app);
initWSServer(myServer);

export default myServer;
