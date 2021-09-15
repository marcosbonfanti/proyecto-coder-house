import Server from './services/server';
import {connect} from './services/mongodb';
import { mySQLDB } from './services/db';


const puerto = process.env.PORT || 8080;

connect()

mySQLDB.schema.hasTable('productos').then((exists) => {
	if (!exists) {
		console.log('NO EXISTE LA TABLA productos. VAMOS A CREARLA');
		mySQLDB.schema
			.createTable('productos', (productosTable) => {
				productosTable.increments('id');
				productosTable.string('nombre').notNullable();
				productosTable.integer('precio').notNullable();
			})
			.then(() => {
				console.log('DONE');
			});
	}
});	

Server.listen(puerto, () => console.log(`Server up puerto ${puerto}`));
