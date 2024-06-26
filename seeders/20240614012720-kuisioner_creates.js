'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('kuisioners', [
      // pertanyaan 1
      {
        kode_pertanyaan: 'Q1_01',
        pertanyaan: 'Jelaskan status anda saat ini ?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 2
      {
        kode_pertanyaan: 'Q1_02',
        pertanyaan: 'Apakah Anda telah mendapatkan pekerjaan <= 6 bulan / termasuk bekerja sebelum lulus ?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 3
      {
        kode_pertanyaan: 'Q1_03',
        pertanyaan: 'Dalam berapa bulan Anda mendapatkan pekerjaan ?',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 4
      {
        kode_pertanyaan: 'Q1_04',
        pertanyaan: 'Berapa rata-rata pendapatan Anda per bulan ? (take home pay) ?',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 5
      {
        kode_pertanyaan: 'Q1_05',
        pertanyaan: 'Dimana lokasi tempat Anda bekerja? (Provinsi)',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 6
      {
        kode_pertanyaan: 'Q1_06',
        pertanyaan: 'Dimana lokasi tempat Anda bekerja? (kabupaten)',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 7
      {
        kode_pertanyaan: 'Q1_07',
        pertanyaan: 'Apa jenis perusahaan/instansi/institusi tempat Anda bekerja sekarang?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 8
      {
        kode_pertanyaan: 'Q1_08',
        pertanyaan: 'Apa nama perusahaan/kantor tempat Anda bekerja?',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 9
      {
        kode_pertanyaan: 'Q1_09',
        pertanyaan: 'Bila berwiraswasta, apa posisi/jabatan Anda saat ini?',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 10
      {
        kode_pertanyaan: 'Q1_10',
        pertanyaan: 'Apa tingkat tempat kerja Anda?',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 11
      {
        kode_pertanyaan: 'Q1_11',
        pertanyaan: 'Pertanyaan studi lanjut: Sumber Biaya',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 12
      {
        kode_pertanyaan: 'Q1_12',
        pertanyaan: 'Pertanyaan studi lanjut : Perguruan Tinggi (Isi dengan kode PT sesuai Dikti di https://pddikti.kemdikbud.go.id) (isi dengan tanda (-) bagi yang tidak studi lanjut)',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 13
      {
        kode_pertanyaan: 'Q1_13',
        pertanyaan: 'Pertanyaan studi lanjut : Program Studi (Isi dengan kode Prodi PT sesuai Dikti dihttps://pddikti.kemdikbud.go.id) (isi dengan tanda (-) bagi yang tidak studi lanjut)',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 14
      {
        kode_pertanyaan: 'Q1_14',
        pertanyaan: 'Pertanyaan studi lanjut : Tanggal masuk (dd/mm/yyyy) (isi dengan tanda (-) bagi yang tidak studi lanjut)',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 15
      {
        kode_pertanyaan: 'Q1_15',
        pertanyaan: 'Sebutkan sumber dana dalam pembiayaan kuliah?',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 16
      {
        kode_pertanyaan: 'Q1_16',
        pertanyaan: 'Seberapa erat hubungan antara bidang studi dengan pekerjaan Anda?',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // pertanyaan 17
      {
        kode_pertanyaan: 'Q1_17',
        pertanyaan: 'Tingkat pendidikan apa yang paling tepat/sesuai untuk pekerjaan Anda saat ini?',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },



      // Bagian 2 pertanyaan 1
      {
        kode_pertanyaan: 'Q2_01',
        pertanyaan: 'Etika',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 2 pertanyaan 2
      {
        kode_pertanyaan: 'Q2_02',
        pertanyaan: 'Keahlian berdasarkan bidang ilmu',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 2 pertanyaan 3
      {
        kode_pertanyaan: 'Q2_03',
        pertanyaan: 'Bahasa Inggris',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 2 pertanyaan 4
      {
        kode_pertanyaan: 'Q2_04',
        pertanyaan: 'Penggunaan teknologi informasi',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 2 pertanyaan 5
      {
        kode_pertanyaan: 'Q2_05',
        pertanyaan: 'Komunikasi',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 2 pertanyaan 6
      {
        kode_pertanyaan: 'Q2_06',
        pertanyaan: 'Kerja sama tim',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 2 pertanyaan 7
      {
        kode_pertanyaan: 'Q3_07',
        pertanyaan: 'Pengembangan diri',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },


      // Bagian 3 pertanyaan 1
      {
        kode_pertanyaan: 'Q3_01',
        pertanyaan: 'Etika',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 3 pertanyaan 2
      {
        kode_pertanyaan: 'Q3_02',
        pertanyaan: 'Keahlian berdasarkan bidang ilmu',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 3 pertanyaan 3
      {
        kode_pertanyaan: 'Q3_03',
        pertanyaan: 'Bahasa Inggris',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 3 pertanyaan 4
      {
        kode_pertanyaan: 'Q3_04',
        pertanyaan: 'Penggunaan teknologi informasi',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 3 pertanyaan 5
      {
        kode_pertanyaan: 'Q3_05',
        pertanyaan: 'Komunikasi',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 3 pertanyaan 6
      {
        kode_pertanyaan: 'Q3_06',
        pertanyaan: 'Kerja sama tim',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 3 pertanyaan 7
      {
        kode_pertanyaan: 'Q3_07',
        pertanyaan: 'Pengembangan diri',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Bagian 4 pertanyaan 1
      {
        kode_pertanyaan: 'Q4_01',
        pertanyaan: 'Kompetensi/keahlian spesifik yang dikembangkan setelah lulus...',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 2
      {
        kode_pertanyaan: 'Q4_02',
        pertanyaan: 'Menurut Anda seberapa besar penekanan pada metode pembelajaran PERKULIAHAN dilaksanakan di program studi Anda?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 3
      {
        kode_pertanyaan: 'Q4_03',
        pertanyaan: 'Menurut Anda seberapa besar penekanan pada metode pembelajaran DEMONTRASI dilaksanakan di program studi Anda?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 4
      {
        kode_pertanyaan: 'Q4_04',
        pertanyaan: 'Menurut Anda seberapa besar penekanan pada metode pembelajaran PASTISIPASI dalam proyek riset dilaksanakan di program studi Anda?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 5
      {
        kode_pertanyaan: 'Q4_05',
        pertanyaan: 'Menurut Anda seberapa besar penekanan pada metode pembelajaran MAGANG dilaksanakan di program studi Anda?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 6
      {
        kode_pertanyaan: 'Q4_06',
        pertanyaan: 'Menurut Anda seberapa besar penekanan pada metode pembelajaran PRAKTIKUM dilaksanakan di program studi Anda?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 7
      {
        kode_pertanyaan: 'Q4_07',
        pertanyaan: 'Menurut Anda seberapa besar penekanan pada metode pembelajaran KERJA LAPANGAN yang dilaksanakan di program studi Anda?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 8
      {
        kode_pertanyaan: 'Q4_08',
        pertanyaan: 'Menurut Anda seberapa besar penekanan pada metode pembelajaran DISKUSI yang dilaksanakan di program studi Anda?',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 9
      {
        kode_pertanyaan: 'Q4_09',
        pertanyaan: 'Kapan Anda mulai mencari pekerjaan? (Mohon pekerjaan sambilan tidak dimasukkan)',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 10
      {
        kode_pertanyaan: 'Q4_10',
        pertanyaan: 'Sebutkan berapa bulan (sebulum lulus/sesudah lulus) Anda mulai mencari pekerjaan? Tulis dengan angka.',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 11
      {
        kode_pertanyaan: 'Q4_11',
        pertanyaan: 'Bagaimana Anda mencari pekerjaan tersebut? Jawaban bisa lebih dari satu.',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 12
      {
        kode_pertanyaan: 'Q4_12',
        pertanyaan: 'Berapa perusahaan/instansi/institusi yang sudah Anda lamar (lewat surat atau e-mail) sebelum Anda memeroleh pekerjaan pertama? (isi dengan angka)',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 13
      {
        kode_pertanyaan: 'Q4_13',
        pertanyaan: 'Berapa banyak perusahaan/instansi/institusi yang merespons lamaran Anda? (isi dengan angka)',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 14
      {
        kode_pertanyaan: 'Q4_14',
        pertanyaan: 'Berapa banyak perusahaan/instansi/institusi yang mengundang Anda untuk wawancara? (isi dengan angka)',
        jenis_pertanyaan: 'Single',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 15
      {
        kode_pertanyaan: 'Q4_15',
        pertanyaan: 'Apakah Anda aktif mencari pekerjaan dalam 4 minggu terakhir? Pilihlah Satu Jawaban',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Bagian 4 pertanyaan 16
      {
        kode_pertanyaan: 'Q4_16',
        pertanyaan: 'Jika menurut Anda pekerjaan Anda saat ini tidak sesuai dengan pendidikan Anda, mengapa Anda mengambilnya? Jawaban bisa lebih dari satu',
        jenis_pertanyaan: 'Multi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      

    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('kuisioners', null, {});
  }
};