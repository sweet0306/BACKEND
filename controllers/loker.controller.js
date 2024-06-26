//kode dari file item.controller.js
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
//import helper response formatter
const { response} = require('../helpers/response.formatter');

//import model admin
const { User, Loker } = require('../models');

const fs = require("fs");
//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat item
    createItem : async (req,res) => {
        console.log("request file: ",req.file);
        try {
            
            //membuat schema untuk validasi
            const schema = {
                judul: {
                    type: "string",
                    min: 5,
                }
            }

            //buat object item
            const fileSize = req.file.size;
            const fileName = req.file.filename;
            const url = req.file.path;
            if (fileSize > 2500000) {
                return res.status(402).json(response(402,'file terlalu besar'));
            }
            let lokerCreateObj = {
                users_id: data.userId,
                judul: req.body.judul,
                posisi: req.body.posisi,
                tanggal: req.body.tanggal,
                flyerimg: fileName,
                url: url,
                isPublish: "Belum"
            }

            console.log(lokerCreateObj);
            //validasi menggunakan module fastest-validator
            const validate = v.validate(lokerCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }
            let itemGet = await Loker.findOne({
                where : {
                    users_id : data.userId
                }
            });
            // console.log(itemGet);
            console.log("create: ");
            //buat item
            let lokerCreate = await Loker.create(lokerCreateObj);

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success create item', lokerCreate));
            // if (itemGet === null) {
            //     console.log("create: ");
            //     //buat item
            //     let lokerCreate = await Loker.create(lokerCreateObj);

            //     //response menggunakan helper response.formatter
            //     res.status(201).json(response(201, 'success create item', lokerCreate));
                
            // }else{
            //     console.log("update: ");
            //     let lokerUpdate = await Loker.update(lokerCreateObj, {
            //         where:{
            //             id: itemGet.id,
            //             users_id: data.userId,
            //         }
            //     });
               
            //     res.status(201).json(response(201, 'success update item', lokerUpdate));
            
            // }

        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data item
    getItem : async (req,res) => {
        try {
            //mendapatkan data semua item
            let itemGets = await Loker.findAll({
                //menampilkan admin yang membuat item, karena kita sudah membuat relasi
                include : {
                    model : User,
                }
            });

        //response menggunakan helper response.formatter
        res.status(200).json(response(200,'success get item', itemGets));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan data item berdasarkan id
    getItemById : async (req,res) => {
        try{
            //mendapatkan data item berdasarkan id
            let itemGet = await Loker.findOne({
                where : {
                    id : req.params.id
                },
                //menampilkan admin yang membuat item, karena kita sudah membuat relasi 
                include : {
                    model : User,
                }
            });

            //cek jika item tidak ada
            if(!itemGet){
                res.status(404).json(response(404,'item not found'));
                return;
            }

            //cek apakah admin yang akses adalah yang membuat itemnya
            if(itemGet.admins_id != data.adminId){
                res.status(403).json(response(403,'youre not owner of this item'));
                return;
            }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success get item by id', itemGet));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    getItemByStatus : async (req,res) => {
        try{
            console.log(req.params['status']);
            const status = req.params['status'];
            //mendapatkan data item berdasarkan id
            let itemGet = await Loker.findAll({
                where : {
                    
                    isPublish: {
                        [Op.like]: `%${status}%`,
                    }
                },
                //menampilkan admin yang membuat item, karena kita sudah membuat relasi 
                include : {
                    model : User,
                }
            });

            //cek jika item tidak ada
            if(!itemGet){
                res.status(404).json(response(404,'item not found'));
                return;
            }

            //cek apakah admin yang akses adalah yang membuat itemnya
            // if(itemGet.admins_id != data.adminId){
            //     res.status(403).json(response(403,'youre not owner of this item'));
            //     return;
            // }

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success get item by id', itemGet));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mengupdate item berdasarkan id
    updateItem : async (req, res) => {
        console.log("update file: ",req.file);
        try {
            if (req.file) {
                let itemGet = await Loker.findOne({
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
                 const fileSize = req.file.size;
                 const fileName = req.file.filename;
                 const url = req.file.path;
                 if (fileSize > 2500000) {
                     return res.status(402).json(response(402,'file terlalu besar'));
                 }
                 let itemUpdateObj = {
                     judul: req.body.judul,
                     posisi: req.body.posisi,
                     tanggal: req.body.tanggal,
                     flyerimg: fileName,
                     url: url,
                     isPublish: req.body.isPublish
                 }
    
                //validasi menggunakan module fastest-validator
                // const validate = v.validate(itemUpdateObj, schema);
                // if (validate.length > 0) {
                //     res.status(400).json(response(400, 'validation failed', validate));
                //     return;
                // }
    
                //update item
                await Loker.update(itemUpdateObj, {
                    where:{
                        id: req.params.id,
                        // users_id: data.userId,
                    }
                })
    
                //mendapatkan data item setelah update
                let itemAfterUpdate = await Loker.findOne({
                    where:{
                        id: req.params.id,
                        // users_id: data.userId,
                    }
                })
    
                //response menggunakan helper response.formatter
                res.status(201).json(response(201,'success update item', itemAfterUpdate));
            } else {
                let itemGet = await Loker.findOne({
                    where:{
                        id : req.params.id
                    }
                })
    
                //cek apakah data item ada
                if(!itemGet){
                    res.status(404).json(response(404,'item not found'));
                    return;
                }
    
                 let itemUpdateObj = {
                     judul: req.body.judul,
                     posisi: req.body.posisi,
                     tanggal: req.body.tanggal,
                     isPublish: req.body.isPublish
                 }
    
                //validasi menggunakan module fastest-validator
                // const validate = v.validate(itemUpdateObj, schema);
                // if (validate.length > 0) {
                //     res.status(400).json(response(400, 'validation failed', validate));
                //     return;
                // }
    
                //update item
                await Loker.update(itemUpdateObj, {
                    where:{
                        id: req.params.id,
                        // users_id: data.userId,
                    }
                })
    
                //mendapatkan data item setelah update
                let itemAfterUpdate = await Loker.findOne({
                    where:{
                        id: req.params.id,
                        // users_id: data.userId,
                    }
                })
    
                //response menggunakan helper response.formatter
                res.status(201).json(response(201,'success update item', itemAfterUpdate));
            }
            
            
        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }   
    },

    //menghapus item berdasarkan id
    deleteItem: async (req, res) => {
        try {

            //mendapatkan data item untuk pengecekan
            let itemGet = await Loker.findOne({
                where:{
                    id : req.params.id
                }
            })

            //cek apakah data item ada
            if(!itemGet){
                res.status(404).json(response(404,'item not found'));
                return;
            }

            //cek apakah admin yang akses adalah yang membuat itemnya
            // if(itemGet.users_id != data.userId){
            //     res.status(403).json(response(403,'youre not owner of this item'));
            //     return;
            // }

            await Loker.destroy({
                where:{
                    id: req.params.id,
                }
            });
            const fileName = itemGet.flyerimg;
            const directoryPath = "./uploads/loker/";

            fs.unlink(directoryPath + fileName, (err) => {
                if (err) {
                    res.status(500).json(response(400,'failed deleted file', err));
                }

                res.status(200).json(response(200,'success delete item'));
            });

            //response menggunakan helper response.formatter
            

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    }
}