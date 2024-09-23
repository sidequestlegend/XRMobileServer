"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var express = require("express");
var cors = require('cors');
var createServer = function (config) {
    var app = express();
    // logging http access
    if (config.logging != "none") {
        // app.use(morgan(config.logging));
    }
    // const signal = require('./signaling');
    // app.use(cors({origin: '*'}));
    // app.use(express.urlencoded({ extended: true }));
    // app.use(express.json());
    // app.get('/config', (req, res) => res.json({ useWebSocket: config.type == 'websocket', startupMode: config.mode, logging: config.logging }));
    // app.use('/signaling', signaling);
    // app.use(express.static(path.join(__dirname, '../client/public')));
    // app.use('/module', express.static(path.join(__dirname, '../client/src')));
    // app.get('/', (req, res) => {
    //   const indexPagePath: string = path.join(__dirname, '../client/public/index.html');
    //   fs.access(indexPagePath, (err) => {
    //     if (err) {
    //       log(LogLevel.warn, `Can't find file ' ${indexPagePath}`);
    //       res.status(404).send(`Can't find file ${indexPagePath}`);
    //     } else {
    //       res.sendFile(indexPagePath);
    //     }
    //   });
    // });
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=server.js.map