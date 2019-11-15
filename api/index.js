'use strict';
const express = require('express');
const app = express();
const compression = require('compression');
const port = 8001;
app.use(compression());
const serveStatic = require('serve-static');
app.use(serveStatic('./dist'));
app.use(express.static('static'));
const router = require('./v1/router');
const jsonParser = express.json();
app.use(jsonParser);


app.use(router);

app.use(function (req, res, next) {
    res.status(404).json({success: false, msg: "404, api route not found"})
});

//==========
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port} (http://localhost:${port})`);
});
