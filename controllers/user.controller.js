//kode dari file admin.controller.js

//import helper response formatter
const { response} = require('../helpers/response.formatter');

//import model admin
const { User, Token } = require('../models');

//import config
const baseConfig = require('../config/base.config');

//hash password
const passwordHash = require('password-hash');

//import jwt dengan jsonwebtoken
const jwt = require('jsonwebtoken');

//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat admin baru
    createUser : async (req,res) => {
        try{

            //membuat schema untuk validasi
            const schema = {
                name :{
                    type : "string",
                    min : 3,
                },
                email :{
                    type : "email",
                    min : 3,
                },
                password :{
                    type : "string",
                    min : 3,
                },
                role :{
                    type: "string",
                    min : 1,
                }
            };

            //validasi menggunakan module fastest-validator
            const validate = v.validate({
                name : req.body.name,
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                role : req.body.role
            }, schema);
            if(validate.length > 0){
                res.status(400).json(response(400,'validation failed', validate));
                return;
            }

            //mendapatkan data admin untuk pengecekan
            let userGets = await User.findOne({ //kita menggunakan model Admin
                    where : {
                        username : req.body.username
                    }
                }
            );

            //cek apakah email sudah terdaftar
            if(userGets){
                res.status(409).json(response(409,'Username already registered'));
                return;
            }

            //membuat object untuk create admin
            let userCreateObj = {
                name : req.body.name,
                username : req.body.username,
                email : req.body.email,
                password : passwordHash.generate(req.body.password), //hash password menggunakan module password-hash
                role : req.body.role
            }

            //membuat admin baru
            
            let userCreate = await User.create(userCreateObj);

            //mengirim response dengan bantuan helper response.formatter
            res.status(201).json(response(200,'User created', userCreate)); //response(201,'admin created', adminCreate) adalah helper response.formatter

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },
    


    //login admin
    loginUser : async (req,res) => {
        console.log(req.username);
        try{

            //membuat schema untuk validasi
            // const schema = {
            //     username :{
            //         type : "string",
            //         min : 3,
            //     },
            //     password :{
            //         type : "string",
            //         min : 3,
            //     }
            // };

            //memasukan req.body ke dalam variable
            let username = req.body.username;
            let password = req.body.password;

            //validasi menggunakan module fastest-validator
            // const validate = v.validate({
            //     username : username,
            //     password : password,
            // }, schema);
            // if(validate.length > 0){
            //     res.status(400).json(response(400,'validation failed', validate));
            //     return;
            // }

            //mendapatkan data admin untuk pengecekan
            let userGets = await User.findOne({ //kita menggunakan model Admin
                    where : {
                        username : username
                    }
            });

            //cek apakah email ada
            if(!userGets){
                res.status(404).json(response(404,'Username not found'));
                return;
            }

            //check password
            if(!passwordHash.verify(password, userGets.password)){
                res.status(403).json(response(403,'password wrong'));
                return;
            }

            //membuat token jwt
            let token = jwt.sign({
                userId: userGets.id, //kita parsing id admin
            }, baseConfig.auth_secret, { //auth secret adalah secret key yang kita buat di config/base.config.js
                expiresIn: 86400 // expired dalam 24 jam
            });

            //mengirim response dengan bantuan helper response.formatter
            res.status(200).json(response(200,'login success', {token : token, data: userGets})); 

        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    //logout admin
    logoutUser : async (req,res) => {
        try{
             //memasukan token kedalam variable
            let token = req.headers.authorization.split(' ')[1];

            //memasukan token ke table token
            let tokenInsert = await Token.create({
                token: token
            });

            //send response
            res.status(200).json(response(200,'logout success', tokenInsert));
        }catch(err){
            res.status(500).json(response(500,'internal server error',err));
            console.log(err);
        }
    },

    updateUser : async (req, res) => {
        console.log("pass: ",req.body.password)
        try {
            //mendapatkan data item untuk pengecekan
            let itemGet = await User.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data item ada
            if(!itemGet){
                res.status(404).json(response(404,'item not found'));
                return;
            }


             //buat object item
            let itemUpdateObj = {
                password: passwordHash.generate(req.body.password),
            }
            

            //update item
            await User.update(itemUpdateObj, {
                where:{
                    id: req.params.id,
                }
            })

            //mendapatkan data item setelah update
            let itemAfterUpdate = await User.findOne({
                where:{
                    id: req.params.id,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success update item', itemAfterUpdate));
            
        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }   
    },

}