//kode dari file index.js

//import config

const baseConfig =  require('./config/base.config');
const cors = require('cors');
//import express
const express = require('express')


const app = express();
// const multer = require('multer');
app.use(cors());
const port = 5000;
const urlApi = "/api";

//import multer untuk mngehandle input dari form data
const multer = require('multer');
// const upload = multer();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

//memanggil route pada routes\api.route.js
require('./routes/api.route')(app,urlApi);
app.use(express.static('uploads'));

//listen

app.listen(port, () => {
    console.log(`server is running on port ${port} and url ${baseConfig.base_url}`);
});