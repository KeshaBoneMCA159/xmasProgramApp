// Step 25 connect to the database
const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const directorDao = {
    table: 'director', 

    // finding the *programs* a director is in
    findProgramsByDirectorId: (res, id) => {
        
        // Use a JOIN query to find all programs for a specific director Id
        const sql = `
            SELECT p.program_id, p.title, p.descr, p.yr_released, p.runtime, p.img_url
            FROM program p
            JOIN program_to_director ptd ON p.program_id = ptd.program_id
            WHERE ptd.director_id = ?`;

        con.execute(
            sql,
            [id],
            (error, rows) => {
                queryAction(res, error, rows)
            }
        )
    },

    countProgramsByDirector: (res, id) => {
        const sql = `
             SELECT COUNT(ptd.program_id) AS program_count, d.fName, d.lName
            FROM director d
            JOIN program_to_director ptd ON d.director_id = ptd.director_id
            WHERE d.director_id = ?
            GROUP BY d.director_id, d.fName, d.lName`;

        con.execute(
            sql,
            [id],
            (error, rows) => {
                queryAction(res, error, rows)
            }
        )
    }
}

module.exports = directorDao
