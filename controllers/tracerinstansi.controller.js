//kode dari file item.controller.js

//import helper response formatter
const { response} = require('../helpers/response.formatter');

//import model admin
const { User, Tracerinstansi, LaporanTracer } = require('../models');

//validasi
const Validator = require("fastest-validator");
const v = new Validator();
const shortId = require('shortid');

module.exports = {

    //membuat item
    createItem : async (req,res) => {
        try {
            
            //membuat schema untuk validasi
            const schema = {
                nama: {
                    type: "string",
                    min: 2,
                }
            }

            //buat object item
            const short = shortId.generate();
            const url = short;
            let tracerinstansiCreateObj = {
                users_id: data.userId,
                nama: req.body.nama,
                lingkup: req.body.lingkup,
                tahun: req.body.tahun,
                email: req.body.email,
                alamat: req.body.alamat,
                // url_tracer: `http://127.0.0.1:5000/${url}`
                url_tracer: `https://s.uad.id/${url}`
            }

            console.log(tracerinstansiCreateObj);
            //validasi menggunakan module fastest-validator
            const validate = v.validate(tracerinstansiCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            let itemGet = await Tracerinstansi.findOne({
                where : {
                    users_id : data.userId
                },
                //menampilkan admin yang membuat item, karena kita sudah membuat relasi 
                include : {
                    model : User,
                }
            });
            if(!itemGet){
                //buat item
                let tracerinstansiCreate = await Tracerinstansi.create(tracerinstansiCreateObj);

                //response menggunakan helper response.formatter
                return res.status(200).json(response(200, 'success create item', tracerinstansiCreate));
            } else if (itemGet) {
                //buat item
                // let tracerinstansiUpdate = await Tracerinstansi.create(tracerinstansiCreateObj);
                let tracerinstansiUpdate = await Tracerinstansi.update(tracerinstansiCreateObj, {
                    where:{
                        users_id: data.userId,
                    }
                })

                //response menggunakan helper response.formatter
                return res.status(200).json(response(200, 'success update item', tracerinstansiUpdate));
            }

            
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    createItemUplaod : async (req,res) => {
        console.log("file pdf: ", req.file);
        try {
            
            //buat object item
            if (req.file) {
                
                const fileSize = req.file.size;
                const fileName = req.file.filename;
                const url = req.file.path;
                if (fileSize > 500000) {
                    return res.status(402).json(response(402,'file terlalu besar'));
                }
                let laporanCreateObj = {
                    users_id: data.userId,
                    status: fileName,
                    file_tracer: fileName,
                    url: url
                }
    

                let userGet = await User.findOne({
                    where : {
                        id : data.userId
                    }
                });
                console.log(laporanCreateObj.nim)
                
                // console.log("ID ITEM: ",itemGet);
                if (userGet) {
                    console.log("create: ");
                    //buat item
                    let laporancreate = await LaporanTracer.create(laporanCreateObj);
    
                    //response menggunakan helper response.formatter
                    res.status(200).json(response(200, 'success create item', laporancreate));
                    
                }
                // else{
                //     console.log("update: ");
                //     let laporanUpdate = await LaporanTracer.create(laporanCreateObj, {
                //         where:{
                //             id: itemGet.id,
                //             // users_id: data.userId,
                //         }
                //     });
                   
                //     res.status(201).json(response(200, 'success create item', laporanUpdate));
                
                // }
            } else {
                
                res.status(400).json(response(400, 'validation failed', validate));
                return;
                
            }
            

        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data item
    getItem : async (req,res) => {
        try {
            //mendapatkan data semua item
            let itemGets = await Tracerinstansi.findAll({
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
    getItemFile : async (req,res) => {
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
            let itemGet = await Tracerinstansi.findOne({
                where : {
                    users_id : req.params.id
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

    getItemByUserId : async (req,res) => {
        try{
            console.log(req.params['start']);
            console.log(req.params['end']);
            const item_id = req.params['start'];
            const user_id = req.params['end'];
            //mendapatkan data item berdasarkan id
            let itemGet = await Tracerinstansi.findOne({
                where : {
                    id: item_id,
                    users_id : user_id
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
        try {
            //mendapatkan data item untuk pengecekan
            let itemGet = await Tracerinstansi.findOne({
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
            if(itemGet.users_id != data.userId){
                res.status(403).json(response(403,'youre not owner of this item'));
                return;
            }

             //membuat schema untuk validasi
            const schema = {
                nama: {
                    type: "string",
                    min: 2,
                }
            }

             //buat object item
            let itemUpdateObj = {
                users_id: data.userId,
                nama: req.body.nama,
                lingkup: req.body.lingkup,
                tahun: req.body.tahun,
                email: req.body.email,
                alamat: req.body.alamat,
                url_tracer: req.body.url_tracer
                
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(itemUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update item
            await Tracerinstansi.update(itemUpdateObj, {
                where:{
                    id: req.params.id,
                    users_id: data.userId,
                }
            })

            //mendapatkan data item setelah update
            let itemAfterUpdate = await Tracerinstansi.findOne({
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
            let itemGet = await Tracerinstansi.findOne({
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
            if(itemGet.users_id != data.userId){
                res.status(403).json(response(403,'youre not owner of this item'));
                return;
            }

            await Tracerinstansi.destroy({
                where:{
                    id: req.params.id,
                    users_id: data.userId,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success delete item'));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    deleteItemFile: async (req, res) => {
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

            await LaporanTracer.destroy({
                where:{
                    id: req.params.id,
                    users_id: data.userId,
                }
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success delete item'));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    }
}