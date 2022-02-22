import query from "../db/connection.js";

//------------------------------
// AppUser Record will look like:
//------------------------------
// id serial PRIMARY KEY,
// app_user_first_name VARCHAR (30) DEFAULT NULL,
// app_user_last_name VARCHAR (30) DEFAULT NULL,
// app_user_email VARCHAR (30) NOT NULL,
// app_user_profile_pic_link VARCHAR (200),
// create_date_time  TIMESTAMP NOT NULL DEFAULT CURRENT_DATE

export async function getAllAppUsers() {
    const sqlString = `SELECT *
        FROM app_user au
        ORDER BY au.id DESC;`;

    console.log(`DEBUG: sqlString = ${sqlString}`);

    const data = await query(sqlString);

    console.log(`DEBUG: data.rows = ${data.rows}`);

    return data.rows;
}
