//kode dari file item.route.js

//import controller admin.controller.js 
const akademikController = require('../controllers/akademik.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();

//membuat item baru route
route.post('/biodata/akademik/create', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
akademikController.createItem); //controller
// route.post('/biodata/akademik/create', (req, res) => {
  
//     return res.send(req.body);
//   });

//mendapatkan semua data item route
route.get('/biodata/akademik/get', //route
[mid.isLogin, mid.isLogout], //middleware
akademikController.getItem); //controller

 //melihat data item berdasarkan id route
route.get('/biodata/akademik/get/:id', //route
[mid.isLogin, mid.isLogout], //middleware
akademikController.getItemById); //controller

 //mengupdate item berdasarkan id route
 route.put('/biodata/akademik/update/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 akademikController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/biodata/akademik/delete/:id', //route
 [mid.isLogin, mid.isLogout], //middleware
 akademikController.deleteItem); //controller

module.exports = route;