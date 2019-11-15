'use strict';
const DB = require('./DB');
const db = new DB();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');


module.exports = class actions {
    login() {
        return function (req, res, next) {
            let password = req.body.pass;
            db.getUser(req.body.phone)
                .then(data => {
                    bcrypt.compare(password, data[0].pass)
                        .then(match => {
                            console.log(match);
                            if (match) res.json({success: true, msg: `henlo world!`});
                            else res.status(401).json({success: false, msg: `wrong auth`})
                        })
                        .catch(console.log)
                })
                .catch(err => {
                    console.log(err);
                    res.status(401).json({success: false, msg: `wrong auth`})
                });
        }
    }

    register() {
        return function (req, res, next) {
            let password = req.body.pass;
            bcrypt.hash(password, 10)
                .then(hash => {
                    console.log(hash);
                    db.user = {login: req.body.phone, password: hash};
                    res.json({success: true, msg: "henlo world!"})
                })
                .catch(console.log)
        }
    }

    getCalls() {
        return function (req, res, next) {
            db.calls.then((data) => {
                res.json(data)
            });
        }
    }

    newCall() {
        return function (req, res, next) {
            console.log(req.body);
            db.newCall(req.body.item)
        }
    }

    deleteCall() {
        return function (req, res, next) {
            db.deleteCall(req.body.item)
        }
    }

    updateCall() {
        return function (req, res, next) {
            console.log(req.body);
            db.editCall(req.body.prevCall, req.body.newCall);
            res.json({success: true, msg: "Updated"})
        }
    }
};
