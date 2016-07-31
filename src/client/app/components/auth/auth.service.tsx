declare var io;
class AuthService {
    constructor() {

    }

    login(credentials) {
        let socket = io();
        console.log(credentials);
        socket.emit('credentials', credentials);
        socket.on('loginResponse', function(msg){
            alert(msg);
            console.warn(msg);
        });
    }
}


export default new AuthService();