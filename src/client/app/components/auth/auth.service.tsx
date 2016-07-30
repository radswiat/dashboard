declare var io;
class AuthService {
    constructor() {

    }

    login() {
        let socket = io();
        console.log(socket);
        socket.emit('login', 'kasia');
        socket.on('loginResponse', function(msg){
            alert(msg);
        });
    }
}


export default new AuthService();