import path from 'path';
import fs from 'fs';
import moment from 'moment';
const publicPathFolder = path.resolve(__dirname, './../../public/');
const publicPathFileName = path.resolve(__dirname, './../../public/messages.txt');

let messages = [];
fs.writeFileSync(publicPathFileName, JSON.stringify(messages, null, '\t'), 'utf-8');


class Messages {
  getMessages() {
    const data = fs.readFileSync(publicPathFileName, 'utf-8');
    return JSON.parse(data);

  }
  
  saveMessages(data) {
    const now = new Date();
    const newMessage = [{
        email: data.email,
        date: moment(now).format('DD/MM/YYYY HH:MM:SS'),
        text: data.text            
    }];
    console.log(messages);
    messages.push(newMessage[0]);
    console.log("pase el push"); 
    console.log(messages)
    fs.writeFileSync(publicPathFileName, JSON.stringify(messages, null, '\t'), 'utf-8');
    return newMessage;
  }
}

export const messagesService = new Messages()