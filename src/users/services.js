const { pool } = require('../database/index');

const TABLE = 'users';


const getAll = async () => {
    const { rows } = await pool.query(`select * from "${TABLE}"`);
    return rows.filter((user) => user.userState);
}
const getUser = async (tag) => {
    const { rows } = await pool.query(`select * from "${TABLE}" where "userTag"=$1`, [tag]);
    return rows[0];
}
const createUser = async (user) => {
    const { rows } = await pool.query(`insert into "${TABLE}"(
        "userName",
        "userEmail",
        "userPhone",
        "userTag") 
        values ($1, $2, $3, $4) 
        RETURNING *`, Object.values(user));
    return rows[0];
}
const updateUser = async (user, tag) => {
    try {
        const preUser = getUser(tag);
        if(preUser){
            const { rows } = await pool.query(`UPDATE ${TABLE} 
                SET "userName" = $1,
                    "userEmail" = $2, 
                    "userPhone" = $3
                WHERE "userTag" = $4
                RETURNING *`, [...Object.values(user), tag]);
            return rows[0];
        }
        else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
const deleteUser = async (tag) => {
    try {
        const user = getUser(tag);
        if(user){
            const { rows } = await pool.query(`UPDATE ${TABLE}
            SET "userState" = false
            WHERE "userTag" = $1
            RETURNING *`, [tag])
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