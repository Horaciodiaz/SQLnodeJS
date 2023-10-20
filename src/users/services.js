const { pool } = require('../database/index');

const TABLE = 'users';


const getAll = async () => {
    const { rows } = await pool.query(`select * from "${TABLE}"`);
    return rows;
}
const getUser = async (id) => {
    const { rows } = await pool.query(`select * from "${TABLE}" where "userID"=$1`, [id]);
    return rows[0];
}
const createUser = async (user) => {
    const { rows } = await pool.query(`insert into "${TABLE}"(
        "userID",
        "userName",
        "userEmail",
        "userPhone") 
        values ($1, $2, $3, $4) 
        RETURNING *`, Object.values(user));
    return rows[0];
}
const updateUser = async (user, id) => {
    try {
        const preUser = getUser(id);
        if(preUser){
            const { rows } = await pool.query(`UPDATE ${TABLE} 
                SET "userName" = $1,
                    "userEmail" = $2, 
                    "userPhone" = $3 
                WHERE "userID" = ${id}
                RETURNING *`, Object.values(user));
            return rows[0];
        }
        else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const deleteUser = async (id) => {
    try {
        const user = getUser(id);
        if(user){
            const { rows } = await pool.query(`DELETE FROM ${TABLE}
            WHERE "userID" = $1
            RETURNING *`, [id])
            return rows[0];
        }
        else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports.UserService = {
    getAll,
    getUser,
    createUser,
    updateUser,
    deleteUser
}