// Step 10 connect to the database
const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const programDao = {
    // Step 11 create methods specific to the program table
     table: 'program',
    // Step 24 write query methods specifically for the movie table
    findProgramInfo: (res, table)=> {

        const sql = `SELECT p.program_id, p.title, p.runtime, p.yr_released, p.frmt_id, p.pd_id, p.img_url, p.descr, p.sp_id,

    GROUP_CONCAT(DISTINCT CONCAT(a.fName, ' ', a.lName) SEPARATOR ', ') AS actors,
    GROUP_CONCAT(DISTINCT CONCAT(d.fName, ' ', d.lName) SEPARATOR ', ') AS directors,
    GROUP_CONCAT(DISTINCT CONCAT(pd.fName, ' ', pd.lName) SEPARATOR ', ') AS producers,
        CASE 
            WHEN p.psnl_rting IS NULL THEN ''
            ELSE p.psnl_rting
            END AS personal_rating,
        CASE 
            WHEN p.pgr_rting IS NULL THEN ''
            ELSE p.pgr_rting
            END AS program_rating
FROM program AS p
    LEFT JOIN program_to_actor AS pta ON p.program_id = pta.program_id
    LEFT JOIN actor AS a ON pta.actor_id = a.actor_id
    LEFT JOIN program_to_director AS ptd ON p.program_id = ptd.program_id
    LEFT JOIN director AS d ON ptd.director_id = d.director_id
    LEFT JOIN program_to_producer AS ptp ON p.program_id = ptp.program_id
    LEFT JOIN producer AS pd ON ptp.pd_id = pd.pd_id
GROUP BY p.program_id,
    p.title,
    p.runtime,
    p.descr,
    p.yr_released,
    p.img_url,
    p.frmt_id,
    p.pd_id,
    p.sp_id,
    p.psnl_rting,
    p.pgr_rting
ORDER BY p.program_id;`

         con.execute(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows,)
            }
        )
    },

    findById: function(res, id) {
       
        const sql = `SELECT * FROM program WHERE program_id = ?`; 
        con.execute(
            sql,
            [id],
            (error, rows) => {
                queryAction(res, error, rows)
            }
        )
    },
    
     findByRating: (res, ratingString)=> {
        con.execute(
            `SELECT * FROM program WHERE pgr_rting = ?`,
            [ratingString],
            (error, rows)=> {
                queryAction(res, error, rows)
            }
        )
    }
}

module.exports = programDao