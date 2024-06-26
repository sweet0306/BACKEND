//kode dari file item.route.js

//import controller admin.controller.js 
const prestasiController = require('../controllers/prestasi.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();

//membuat item baru route
route.post('/rekamjejak/prestasi/create', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
prestasiController.createItem); //controller

//mendapatkan semua data item route
route.get('/rekamjejak/prestasi/get', //route
[mid.isLogin, mid.isLogout], //middleware
prestasiController.getItem); //controller

 //melihat data item berdasarkan id route
route.get('/rekamjejak/prestasi/get/:id', //route
[mid.isLogin, mid.isLogout], //middleware
prestasiController.getItemById); //controller

route.get('/rekamjejak/prestasi/get_item/:start/:end', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
prestasiController.getItemByUserId); //controller

// route.get('/rekamjejak/prestasi/get_item/:start/:end',[mid.isLogin, mid.isLogout, upload.array()], function (req, res) {
//     console.log("Starting Page: ", req.params['start']);
//     console.log("Ending Page: ", req.params['end']);
//     res.send();
// })

// route.get('/rekamjejak/prestasi/get_item/:start/:end', (req, res) => {
//     console.log("Starting Page: ", req.params['start']);
//     console.log("Ending Page: ", req.params['end']);
//     return res.send(req.params['start']);
//     // return res.send(req.params.nim);
//   });

 //mengupdate item berdasarkan id route
 route.put('/rekamjejak/prestasi/update/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 prestasiController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/rekamjejak/prestasi/delete/:id', //route
 [mid.isLogin, mid.isLogout], //middleware
 prestasiController.deleteItem); //controller

module.exports = route;