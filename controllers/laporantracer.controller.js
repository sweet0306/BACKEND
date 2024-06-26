//kode dari file item.controller.js

//import helper response formatter
const { response} = require('../helpers/response.formatter');

//import model admin
const { User, LaporanTracer } = require('../models');

const fs = require("fs");
//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat item
    createItem : async (req,res) => {
        console.log("request file: ",req.file);
        console.log("request filename: ",req.file.filename);
        try {
            
            //membuat schema untuk validasi
            // const schema = {
            //     file_tracer: {
            //         type: "files"
            //     }
            // }

            //buat object item
            const fileSize = req.file.size;
            const fileName = req.file.filename;
            const url = req.file.path;
            if (fileSize > 2500000) {
                return res.status(402).json(response(402,'file terlalu besar'));
            }
            let LaporanTracerCreateObj = {
                users_id: data.userId,
                status: req.body.status,
                file_tracer: fileName,
                url: url,
            }

            console.log(LaporanTracerCreateObj);
            //validasi menggunakan module fastest-validator
            // const validate = v.validate(LaporanTracerCreateObj, schema);
            // if (validate.length > 0) {
            //     res.status(400).json(response(400, 'validation failed', validate));
            //     return;
            // }
            let itemGet = await LaporanTracer.findOne({
                where : {
                    users_id : data.userId
                }
            });
            // console.log(itemGet);
            console.log("create: ");
            //buat item
            let LaporanTracerCreate = await LaporanTracer.create(LaporanTracerCreateObj);

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success create item', LaporanTracerCreate));
            // if (itemGet === null) {
            //     console.log("create: ");
            //     //buat item
            //     let LaporanTracerCreate = await LaporanTracer.create(LaporanTracerCreateObj);

            //     //response menggunakan helper response.formatter
            //     res.status(201).json(response(201, 'success create item', LaporanTracerCreate));
                
            // }else{
            //     console.log("update: ");
            //     let LaporanTracerUpdate = await LaporanTracer.update(LaporanTracerCreateObj, {
            //         where:{
            //             id: itemGet.id,
            //             users_id: data.userId,
            //         }
            //     });
               
            //     res.status(201).json(response(201, 'success update item', LaporanTracerUpdate));
            
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
            let itemGets = await LaporanTracer.findAll({
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
            let itemGet = await LaporanTracer.findOne({
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

    //mengupdate item berdasarkan id
    updateItem : async (req, res) => {
        console.log("update file: ",req.file);
        try {
            //mendapatkan data item untuk pengecekan
            let itemGet = await LaporanTracer.findOne({
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

             //membuat schema untuk validasi
            const schema = {
                judul: {
                    type: "string",
                    min: 2,
                }
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
            const validate = v.validate(itemUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update item
            await LaporanTracer.update(itemUpdateObj, {
                where:{
                    id: req.params.id,
                    users_id: data.userId,
                }
            })

            //mendapatkan data item setelah update
            let itemAfterUpdate = await LaporanTracer.findOne({
                where:{
                    id: req.params.id,
                    users_id: data.userId,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success update item', itemAfterUpdate));
            
        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }   
    },

    //menghapus item berdasarkan id
    deleteItem: async (req, res) => {
        try {

            //mendapatkan data item untuk pengecekan
            let itemGet = await LaporanTracer.findOne({
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

            await LaporanTracer.destroy({
                where:{
                    id: req.params.id,
                }
            });
            const fileName = itemGet.flyerimg;
            const directoryPath = "./uploads/laporan/";

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