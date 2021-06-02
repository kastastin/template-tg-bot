require('dotenv').config();

const TelegramApi = require('node-telegram-bot-api'),
    token = process.env.TOKEN,
    bot = new TelegramApi(token, {polling: true}),
    { gameOptions } = require('./options');

const chats = {};

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Initial greeting' },
        { command: '/info', description: 'Information about bot' },
        { command: '/game', description: 'Play game' }
    ]);
    
    bot.on('message', async msg => {
        const textMsg = msg.text,
            chatId = msg.chat.id,
            firstName = msg.from.first_name;
    
        switch(textMsg) {
            case '/start':
                await bot.sendSticker(chatId, 'https://numl.org/Icu');
                return bot.sendMessage(chatId, `Hello ${firstName}!\nWrite '/info' to get info about bot.`)  
                break;
          
            case '/info':
                return bot.sendMessage(chatId, `Write '/game' to play`)
                break;

            case '/game':
                const randomNumber = Math.floor(Math.random() * 10);
                chats[chatId] = randomNumber;
                return bot.sendMessage(chatId, 'Bot generated a random number from 0 to 10.\nTry to guess it!', gameOptions);

            default:
                return bot.sendMessage(chatId, `Unknown command.\nWrite '/info' to get info about bot.`);
        }
    });

    bot.on('callback_query', async msg => {
        const data = msg.data,
            chatId = msg.message.chat.id;

        await bot.sendMessage(chatId, `Generated number: ${chats[chatId]}\nYour choise: ${data}`);

        if (chats[chatId] < 5 && data == '<5') {
            return bot.sendMessage(chatId, `You win!`);
        } else if (chats[chatId] > 5 && data == '>5') {
            return bot.sendMessage(chatId, `You win!`);
        } else if (chats[chatId] == 5 && data == '5') {
            return bot.sendMessage(chatId, `You win!`);
        } else {
            return bot.sendMessage(chatId, `You lose!`);
        }
    });
};

start();