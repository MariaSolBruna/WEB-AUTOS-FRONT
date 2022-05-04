const pool = require("../database");
const md5 = require("md5");

const getUser = async (user, pass) => {
    const query = "select * from authusers where userName = ? and userPass = ?";
    const row = await pool.query(query, [user, md5(pass)]);
    return row[0];
};

const addUser = async (data) => {
    const query = "INSERT INTO authusers SET ?";
    const row = await pool.query(query, [data]);
    console.log(row);
    return row;
};


module.exports = {
    getUser,
    addUser
};