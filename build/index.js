"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderStreaming = void 0;
var express = require("express");
var handler = require("./websockethandler");
var websocket = require("ws");
var RenderStreaming = /** @class */ (function () {
    function RenderStreaming(options) {
        this.options = options;
        this.app = express();
        this.server = this.app.listen(this.options.port);
        this.setupWebsocket();
        console.log("start as ".concat(this.options.mode, " mode"));
    }
    RenderStreaming.prototype.setupWebsocket = function () {
        var _this = this;
        this.wss = new websocket.Server({ server: this.server });
        this.wss.on('connection', function (ws) {
            ws.onmessage = function (event) {
                var msg = JSON.parse(event.data);
                if (!msg || !_this) {
                    return;
                }
                switch (msg.type) {
                    case "connect":
                        handler.onConnect(ws, msg.connectionId);
                        break;
                    case "disconnect":
                        handler.onDisconnect(ws, msg.connectionId);
                        break;
                    case "offer":
                        handler.onOffer(ws, msg.data);
                        break;
                    case "answer":
                        handler.onAnswer(ws, msg.data);
                        break;
                    case "candidate":
                        handler.onCandidate(ws, msg.data);
                        break;
                    default:
                        break;
                }
            };
        });
    };
    return RenderStreaming;
}());
exports.RenderStreaming = RenderStreaming;
new RenderStreaming({
    port: 8090,
    secure: false,
    keyfile: '',
    certfile: '',
    type: 'websocket',
    mode: 'private',
    logging: 'dev',
});
//# sourceMappingURL=index.js.map