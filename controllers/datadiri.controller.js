//kode dari file item.controller.js

//import helper response formatter
const { where, or } = require('sequelize');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { response} = require('../helpers/response.formatter');

//import model admin
const { User, Datadiri, Akademik, Loker } = require('../models');

//validasi
const Validator = require("fastest-validator");
const db = require('../models');
const v = new Validator();

module.exports = {

    //membuat item
    createItem : async (req,res) => {
        // console.log("request file: ",req.file);
        try {
            
            //membuat schema untuk validasi
            const schema = {
                nim: {
                    type: "string",
                    min: 5,
                }
            }

            //buat object item
            if (req.file) {
                
                const fileSize = req.file.size;
                const fileName = req.file.filename;
                const url = req.file.path;
                if (fileSize > 25000) {
                    return res.status(402).json(response(402,'file terlalu besar'));
                }
                let datadiriCreateObj = {
                    users_id: data.userId,
                    no_alumni: req.body.no_alumni,
                    nim: req.body.nim,
                    nama: req.body.nama,
                    jenis_kelamin: req.body.jenis_kelamin,
                    alamat: req.body.alamat,
                    kode_pos: req.body.kode_pos,
                    tempat_lahir: req.body.tempat_lahir,
                    tanggal_lahir: req.body.tanggal_lahir,
                    no_hp: req.body.no_hp,
                    status: req.body.status,
                    tentang: req.body.tentang,
                    foto: fileName,
                    url: url
                }
    
                // console.log(datadiriCreateObj);
                //validasi menggunakan module fastest-validator
                const validate = v.validate(datadiriCreateObj, schema);
                if (validate.length > 0) {
                    res.status(400).json(response(400, 'validation failed', validate));
                    return;
                }
                let userGet = await Datadiri.findOne({
                    where : {
                        users_id : data.userId
                    }
                });
                console.log(datadiriCreateObj.nim)
                let itemGet = await Datadiri.findOne({
                    where : {
                        no_alumni : datadiriCreateObj.no_alumni,
                        users_id : datadiriCreateObj.users_id
                    }
                })
                console.log("ID ITEM: ",itemGet);
                if (itemGet === null || userGet === null) {
                    console.log("create: ");
                    //buat item
                    let datadiriCreate = await Datadiri.create(datadiriCreateObj);
    
                    //response menggunakan helper response.formatter
                    res.status(200).json(response(200, 'success create item', datadiriCreate));
                    
                }else{
                    console.log("update: ");
                    let datadiriUpdate = await Datadiri.update(datadiriCreateObj, {
                        where:{
                            id: itemGet.id,
                            // users_id: data.userId,
                        }
                    });
                   
                    res.status(201).json(response(201, 'success update item', datadiriUpdate));
                
                }
            } else {
                let datadiriCreateObj = {
                    users_id: data.userId,
                    no_alumni: req.body.no_alumni,
                    nim: req.body.nim,
                    nama: req.body.nama,
                    jenis_kelamin: req.body.jenis_kelamin,
                    alamat: req.body.alamat,
                    kode_pos: req.body.kode_pos,
                    tempat_lahir: req.body.tempat_lahir,
                    tanggal_lahir: req.body.tanggal_lahir,
                    no_hp: req.body.no_hp,
                    status: req.body.status,
                    tentang: req.body.tentang,
                    foto: 'avatar.jpg',
                    url: null,
                    is_kuisioner: req.body.is_kuisioner,
                    is_verified: req.body.is_verified
                }
    
                // console.log(datadiriCreateObj);
                //validasi menggunakan module fastest-validator
                const validate = v.validate(datadiriCreateObj, schema);
                if (validate.length > 0) {
                    res.status(400).json(response(400, 'validation failed', validate));
                    return;
                }
                let userGet = await Datadiri.findOne({
                    where : {
                        users_id : data.userId
                    }
                });
                console.log(datadiriCreateObj.nim)
                let itemGet = await Datadiri.findOne({
                    where : {
                        nim : datadiriCreateObj.nim,
                        no_alumni : datadiriCreateObj.no_alumni
                    }
                })
                console.log("ID ITEM: ",itemGet);
                if (itemGet === null) {
                    console.log("create: ");
                    //buat item
                    let datadiriCreate = await Datadiri.create(datadiriCreateObj);
    
                    //response menggunakan helper response.formatter
                    res.status(200).json(response(200, 'success create item', datadiriCreate));
                    
                }else{
                    console.log("update: ");
                    let datadiriUpdate = await Datadiri.update(datadiriCreateObj, {
                        where:{
                            id: itemGet.id,
                            // users_id: data.userId,
                        }
                    });
                   
                    res.status(201).json(response(201, 'success update item', datadiriUpdate));
                
                }
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
            let itemGets = await Datadiri.findAll({
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

    getAll : async (req,res) => {
        try {
            //mendapatkan data semua item
            let itemGets = await db.sequelize.query("SELECT users.id, users.id as users_id, users.name, users.email, users.password, users.role, datadiris.id as datadiri_id, datadiris.nim as nim, datadiris.no_alumni, datadiris.no_hp as no_hp, datadiris.is_kuisioner as kuis, datadiris.is_verified as is_verified, akademiks.angkatan, akademiks.tahun_lulus, akademiks.tanggal_yudisium as tanggal_lulus, akademiks.program_studi as prodi FROM `users` LEFT JOIN datadiris ON users.id = datadiris.users_id INNER JOIN akademiks ON users.id = akademiks.users_id ORDER BY users.id ASC", { type: Sequelize.QueryTypes.SELECT });
                //menampilkan admin yang membuat item, karena kita sudah membuat relasi
                // include: [{
                //     model: Datadiri,
                //     include: [{
                //         model: Akademik,
                //     }],
                // }],
                // attributes: [['id','users_id'], ['name','nama_alumni']]
                // include : {
                //     model : Datadiri,
                // }
            // });

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
            let itemGet = await Datadiri.findAll({
                where : {
                    users_id : req.params.id,
                    // nim : req.params.nim
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

    getItemByIdAll : async (req,res) => {
        const id = req.params.id;
        try{
            //mendapatkan data item berdasarkan id
            let itemGet = await db.sequelize.query("SELECT  users.id, users.id as users_id, users.name, users.email, users.password, users.role, datadiris.id as datadiri_id, datadiris.nim as nim, datadiris.no_alumni, datadiris.no_hp as no_hp, datadiris.is_kuisioner as kuis, datadiris.is_verified as is_verified, datadiris.foto, datadiris.tempat_lahir, datadiris.tanggal_lahir, datadiris.alamat, akademiks.angkatan, akademiks.tahun_lulus, akademiks.tanggal_yudisium as tanggal_lulus, akademiks.program_studi as prodi, pekerjaans.instansi FROM `users` LEFT JOIN datadiris ON users.id = datadiris.users_id INNER JOIN akademiks ON users.id = akademiks.users_id INNER JOIN pekerjaans ON users.id = pekerjaans.users_id WHERE users.id = "+id+" ORDER BY users.id ASC", { type: Sequelize.QueryTypes.SELECT });
            // let itemGet = await Datadiri.findAll({
            //     where : {
            //         users_id : req.params.id,
            //         // nim : req.params.nim
            //     },
            //     //menampilkan admin yang membuat item, karena kita sudah membuat relasi 
            //     include : {
            //         model : User,
            //     }
            // });

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
            const nim = req.params['start'];
            const nama = req.params['end'];
            //mendapatkan data item berdasarkan id
            let itemGet = await Datadiri.findAll({
                where : {
                    
                    nim: {
                        [Op.like]: `%${nim}%`,
                    },
                    nama : {
                        [Op.like]: `%${nama}%`,
                    },
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

    //mendapatkan data item berdasarkan id
    getItemSearch : async (req,res) => {
        try{
            const nim = req.params.nim;
            const nama = req.params.nama;
            //mendapatkan data item berdasarkan id
            let itemGet = await db.sequelize.query("SELECT users.id, users.id as users_id, users.name, datadiris.nama as nama, users.email, users.password, users.role, datadiris.nim as nim, datadiris.no_alumni, datadiris.no_hp as no_hp, datadiris.is_kuisioner as kuis, datadiris.alamat, datadiris.is_verified as is_verified, akademiks.angkatan, akademiks.tahun_lulus, akademiks.tanggal_yudisium as tanggal_lulus, akademiks.program_studi as prodi, akademiks.fakultas as fakultas FROM `users` LEFT JOIN datadiris ON users.id = datadiris.users_id INNER JOIN akademiks ON users.id = akademiks.users_id WHERE datadiris.nim LIKE '%"+nim+"%' AND datadiris.nama LIKE '%"+nama+"%' ORDER BY users.id ASC", { type: Sequelize.QueryTypes.SELECT });
            
            // let itemGet = await Datadiri.findOne({
            //     where : {
            //         nim : req.params.nim,
            //         nama : req.params.nama,
            //     },
            //     //menampilkan admin yang membuat item, karena kita sudah membuat relasi 
            //     include : {
            //         model : User,
            //     }
            // });

            //cek jika item tidak ada
            if(!itemGet){
                res.status(404).json(response(404,'Alumni tidak ditemukan! Mohon dengan kata kunci lain!'));
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
        console.log("item verifikasi: ", req.body.is_verified);
        try {
            //mendapatkan data item untuk pengecekan
            let itemGet = await Datadiri.findOne({
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
            // const schema = {
            //     nim: {
            //         type: "string",
            //         min: 5,
            //     }
            // }

            // if (req.file === null) {
            //     const fileSize = req.file.size;
            //     const fileName = req.file.filename;
            //     const url = req.file.path;
            //     if (fileSize > 25000) {
            //         return res.status(402).json(response(402,'file terlalu besar'));
            //     }
            // } else{
            //     let fileName = itemGet.foto;
            // }

             //buat object item
            let itemUpdateObj = {
                no_alumni: req.body.no_alumni,
                nim: req.body.nim,
                nama: req.body.nama,
                jenis_kelamin: req.body.jenis_kelamin,
                alamat: req.body.alamat,
                kode_pos: req.body.kode_pos,
                tempat_lahir: req.body.tempat_lahir,
                tanggal_lahir: req.body.tanggal_lahir,
                no_hp: req.body.no_hp,
                status: req.body.status,
                tentang: req.body.tentang,
                foto: itemGet.foto,
                url: itemGet.url,
                is_kuisioner: req.body.is_kuisioner,
                is_verified: req.body.is_verified
            }
            

            //validasi menggunakan module fastest-validator
            // const validate = v.validate(itemUpdateObj, schema);
            // if (validate.length > 0) {
            //     res.status(400).json(response(400, 'validation failed', validate));
            //     return;
            // }

            //update item
            await Datadiri.update(itemUpdateObj, {
                where:{
                    id: req.params.id,
                    // users_id: data.userId,
                }
            })

            //mendapatkan data item setelah update
            console.log("data userID: ", data.userId);
            let itemAfterUpdate = await Datadiri.findOne({
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
            let itemGet = await Datadiri.findOne({
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

            await Datadiri.destroy({
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

    countAllDataAlumni : async (req,res) => {
        
        try {
            // console.log(req.params['start']);
            console.log(req.params['string']);
            const strValue = req.params['string'];
            if (strValue === 'alumni') {
                let itemGets = await db.sequelize.query("SELECT COUNT(no_alumni) AS alumni_total FROM datadiris", { type: Sequelize.QueryTypes.SELECT });
                return res.status(200).json(response(200,'success get item', itemGets));
            } else if (strValue === 'verifikasi') {
                let itemGets = await db.sequelize.query("SELECT COUNT(no_alumni) AS verifikasi_total FROM datadiris WHERE is_verified = 'no'", { type: Sequelize.QueryTypes.SELECT });
                return res.status(200).json(response(200,'success get item', itemGets));
            } else if (strValue === 'kuisioner') {
                let itemGets = await db.sequelize.query("SELECT COUNT(no_alumni) AS kuisioner_total FROM datadiris WHERE is_kuisioner = 1", { type: Sequelize.QueryTypes.SELECT });
                return res.status(200).json(response(200,'success get item', itemGets));
            } else if (strValue === 'flyer') {
                let itemGets = await db.sequelize.query("SELECT COUNT(id) AS flyer_total FROM lokers", { type: Sequelize.QueryTypes.SELECT });
                return res.status(200).json(response(200,'success get item', itemGets));
            }else if (strValue === 'publikasi') {
                let itemGets = await db.sequelize.query("SELECT COUNT(id) AS publikasi_total FROM lokers WHERE isPublish = 'Publish'", { type: Sequelize.QueryTypes.SELECT });
                return res.status(200).json(response(200,'success get item', itemGets));
            }else{
                res.status(500).json(response(500,'internal server error', err));
                console.log(err);
            }
            // const nama = req.params['end'];
            
        
        res.status(200).json(response(200,'success get item', itemGets));

        } catch (err) {
            res.status(500).json(response(500,'internal server error', err));
            console.log(err);
        }
    },

    updateItemById : async (req, res) => {
        console.log("item verifikasi: ", req.body.is_verified);
        try {
            //mendapatkan data item untuk pengecekan
            let itemGet = await Datadiri.findOne({
                where:{
                    id : req.params.id,
                    users_id: data.userId,
                }
            })

            //cek apakah data item ada
            if(!itemGet){
                res.status(404).json(response(404,'item not found'));
                return;
            }

            let itemUpdateObj = {
                is_kuisioner: 1,
            }
            


            //update item
            await Datadiri.update(itemUpdateObj, {
                where:{
                    id: req.params.id,
                    // users_id: data.userId,
                }
            })

            //mendapatkan data item setelah update
            console.log("data userID: ", data.userId);
            let itemAfterUpdate = await Datadiri.findOne({
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
}