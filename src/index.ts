import * as express from 'express';
import * as https from 'https';
import * as handler from "./websockethandler";
import * as websocket from "ws";
import Options from './options';
import * as fs from 'fs';


var credentials = {
  key: fs.readFileSync('/usr/src/ssl/sdq.st.key', 'utf8'), 
  cert: fs.readFileSync('/usr/src/ssl/sdq.st.cert', 'utf8')
};

export class RenderStreaming {
  wss: websocket.Server;
  public app: express.Application;
  public server?: any;
  public options: Options;
  constructor(options: Options) {
    this.options = options;
    this.app = express();
    this.server = https.createServer(credentials, this.app);
    this.server.listen(this.options.port);
    // this.server = this.app.listen(this.options.port);
    this.setupWebsocket();
    console.log(`start as ${this.options.mode} mode`);
  }
  setupWebsocket() {
    this.wss = new websocket.Server({ server: this.server });
    this.wss.on('connection', (ws: WebSocket) => {
      ws.onmessage = (event: MessageEvent): void => {
        const msg = JSON.parse(event.data);
        if (!msg || !this) {
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
  }
}

new RenderStreaming({
  port: 8443,
  secure: false,
  keyfile: '',
  certfile: '',
  type: 'websocket',
  mode: 'private',
  logging: 'dev',
});
