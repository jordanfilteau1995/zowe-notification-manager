import { Router } from "express-serve-static-core";
import { Response, Request } from "express";

const express = require('express');
const Promise = require('bluebird');

class ConnectionHandler {
  private connections: WebSocket[];

  constructor() {
    this.connections = new Array<WebSocket>();
  }

  broadcast(msg: any): void {
    this.connections.forEach(function (ws) {
      ws.send(msg);
    });
  }


  addConnection(webSocket: WebSocket): void {
    this.connections.push(webSocket);
    this.addEventHandler(webSocket);
  }

  addEventHandler(webSocket: WebSocket): void {
    webSocket.onmessage = function (event): any {
      handler.broadcast(event.data);
    }
  }
}

var handler: ConnectionHandler = new ConnectionHandler();

exports.NotificationWebSocketRouter = function(context) {
  return new Promise(function(resolve, reject) {
    let router = express.Router();
    router.use(function abc(req,res,next) {
      next();
    });
    router.ws('/',function(ws,req) {
      handler.addConnection(ws);
    });
    resolve(router);
  });
};