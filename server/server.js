import express from 'express';
import cors from 'cors';   
import bodyParser from "body-parser";

import mongoose from 'mongoose';
import dotenv from 'dotenv' ;
import userRoutes from './Routes/Userroutes.js';

dotenv.config();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 2000;
const MONGODB_URL = process.env.MONGODB_URL;  
const app = express();


app.use(express.json());

app.use(cors({
  origin: 'https://authsys-6d9x.onrender.com',  // Your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// const MONGODB_URL = "mongodb://localhost:27017/auth";
 
  mongoose.connect(MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
try {
  app.listen(PORT, ()=> {

    console.log(`Server is running on port ${PORT}`);
  })
} catch (error) {
  console.log("Error while connecting to MongoDB", error)
}



app.get('/' , (req, res) => {
  console.log("Hello, this is auth system");
  res.status(201).send("Hello, this is auth system");
});

app.use('/api',userRoutes);

