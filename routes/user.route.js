//import controller User.controller.js 
const userController = require('../controllers/user.controller');

//import middleware dari auth.middleware.js
const mid = require('../middlewares/auth.middleware');

//express
const express = require('express');
const route = express.Router();

//import multer untuk mngehandle input dari form data
const multer = require('multer');
const upload = multer();


//membuat User baru route
route.post('/auth/register', //route
[upload.array()], //middleware
userController.createUser); //controller

//login User route
route.post('/auth/login', //route
[upload.array()], //middleware
userController.loginUser); //controller

route.put('/auth/update/:id', //route
[mid.isLogin, mid.isLogout, upload.array()], //middleware
userController.updateUser); //controller

 //melihat data item berdasarkan id route
//  route.get('/auth/get/:id', //route
//  [mid.isLogin, mid.isLogout, upload.array()], //middleware
//  userController.getUserById); //controller

//logout User route
route.post('/auth/logout', //route
[ mid.isLogin, mid.isLogout ,upload.array()], //middleware isLogin dan isLogout digunakan untuk mengecek apakah User sudah login atau belum atau sudah logout atau belum
userController.logoutUser); //controller

module.exports = route;

