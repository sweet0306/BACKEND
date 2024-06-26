//kode dari file item.route.js

//import controller admin.controller.js 
const hasilkuisionerController = require('../controllers/hasilkuisioner.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();

//membuat item baru route
route.post('/kuisioner_hasil/create', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
hasilkuisionerController.createItem); //controller

//mendapatkan semua data item route
route.get('/kuisioner_hasil/get', //route
[mid.isLogin, mid.isLogout], //middleware
hasilkuisionerController.getItem); //controller


route.get('/kuisioner_hasil/get_kuis', //route
[mid.isLogin, mid.isLogout], //middleware
hasilkuisionerController.getItemKuis); //controller

 //melihat data item berdasarkan id route
route.get('/kuisioner_hasil/get/:id', //route
[mid.isLogin, mid.isLogout], //middleware
hasilkuisionerController.getItemById); //controller

 //mengupdate item berdasarkan id route
 route.put('/kuisioner_hasil/update/:id', //route
 [mid.isLogin, mid.isLogout], //middleware
 hasilkuisionerController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/kuisioner_hasil/delete/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 hasilkuisionerController.deleteItem); //controller

module.exports = route;