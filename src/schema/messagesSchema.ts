import mongoose,{ Schema, model, connect } from 'mongoose';

//Creamos una interface representando a nuestro productos en MongoDB
interface messagesColletion {
    email: string,
    date: string,
    text: string
};

//Creamos un Schema correspondiente a la interface de productos
const messageSchema = new Schema<messagesColletion>({
    email: {type: String, required: true},
    date: {type: String, required: true},
    text: {type: String, required: true}
});


export const messagesSchema = mongoose.model<messagesColletion>('messagesCollection', messageSchema);