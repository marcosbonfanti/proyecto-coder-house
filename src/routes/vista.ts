import { Router } from 'express';
import { productosSQL } from '../persistencia/productos';
import faker from 'faker';


const router = Router();

router.get('/vista', (request, response) => {
	productosSQL.getAll().then((data) => {
		const datosDinamicos = { 
			productos: data
		}
		console.log(datosDinamicos);
		response.render('main', datosDinamicos);
	})
}); 

router.get('/vista-test', (request, response) => {
	const datosFaker = []
	let { cantDatos } = request.query

	if(!cantDatos){
		cantDatos = "10"
	}

	for(let i =0; i<Number(cantDatos); i++){
		datosFaker.push({
				nombre: faker.commerce.productName(),
				precio: faker.commerce.price(),
				thumbnail: faker.image.imageUrl()
		})
	}

	const datosDinamicos = {
		productos: datosFaker
	}
	response.render('main', datosDinamicos);

});   

export default router;
