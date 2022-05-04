const pool = require("../database");

const getProducts = async () => {
    try {
        const query = "Select * from listadoautos2";
        const rows = await pool.query(query);
        return rows;

    } catch (error) {
        console.log(error)
    }
};

const registration = async (data) => {
    try {
        const query = "insert into authusers set ?";
        const row = await pool.query(query, [data]);
        return row;
    } catch (error) {
        console.log(error);
    }
};


const modelo = async () => {
    try {
        const query = "Select * from listadoautos2 where Modelo = ?";
        const rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error)
    }
};


module.exports = {
    getProducts,
    registration,
    modelo
};