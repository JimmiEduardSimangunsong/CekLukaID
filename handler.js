const bcrypt = require('bcrypt');
const { User } = require('./model');
const { Treatment } = require('./model');


const masukhandler = async (req, res) => {
    try {
        const { email, password } = req.payload;

        // Mencari user berdasarkan email
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            return res.response({
                status: 'fail',
                message: 'User tidak ditemukan',
            }).code(400);
        }

        // Cek password
        if (bcrypt.compareSync(password, user.dataValues.password)) {
            return res.response({
                status: 'success',
                message: 'Berhasil login',
            }).code(200);
        } else {
            return res.response({
                status: 'fail',
                message: 'Maaf Password Yang Anda Masukkan salah',
            }).code(400);
        }
    } catch (err) {
        console.error(err);
        return res.response({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
        }).code(500);
    }
};

const daftarhandler = async (req, res) => {
    try {
        const { email, password } = req.payload;

        const excistingUser = await User.findOne({
            where: {
                email,
            },
        });

        if (excistingUser) {
            return res.response({
                status: 'fail',
                message: 'Email sudah digunakan',
            }).code(400);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            email: email,
            password: hashPassword,
        });

        return { message: "Registrasi Berhasil" };
    } catch (err) {
        console.log(err);
        return res.response({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
        }).code(500);
    }
};

const penagananhandler = async (req, res) => {
    try {
        const { predictionText, answerQuestion1, answerQuestion2 } = req.payload;

        let woundTypeId;
        switch (predictionText) {
            case 'Luka Sayat':
                if (answerQuestion1 === 'Iya' && answerQuestion2 === 'Tidak') {
                    woundTypeId = 1;
                } else if (answerQuestion1 === 'Tidak' && answerQuestion2 === 'Iya') {
                    woundTypeId = 2;
                } else if (answerQuestion1 === 'Tidak' && answerQuestion2 === 'Tidak') {
                    woundTypeId = 3;
                } else if (answerQuestion1 === 'Iya' && answerQuestion2 === 'Iya') {
                    woundTypeId = 4;
                }
                break;

            case 'Luka Bakar':
                if (answerQuestion1 === 'Iya' && answerQuestion2 === 'Tidak') {
                    woundTypeId = 5;
                } else if (answerQuestion1 === 'Tidak' && answerQuestion2 === 'Iya') {
                    woundTypeId = 6;
                } else if (answerQuestion1 === 'Tidak' && answerQuestion2 === 'Tidak') {
                    woundTypeId = 7;
                } else if (answerQuestion1 === 'Iya' && answerQuestion2 === 'Iya') {
                    woundTypeId = 8;
                }
                break;

            case 'Luka Lecet':
                if (answerQuestion1 === 'Iya' && answerQuestion2 === 'Tidak') {
                    woundTypeId = 9;
                } else if (answerQuestion1 === 'Tidak' && answerQuestion2 === 'Iya') {
                    woundTypeId = 10;
                } else if (answerQuestion1 === 'Tidak' && answerQuestion2 === 'Tidak') {
                    woundTypeId = 11;
                } else if (answerQuestion1 === 'Iya' && answerQuestion2 === 'Iya') {
                    woundTypeId = 12;
                }
                break;

            case 'Luka Tusuk':
                if (answerQuestion1 === 'Iya' && answerQuestion2 === 'Tidak') {
                    woundTypeId = 13;
                } else if (answerQuestion1 === 'Tidak' && answerQuestion2 === 'Iya') {
                    woundTypeId = 14;
                } else if (answerQuestion1 === 'Tidak' && answerQuestion2 === 'Tidak') {
                    woundTypeId = 15;
                } else if (answerQuestion1 === 'Iya' && answerQuestion2 === 'Iya') {
                    woundTypeId = 16;
                }
                break;


            default:
                return res.response({
                    status: 'fail',
                    message: 'Invalid predictionText',
                }).code(400);
        }

        console.log('woundTypeId:', woundTypeId);
        const treatmentData = await Treatment.findByPk(woundTypeId, {
            attributes: ['penangananawal', 'rekomendasiobat'],
        });

        console.log('treatmentData:', treatmentData);

        if (!treatmentData) {
            return res.response({
                status: 'fail',
                message: 'Treatment data not found',
            }).code(400);
        }

        return res.response({
            status: 'success',
            message: 'Treatment data retrieved successfully',
            data: {
                penangananawal: treatmentData.penangananawal,
                rekomendasiobat: treatmentData.rekomendasiobat,
            },
        }).code(200);
    } catch (err) {
        console.error(err);
        return res.response({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
        }).code(500);
    }
};

module.exports = { masukhandler, daftarhandler, penagananhandler };



