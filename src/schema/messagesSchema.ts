import mongoose,{ Schema, model, connect } from 'mongoose';

const msgCollectionName = 'message';

//Creamos una interface representando a nuestro productos en MongoDB
interface messagesColletion {
    author: object,
    text: string
};

//Creamos un Schema correspondiente a la interface de productos
const messageSchema = new mongoose.Schema({
    author: {
      email: { type: String, required: true, max: 50 },
      nombre: { type: String, required: true, max: 50 },
      apellido: { type: String, required: true, max: 50 },
      alias: { type: String, required: true, max: 50 },
      edad: { type: Number, required: true },
      avatar: { type: String, required: true, max: 50 },
    },
    text: { type: String, required: true, max: 1000 },
  });


export const messagesSchema = mongoose.model<messagesColletion>(msgCollectionName, messageSchema);