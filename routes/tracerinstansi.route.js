//kode dari file item.route.js

//import controller admin.controller.js 
const tracerinstansiController = require('../controllers/tracerinstansi.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
// const upload = multer();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/laporan/');
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    // cb(null, Date.now() + '_' + file.originalname);
    let filenameOri = file.originalname;
    let filenm = filenameOri.slice(0, -4);
    let result = filenm.toLowerCase();
    let fileName = result.replaceAll(" ", "_");
    cb(null, fileName +'_'+ Date.now() + ext);
  }
});

const upload = multer({ storage: storage });
const upload_updt = multer({ storage: storage });


//membuat item baru route
route.post('/tracerinstansi/create', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
tracerinstansiController.createItem); //controller

route.post('/tracerinstansi/upload', //route
[mid.isLogin, mid.isLogout, upload.single('file_tracer')], //middleware
tracerinstansiController.createItemUplaod); //controller

//mendapatkan semua data item route
route.get('/tracerinstansi/get', //route
[mid.isLogin, mid.isLogout], //middleware
tracerinstansiController.getItem); //controller

route.get('/tracerinstansi/get_file', //route
[mid.isLogin, mid.isLogout], //middleware
tracerinstansiController.getItemFile); //controller

 //melihat data item berdasarkan id route
route.get('/tracerinstansi/get/:id', //route
[mid.isLogin, mid.isLogout], //middleware
tracerinstansiController.getItemById); //controller

route.get('/tracerinstansi/get_item/:start/:end', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
tracerinstansiController.getItemByUserId); //controller

 //mengupdate item berdasarkan id route
 route.put('/tracerinstansi/update/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 tracerinstansiController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/tracerinstansi/delete/:id', //route
 [mid.isLogin, mid.isLogout], //middleware
 tracerinstansiController.deleteItem); //controller

 route.delete('/tracerinstansi/delete_file/:id', //route
 [mid.isLogin, mid.isLogout], //middleware
 tracerinstansiController.deleteItemFile); //controller

module.exports = route;