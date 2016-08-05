/// <reference path="../../../typings/index.d.ts" />
import db from '../db';
import * as _ from 'lodash';
import * as chalk from 'chalk';

export default class ClientAuth {

    private sockets;
    private secondPassword;
    private secondPasswordRequest;

    static getSecondPasswordFieldsQuery() {

    }

    constructor(sockets) {
        this.db = db.instance();
        this.sockets = sockets;
        this.sockets.on('auth:login', this.onAuthLogin.bind(this));
        this.sockets.on('auth:login:advanced', this.onAuthLoginAdvanced.bind(this));
    }

    onAuthLogin(credentials) {

        let ifUserExists = (data) => {
            if (data && data.length) return true;
            return false;
        }

        let ifPasswordMatch = (data) => {
            if (data.password === credentials.password) return true;
            return false;
        }

        this.db.query((db, promise) => {

            db.collection('users').find({
                username: credentials.username
            }).toArray((err, data) => {
                if (ifUserExists(data)) {
                    if (ifPasswordMatch(data[0])) {
                        promise.resolve();
                        // store second password for later auth
                        this.secondPassword = data[0].password2;
                        this.emitAuthLogin(true);
                        return;
                    }
                }
                promise.resolve();
                this.emitAuthLogin(false);
                return;
            });

        });
    }

    emitAuthLogin(loginSuccess) {

        if (!loginSuccess) {
            this.sockets.emit('auth:login:response', {
                status : false,
                message : 'Wrong username or password, please try again later'
            });
            return;
        }

        let generateFields = () => {
            let chooseRequiredCharsPosition = (maxChars, passLength, chars) => {
                let pos = Math.floor(Math.random() * (passLength - 0 + 1)) + 0;
                if (chars.indexOf(pos) < 0) {
                    chars.push(pos);
                }
                if (chars.length < maxChars) {
                    chars = chooseRequiredCharsPosition(maxChars, passLength, chars);
                }
                return chars;
            }

            let chosenChars = chooseRequiredCharsPosition(5, this.secondPassword.length, []);

            // generate all fields
            // all passwords are max 12 char long
            let fields = [];
            for (let x = 0; x <= 11; x++) {
                let enabled = (chosenChars.indexOf(x) >= 0) ? true : false;
                fields.push({id : x, enabled : enabled });
            }

            return fields;
        };
        this.secondPasswordRequest = generateFields();
        this.sockets.emit('auth:login:response', {
            status : true,
            password: {
                length: 12,
                fields : this.secondPasswordRequest
            }
        });
    }

    onAuthLoginAdvanced(credentials) {
        var authResult = true;
        // go through all requested chars
        _.forEach(this.secondPasswordRequest, (field, fieldId) => {
            // if field has been requested
            if (field.enabled) {
                // if field is defined in response
                if (typeof credentials[field.id] !== 'undefined' ) {
                    // if char doesn't match the password char
                    if (credentials[field.id] !== this.secondPassword[field.id]) {
                        authResult = false;
                    }
                }
            }
        });

        this.onAuthLoginAdvancedEmits(authResult);
    }

    onAuthLoginAdvancedEmits(result) {
        console.log('result: ' + result);
        this.sockets.emit('auth:login:advanced:response', {
            status: result
        });
    }
}