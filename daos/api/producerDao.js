// Step 25 connect to the database
const con = require('../../config/dbconfig.safe')
const { queryAction } = require('../../helpers/queryAction')


const producerDao = {
    table: 'producer', 

findAllProducers: (res) => {
        const sql = `SELECT * FROM producer`; 

        con.execute(
            sql,
            (error, rows) => {
                queryAction(res, error, rows)
            }
        )
    },

    // This method is for finding the *programs* a producer is in
    findProgramsByProducerId: (res, id) => {
        
        // Use a JOIN query to find all programs for a specific producer ID
        const sql = `
            SELECT p.program_id, p.title, p.descr, p.yr_released, p.runtime, p.img_url
            FROM program p
            JOIN program_to_producer ptp ON p.program_id = ptp.program_id
            WHERE ptp.pd_id = ?`;

        con.execute(
            sql,
            [id],
            (error, rows) => {
                queryAction(res, error, rows)
            }
        )
    }
}

module.exports = producerDao
