'use strict';
const pgp = require('pg-promise')();
const db = pgp("postgres://postgres:1@127.0.0.1/phones");

module.exports = class DB {
    constructor() {
        db.none(`CREATE TABLE IF NOT EXISTS accounts(
            pid         serial,
            login		text 		unique		not null,
            pass		text					not null)`)
            .then(() => {
                console.log(`Table accounts created or already exists`)
            })
            .catch((err) => {
                console.warn(`Table accounts wasnt created`, err)
            });

        db.none(`CREATE TABLE IF NOT EXISTS calls (
            cid         serial,
            caller      text        not null,
            companion   text        not null,
            date        text        not null,
            time        text        not null,
            duration    int         not null,
            note        text)`)
            .then(() => {
                console.log(`Table calls created or already exists`)
            })
            .catch(err => {
                console.warn(`Table calls wasnt created`, err)
            })
    }

    get users() {
        return db.any(`SELECT * FROM accounts`)
            .then(data => {
                return data
            })
            .catch(err => {
                return err
            })
    }

    getUser(login) {
        return db.any(`SELECT * FROM accounts WHERE login = $1`, login)
            .then(data => {
                return data
            })
            .catch(err => {
                return err
            })
    }

    set user(user) {
        const {login, password} = user;
        // console.log(`${login}, ${password}`);
        db.none(`INSERT INTO accounts (login, pass) VALUES($1, $2)`, [login, password])
            .then(() => {
                console.log(`New user inserted`);
                // return `Inserted`
            })
            .catch(err => {
                console.log(`New user can't be inserted ${err}`);
                // return `Error: ${err}`
            })
    }

    get calls() {
        return db.any(`SELECT * FROM calls ORDER BY cid`)
            .then(data => {
                return data
            })
            .catch(err => {
                return err
            })
    }

    newCall(call) {
        console.log(call);
        const {caller, companion, date, time, duration, note} = call;
        db.none(`INSERT INTO calls (caller, companion, date, time, duration, note) VALUES ($1, $2, $3, $4, $5, $6)`,
            [caller, companion, date, time, duration, note])
            .then(() => {
                console.log(`Call inserted`);
                return `Inserted`
            })
            .catch((err) => {
                console.log(`Call can't be inserted, ${err}`);
                return `Error: ${err}`
            })
    }

    editCall(prevCall, newCall) {
        console.log(prevCall, newCall);
        let {caller, companion, date, time, duration, note} = prevCall;
        // const {newCaller, newCompanion, newDate, newTime, newDuration} = newCall;
        db.any(`SELECT cid FROM calls WHERE caller = $1 AND companion = $2 AND date = $3 AND time = $4 AND duration = $5 AND note = $6`,
            [caller, companion, date, time, duration, note])
            .then(data => {
                ({caller, companion, date, time, duration, note} = newCall);
                console.log(caller, companion, date, time, duration, note);
                console.log(data[0].cid);
                db.none(`UPDATE calls SET caller = $1, companion = $2, date = $3, time = $4, duration = $5, note = $6 WHERE cid = $7`,
                    [caller, companion, date, time, duration, note, data[0].cid])
                    .then(console.log)
                    .catch(console.log)
            })
            // .catch(console.log)
    }

    deleteCall(call) {
        const {caller, companion, date, time, duration, note} = call;
        db.any(`SELECT cid FROM calls WHERE caller = $1 AND companion = $2 AND date = $3 AND time = $4 AND duration = $5`,
            [caller, companion, date, time, duration])
            .then(id => {
                console.log(id[0].cid);
                db.none(`DELETE FROM calls WHERE cid = $1`, id[0].cid)
                    .then(() => {
                        console.log(`Call ${id[0].cid} deleted successfully`);
                        return `deleted successfully`
                    })
                    .catch(err => {
                        console.log(`Call ${id[0].cid} can't be deleted, ${err}`);
                        return `cant delete, ${err}`
                    })
            })
            .catch(err => {
                console.log(`Call ${id[0].cid} can't be deleted, ${err}`);
                return `cant delete, ${err}`
            })

    }
};

