// Step 25 connect to the database
const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')


const streaming_PlatformDao = {
    table: 'streaming_platform', 

    findAllStreaming_Platforms: (res) => {
        const sql = `SELECT * FROM streaming_platform`; 

        con.execute(
            sql,
            (error, rows) => {
                queryAction(res, error, rows)
            }
        )
    },
    // This method is for finding the *programs* by its streaming platform ID
    findProgramsByStreaming_PlatformId: (res, id) => {
        
        // Use a JOIN query to find all programs for a specific streaming platform ID
        const sql = `
            SELECT p.program_id, p.title, p.descr, p.yr_released, p.runtime, p.img_url
            FROM program p
            JOIN program_to_streaming pts ON p.program_id = pts.program_id
            WHERE pts.sp_id = ?`;

        con.execute(
            sql,
            [id],
            (error, rows) => {
                queryAction(res, error, rows)
            }
        )
    }
}

module.exports = streaming_PlatformDao
