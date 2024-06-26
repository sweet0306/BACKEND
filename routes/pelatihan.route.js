//kode dari file item.route.js

//import controller admin.controller.js 
const pelatihanController = require('../controllers/pelatihan.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();

//membuat item baru route
route.post('/rekamjejak/pelatihan/create', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
pelatihanController.createItem); //controller

//mendapatkan semua data item route
route.get('/rekamjejak/pelatihan/get', //route
[mid.isLogin, mid.isLogout], //middleware
pelatihanController.getItem); //controller

 //melihat data item berdasarkan id route
route.get('/rekamjejak/pelatihan/get/:id', //route
[mid.isLogin, mid.isLogout], //middleware
pelatihanController.getItemById); //controller

route.get('/rekamjejak/pelatihan/get_item/:start/:end', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
pelatihanController.getItemByUserId); //controller

 //mengupdate item berdasarkan id route
 route.put('/rekamjejak/pelatihan/update/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 pelatihanController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/rekamjejak/pelatihan/delete/:id', //route
 [mid.isLogin, mid.isLogout], //middleware
 pelatihanController.deleteItem); //controller

module.exports = route;