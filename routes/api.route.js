//kode dari file api.route.js

//import route admin pada routes\admin.route.js
const userRoute = require('./user.route');
const datadiriRoute = require('./datadiri.route');
const akademikRoute = require('./akademik.route');
const pekerjaanRoute = require('./pekerjaan.route');
const kuisionerRoute = require('./kuisioner.route');
const prestasiRoute = require('./prestasi.route');
const organisasiRoute = require('./organisasi.route');
const pelatihanRoute = require('./pelatihan.route');
const tracerinstansiRoute = require('./tracerinstansi.route');
const lokerRoute = require('./loker.route');
const hasilkuisioner = require('./hasilkuisioner.route');
const laporantracer = require('./laporantracer.route');

const bodyParser = require('body-parser');



module.exports = function(app,urlApi){
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ extended: true }));
   
    app.use(bodyParser.raw({inflate:true, limit: '1000kb', type: 'application/json'}));
    app.use(urlApi,userRoute);
    app.use(urlApi,datadiriRoute);
    app.use(urlApi,akademikRoute);
    app.use(urlApi,pekerjaanRoute);
    app.use(urlApi,kuisionerRoute);
    app.use(urlApi,prestasiRoute);
    app.use(urlApi,organisasiRoute);
    app.use(urlApi,pelatihanRoute);
    app.use(urlApi,tracerinstansiRoute);
    app.use(urlApi,lokerRoute);
    app.use(urlApi, hasilkuisioner);
    app.use(urlApi, laporantracer);
    
}