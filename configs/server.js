import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { dbConnection } from './mongo.js';
import morgan from 'morgan';

const middlewares = (app) =>{
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());
}

const routes = (app) =>{
    //usar en la URL /raceView/
}

const conectarDB = async() =>{
    try {
        await dbConnection();
        console.log('Successful connection to the database')
    } catch (error) {
        console.log('Failed to connect to database')
    }
}

export const initServer = async() =>{
 const app = express();
 const port = process.env.PORT || 3000;
 try {
     middlewares(app);
     conectarDB();
     routes(app);
     app.listen(port);
     console.log(`server running on port ${port}`)
    
 } catch (err) {
    console.log(`server init failed: ${err}`)
 }
}