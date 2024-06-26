//kode dari file item.route.js

//import controller admin.controller.js 
const kuisionerController = require('../controllers/kuisioner.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();

//membuat item baru route
route.post('/kuisioner/create', //route
[mid.isLogin, mid.isLogout], //middleware
kuisionerController.createItem); //controller

//mendapatkan semua data item route
route.get('/kuisioner/get', //route
[mid.isLogin, mid.isLogout], //middleware
kuisionerController.getItem); //controller


route.get('/kuisioner/get_kuis', //route
[mid.isLogin, mid.isLogout], //middleware
kuisionerController.getItemKuis); //controller

 //melihat data item berdasarkan id route
route.get('/kuisioner/get/:id', //route
[mid.isLogin, mid.isLogout], //middleware
kuisionerController.getItemById); //controller

 //mengupdate item berdasarkan id route
 route.put('/kuisioner/update/:id', //route
 [mid.isLogin, mid.isLogout], //middleware
 kuisionerController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/kuisioner/delete/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 kuisionerController.deleteItem); //controller

module.exports = route;