//kode dari file item.route.js

//import controller admin.controller.js 
const organisasiController = require('../controllers/organisasi.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();

//membuat item baru route
route.post('/rekamjejak/organisasi/create', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
organisasiController.createItem); //controller

//mendapatkan semua data item route
route.get('/rekamjejak/organisasi/get', //route
[mid.isLogin, mid.isLogout], //middleware
organisasiController.getItem); //controller

 //melihat data item berdasarkan id route
route.get('/rekamjejak/organisasi/get/:id', //route
[mid.isLogin, mid.isLogout], //middleware
organisasiController.getItemById); //controller

route.get('/rekamjejak/organisasi/get_item/:start/:end', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
organisasiController.getItemByUserId); //controller

 //mengupdate item berdasarkan id route
 route.put('/rekamjejak/organisasi/update/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 organisasiController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/rekamjejak/organisasi/delete/:id', //route
 [mid.isLogin, mid.isLogout], //middleware
 organisasiController.deleteItem); //controller

module.exports = route;