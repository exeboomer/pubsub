class Bus {
    constructor () {
        // Ключ - имя комнаты, значение - массив подписчиков
        this.rooms = {}
    }
    /**
     * @param {String} room - Имя комнаты
     * @param {Object} message - Сообщение
     * @return {undefined}
     */
    publish (room, message) {
        if(room in this.rooms){
            this.rooms[room].forEach(function(subscriber) {
                subscriber(message);
            })
        }
    }

    /**
     * @param {String} room - Имя комнаты
     * @param {Function} handler - Обработчик сообщения
     * @return {undefined}
     */
    subscribe (room, handler) {
        if(!Array.isArray(this.rooms[room])){
            this.rooms[room] = [];
        }
        if(room in this.rooms){
            this.rooms[room].push(handler);
        }
    }

}

// Не редактируйте всё, что ниже

const bus = new Bus();

bus.subscribe('chat', message => console.log(`[${message.sender}]: ${message.text}`))

bus.subscribe('chat', message => {
    if (message.sender !== 'Echo') {
        bus.publish('chat', { sender: 'Echo', text: message.text })
    }
})

bus.publish('chat', { sender: 'Oz', text: 'Hello' })