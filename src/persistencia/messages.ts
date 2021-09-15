import * as model from '../schema/messagesSchema';
import moment from 'moment';

class Messages {
    async getMessages() {
        try {
            const messages = await model.messagesSchema.find();
            return messages;
        }
        catch (e) {
            console.log("Error: ", e);
        }
    }

    async saveMessages(data: any) {
        const now = new Date();
        const newMessage = [{
            email: data.email,
            date: moment(now).format('DD/MM/YYYY HH:MM:SS'),
            text: data.text            
        }];
        await model.messagesSchema.insertMany(newMessage);
        return newMessage;

    }
}

export const messagesPersistencia = new Messages()
