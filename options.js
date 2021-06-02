module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [ {text: '<5', callback_data: '<5'}, {text: '5', callback_data: '5'}, {text: '>5', callback_data: '>5'} ]
            ]
        })
    }
};