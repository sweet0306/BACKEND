//kode dari file item.controller.js

//import helper response formatter
const { where } = require('sequelize');
const { response} = require('../helpers/response.formatter');

//import model admin
const { User, Pelatihan, Datadiri } = require('../models');

//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat item
    createItem : async (req,res) => {
        try {
            
            //membuat schema untuk validasi
            const schema = {
                nama_pelatihan: {
                    type: "string",
                    min: 2,
                }
            }

            //buat object item
            let pelatihanCreateObj = {
                users_id: data.userId,
                nama_pelatihan: req.body.nama_pelatihan,
                sertifikat: req.body.sertifikat,
                tahun: req.body.tahun,
                penyelenggara: req.body.penyelenggara,
                keterangan: req.body.keterangan
            }

            console.log(pelatihanCreateObj);
            //validasi menggunakan module fastest-validator
            const validate = v.validate(pelatihanCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //buat item
            let pelatihanCreate = await Pelatihan.create(pelatihanCreateObj);

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success create item', pelatihanCreate));
        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data item
    getItem : async (req,res) => {
        try {
            //mendapatkan data semua item
            let itemGets = await Pelatihan.findAll({
                //menampilkan admin yang membuat item, karena kita sudah membuat relasi
                include : {
                    model : User
                }
            });
            var formattedJSON = itemGets.map(item => {

                // For each item in the "initialJSON", map the fields to each item 
                // in the "formattedJSON" array
                if (item.sertifikat === "0") {
                    item.sertifikat = "Ada";
                } else if(item.sertifikat === "1"){
                    item.sertifikat = "Tidak Ada";
                }
                return {
                    id: item.id,
                    users_id: item.users_id,
                    nama_pelatihan : item.nama_pelatihan,
                    tahun: item.tahun,
                    sertifikat: item.sertifikat,
                    penyelenggara: item.penyelenggara,
                    keterangan : item.keterangan,
                    nama_user : item.User.name,
                    email: item.User.email
                }
              
            })

            //response menggunakan helper response.formatter
            res.status(200).json(response(200,'success get item', formattedJSON));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan data item berdasarkan id
    getItemById : async (req,res) => {
        try{
            //mendapatkan data item berdasarkan id
            let itemGet = await Pelatihan.findAll({
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
            let itemGet = await Pelatihan.findOne({
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
            let itemGet = await Pelatihan.findOne({
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
                nama_pelatihan: {
                    type: "string",
                    min: 2,
                }
            }

             //buat object item
            let itemUpdateObj = {
                nama_pelatihan: req.body.nama_pelatihan,
                sertifikat: req.body.sertifikat,
                tahun: req.body.tahun,
                penyelenggara: req.body.penyelenggara,
                keterangan: req.body.keterangan
                
            }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(itemUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update item
            await Pelatihan.update(itemUpdateObj, {
                where:{
                    id: req.params.id,
                    users_id: data.userId,
                }
            })

            //mendapatkan data item setelah update
            let itemAfterUpdate = await Pelatihan.findOne({
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
            let itemGet = await Pelatihan.findOne({
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

            await Pelatihan.destroy({
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