//kode dari file item.route.js

//import controller admin.controller.js 
const LaporanTracerController = require('../controllers/laporantracer.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
// const upload = multer();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/laporan/');
//   },
//   filename: (req, file, cb) => {
//     let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
//     // cb(null, Date.now() + '_'+ req.body.nim+'_' + file.originalname);
//     let filenm = req.body.judul;
//     // let result = filenm.toLowerCase();
//     // let fileName = result.replaceAll(" ", "_");
//     cb(null, filenm + ext);
//   }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/laporan/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage })

const upload = multer({ storage: storage });
const upload_updt = multer({ storage: storage });

//membuat item baru route
// route.post("/informasi/laporan/create", uploadStorage.single("file_tracer"), (req, res) => {
//   console.log(req.file)
//   return res.send("Single file")
// })
route.post('/informasi/laporan/create', //route
[mid.isLogin, mid.isLogout, uploadStorage.single("file_tracer")], //middleware
LaporanTracerController.createItem); //controller

//mendapatkan semua data item route
route.get('/informasi/laporan/get', //route
// [mid.isLogin, mid.isLogout], //middleware
LaporanTracerController.getItem); //controller

 //melihat data item berdasarkan id route
route.get('/informasi/laporan/get/:id', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
LaporanTracerController.getItemById); //controller

 //mengupdate item berdasarkan id route
 route.put('/informasi/laporan/update/:id', //route
 [mid.isLogin, mid.isLogout, upload_updt.single("file")], //middleware
 LaporanTracerController.updateItem); //controller

 //menghapus item berdasarkan id route
 route.delete('/informasi/laporan/delete/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 LaporanTracerController.deleteItem); //controller

module.exports = route;