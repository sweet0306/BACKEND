//kode dari file item.route.js

//import controller admin.controller.js 
const pekerjaanController = require('../controllers/pekerjaan.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();

//membuat item baru route
route.post('/biodata/pekerjaan/create', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
pekerjaanController.createItem); //controller

//mendapatkan semua data item route
route.get('/biodata/pekerjaan/get', //route
[mid.isLogin, mid.isLogout], //middleware
pekerjaanController.getItem); //controller

 //melihat data item berdasarkan id route
route.get('/biodata/pekerjaan/get/:id', //route
[mid.isLogin, mid.isLogout], //middleware
pekerjaanController.getItemById); //controller

 //mengupdate item berdasarkan id route
 route.put('/biodata/pekerjaan/update/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 pekerjaanController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/biodata/pekerjaan/delete/:id', //route
 [mid.isLogin, mid.isLogout], //middleware
 pekerjaanController.deleteItem); //controller

module.exports = route;