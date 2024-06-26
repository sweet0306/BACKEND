//kode dari file item.route.js

//import controller admin.controller.js 
const lokerController = require('../controllers/loker.controller');

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
    cb(null, 'uploads/loker/');
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    // cb(null, Date.now() + '_'+ req.body.nim+'_' + file.originalname);
    let filenm = req.body.judul;
    let result = filenm.toLowerCase();
    let fileName = result.replaceAll(" ", "_");
    cb(null, fileName + ext);
  }
});

const upload = multer({ storage: storage });
const upload_updt = multer({ storage: storage });

//membuat item baru route
route.post('/informasi/loker/create', //route
[mid.isLogin, mid.isLogout, upload.single('foto')], //middleware
lokerController.createItem); //controller

//mendapatkan semua data item route
route.get('/informasi/loker/get', //route
// [mid.isLogin, mid.isLogout], //middleware
lokerController.getItem); //controller

route.get('/informasi/loker/get_item/:status', //route
  [mid.isLogin, mid.isLogout, upload.array()], //middleware
  lokerController.getItemByStatus); //controller

 //melihat data item berdasarkan id route
route.get('/informasi/loker/get/:id', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
lokerController.getItemById); //controller

 //mengupdate item berdasarkan id route
 route.put('/informasi/loker/update/:id', //route
 [mid.isLogin, mid.isLogout, upload_updt.single("foto")], //middleware
 lokerController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/informasi/loker/delete/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 lokerController.deleteItem); //controller

module.exports = route;