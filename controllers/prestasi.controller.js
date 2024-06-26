//kode dari file item.controller.js

//import helper response formatter
const { response} = require('../helpers/response.formatter');

//import model admin
const { User, Prestasi } = require('../models');

//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat item
    createItem : async (req,res) => {
        try {
            
            //membuat schema untuk validasi
            const schema = {
                nama_kejuaraan: {
                    type: "string",
                    min: 2,
                }
            }

            //buat object item
            let prestasiCreateObj = {
                users_id: data.userId,
                nama_kejuaraan: req.body.nama_kejuaraan,
                penyelenggara: req.body.penyelenggara,
                tahun: req.body.tahun,
                skala: req.body.skala,
                keterangan: req.body.keterangan,
            }

            console.log(prestasiCreateObj);
            //validasi menggunakan module fastest-validator
            const validate = v.validate(prestasiCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //buat item
            let prestasiCreate = await Prestasi.create(prestasiCreateObj);

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success create item', prestasiCreate));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data item
    getItem : async (req,res) => {
        try {
            //mendapatkan data semua item
            let itemGets = await Prestasi.findAll({
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
            let itemGet = await Prestasi.findAll({
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
            let itemGet = await Prestasi.findOne({
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
            let itemGet = await Prestasi.findOne({
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
                nama_kejuaraan: {
                    type: "string",
                    min: 2,
                }
            }

             //buat object item
            let itemUpdateObj = {
                nama_kejuaraan: req.body.nama_kejuaraan,
                penyelenggara: req.body.penyelenggara,
                tahun: req.body.tahun,
                skala: req.body.skala,
                keterangan: req.body.keterangan,
                
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(itemUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update item
            await Prestasi.update(itemUpdateObj, {
                where:{
                    id: req.params.id,
                    users_id: data.userId,
                }
            })

            //mendapatkan data item setelah update
            let itemAfterUpdate = await Prestasi.findOne({
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
            let itemGet = await Prestasi.findOne({
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

            await Prestasi.destroy({
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