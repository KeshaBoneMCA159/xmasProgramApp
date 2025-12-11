// Step 25 connect to the database
const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const actorDao = {
    table: 'actor', 

    findAllActors: (res) => {
        const sql = `SELECT * FROM actor`; 

        con.execute(
            sql,
            (error, rows) => {
                queryAction(res, error, rows)
            }
        )
    },

    // This method is for finding the *programs* an actor is in
    findProgramsByActorId: (res, id) => {
        
        // Use a JOIN query to find all programs for a specific actor ID
        const sql = `
            SELECT p.program_id, p.title, p.descr, p.yr_released, p.runtime, p.img_url
            FROM program p
            JOIN program_to_actor pta ON p.Program_id = pta.Program_id
            WHERE pta.actor_id = ?`;

        con.execute(
            sql,
            [id],
            (error, rows) => {
                queryAction(res, error, rows)
            }
        )
    }
}

module.exports = actorDao
