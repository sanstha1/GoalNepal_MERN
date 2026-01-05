import express, {Application, Request, Response} from 'express'; 
import bodyParser from "body-parser"; 
import dotenv from 'dotenv';
import {PORT} from './config';
import { connectDatabase } from './database/mangodb';
dotenv.config();
//Yo bhanda tala.env chalauna milcha 
console.log(process.env.PORT);

import authRoutes from './routes/auth.route';
const app : Application  = express(); 
// const PORT : number  = 3000; 

app.use(bodyParser.json());


app.use('/api/auth', authRoutes);

//euta functino banauney 

async function start(){
    await connectDatabase();

    app.listen(PORT, ()=>{
    console.log(`Server: http://localhost:${PORT}`);
});
}

start().catch((error) => console.log(error));
