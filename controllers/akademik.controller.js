//kode dari file item.controller.js

//import helper response formatter
const { response} = require('../helpers/response.formatter');

//import model admin
const { User, Akademik } = require('../models');

const fs = require("fs");
//validasi
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {

    //membuat item
    createItem : async (req,res) => {
        // console.log("request file: ",req.file);
        try {
            
            //membuat schema untuk validasi
            const schema = {
                angkatan: {
                    type: "string",
                    min: 1,
                }
            }

            let AkademikCreateObj = {
                users_id: data.userId,
                angkatan: req.body.angkatan,
                tahun_lulus: req.body.tahun_lulus,
                tanggal_yudisium: req.body.tanggal_yudisium,
                ipk: req.body.ipk,
                lama_studi: req.body.lama_studi,
                nilai_toefl: req.body.nilai_toefl,
                studi_lanjut: req.body.studi_lanjut,
                program_studi: req.body.program_studi,
                fakultas: req.body.fakultas
            }

            console.log(AkademikCreateObj);
            //validasi menggunakan module fastest-validator
            const validate = v.validate(AkademikCreateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }
            let itemGet = await Akademik.findOne({
                where : {
                    users_id : data.userId
                }
            });
            // console.log(itemGet);
            console.log("create: ");
            //buat item
            let AkademikCreate = await Akademik.create(AkademikCreateObj);

            //response menggunakan helper response.formatter
            res.status(200).json(response(200, 'success create item', AkademikCreate));


        }catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    //mendapatkan semua data item
    getItem : async (req,res) => {
        try {
            //mendapatkan data semua item
            let itemGets = await Akademik.findAll({
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
            let itemGet = await Akademik.findOne({
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

    //mengupdate item berdasarkan id
    updateItem : async (req, res) => {
        try {
            //mendapatkan data item untuk pengecekan
            let itemGet = await Akademik.findOne({
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
                angkatan: {
                    type: "string",
                    min: 2,
                }
            }

             //buat object item
             
             let itemUpdateObj = {
                angkatan: req.body.angkatan,
                tahun_lulus: req.body.tahun_lulus,
                tanggal_yudisium: req.body.tanggal_yudisium,
                ipk: req.body.ipk,
                lama_studi: req.body.lama_studi,
                nilai_toefl: req.body.nilai_toefl,
                studi_lanjut: req.body.studi_lanjut,
                program_studi: req.body.program_studi,
                fakultas: req.body.fakultas
             }

            //validasi menggunakan module fastest-validator
            const validate = v.validate(itemUpdateObj, schema);
            if (validate.length > 0) {
                res.status(400).json(response(400, 'validation failed', validate));
                return;
            }

            //update item
            await Akademik.update(itemUpdateObj, {
                where:{
                    id: req.params.id,
                    users_id: data.userId,
                }
            })

            //mendapatkan data item setelah update
            let itemAfterUpdate = await Akademik.findOne({
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
            let itemGet = await Akademik.findOne({
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

            await Akademik.destroy({
                where:{
                    id: req.params.id,
                    users_id: data.userId,
                }
            });
            const fileName = itemGet.flyerimg;
            const directoryPath = "./uploads/akademik/";

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