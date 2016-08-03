declare var io;
let socket = io();
import * as Q from 'q';

class AuthService {

    constructor() {
    }

    login(credentials) {
        let defer = Q.defer();
        console.warn('Auth.service:login');
        // console.info(io);
        // console.info(socket);
        socket.emit('auth:login', credentials);
        socket.once('auth:login:response', function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }
}


export default new AuthService();