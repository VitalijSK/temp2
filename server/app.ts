import {
    Request,
    Response
} from "express";
import router from './routes/users'
import { readFileSync }  from 'fs';

const http2 = require('http2');
const finalhandler = require('finalhandler');

function app(req: Request, res: Response) {
    router(req, res, finalhandler(req, res));
}

const port = 3000;
const option = {
    key: readFileSync(__dirname + '/../../https/server.key'),
    cert: readFileSync(__dirname + '/../../https/server.crt'),
    passphrase: '20182018'
};
const server = http2.createSecureServer(option, app);

server.listen(port, () => {
    console.log(`server on the port : ${port}`);
});