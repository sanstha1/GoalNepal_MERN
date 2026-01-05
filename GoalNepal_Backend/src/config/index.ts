import dotenv from 'dotenv'; 
dotenv.config();//env use garna yo duita command always compulsory 

export const PORT: number= process.env.PORT? parseInt(process.env.PORT) : 5050; //5050 chahi fallback port huney bhayo in case env ma port milena bhaney just to be safe 
export const MANGODB_URI  = process.env.MANGODB_URI || 'mangodb://localhost:27017/35a_backend';
export const JWT_SECRET: string = process.env.JWT_SECRET || 'default_secret';