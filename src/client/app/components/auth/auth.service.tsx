declare var io;
class AuthService {
    constructor() {

    }

    login() {
        let socket = io();
        console.warn('Auth.service:login2');
        socket.emit('auth:login', 'kasia');
        socket.on('auth:login:response', function(msg){
            alert(msg);
            console.warn(msg);
        });
    }
}


export default new AuthService();