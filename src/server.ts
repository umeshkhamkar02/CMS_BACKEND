import http from 'http';
import app from './app'
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);
const port: any = process.env.PORT;

server.listen(port, () => {
    console.log(`Connection success on ${port}`);
});