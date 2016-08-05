declare var io;
let socket = io();
import * as Q from 'q';

class AuthService {

    constructor() {
    }

    login(credentials) {
        let defer = Q.defer();
        console.warn('Auth.service:login');
        console.info(credentials);
        // console.info(io);
        // console.info(socket);
        socket.emit('auth:login', credentials);
        socket.once('auth:login:response', function(data){
            console.warn(data);
            if (data.status) {
                defer.resolve(data);
            }else {
                defer.reject(data);
            }
        });
        return defer.promise;
    }

    loginAdvanced(credentials) {
        let defer = Q.defer();
        socket.emit('auth:login:advanced', credentials);
        socket.once('auth:login:advanced:response', (data) => {
            if (data.status) {
                defer.resolve(data);
            }else {
                defer.reject(data);
            }
        });
        return defer.promise;
    }
}


export default new AuthService();