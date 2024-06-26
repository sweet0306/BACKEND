//kode dari file item.route.js

//import controller admin.controller.js 
const datadiriController = require('../controllers/datadiri.controller');

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
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    // cb(null, Date.now() + '_'+ req.body.nim+'_' + file.originalname);
    cb(null, req.body.nim + ext);
  }
});

const upload = multer({ storage: storage });
const upload_updt = multer({ storage: storage });

//membuat item baru route
route.post('/biodata/datadiri/create', //route
[mid.isLogin, mid.isLogout, upload.single('foto')], //middleware
datadiriController.createItem); //controller

//mendapatkan semua data item route
route.get('/biodata/datadiri/get', //route
[mid.isLogin, mid.isLogout], //middleware
datadiriController.getItem); //controller

route.get('/biodata/datadiri/get_all', //route
[mid.isLogin, mid.isLogout], //middleware
datadiriController.getAll); //controller

 //melihat data item berdasarkan id route
route.get('/biodata/datadiri/get/:id', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
datadiriController.getItemById); //controller

route.get('/biodata/datadiri/get_all/:id', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
datadiriController.getItemByIdAll); //controller

 //mengupdate item berdasarkan id route
 route.put('/biodata/datadiri/update/:id', //route
 [mid.isLogin, mid.isLogout, upload_updt.single('foto')], //middleware
 datadiriController.updateItem); //controller

 route.put('/biodata/datadiri/update_kuisioner/:id', //route
  // [mid.isLogin, mid.isLogout], //middleware
  datadiriController.updateItemById); //controller

 route.get('/biodata/datadiri/search/:nim/:nama', //route
// [mid.isLogin, mid.isLogout, upload.array()], //middleware
datadiriController.getItemSearch); //controller

 //menghapus item berdasarkan id route
 route.delete('/biodata/datadiri/delete/:id', //route
 [mid.isLogin, mid.isLogout, upload.array()], //middleware
 datadiriController.deleteItem); //controller

 route.get('/biodata/datadiri/count_all/:string', //route
//  [mid.isLogin, mid.isLogout, upload.array()], //middleware
 datadiriController.countAllDataAlumni); //controller

  //melihat data item berdasarkan id route
// route.get('/biodata/datadiri/search/:nim/:nama', //route
// [upload.array()], //middleware
// datadiriController.getItemSearch); //controller

// route.post('/biodata/datadiri/search/:nim/:nama', (req, res) => {
  
//     return res.send(req.params.nim);
//   });


module.exports = route;