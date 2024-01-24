const bcrypt = require('bcrypt');
const { User } = require('./model');


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
    try{
        const{email,password}=req.payload;

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
            email : email,
            password: hashPassword,
        });

        return { message: "Registrasi Berhasil" };
    }catch (err) {
        console.log(err);
        return res.response({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
        }).code(500);
    }
};

module.exports = {masukhandler,daftarhandler};



