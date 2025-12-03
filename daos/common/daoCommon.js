// Step 8 connect to config database
const con = require('../../config/dbconfig')

const daoCommon = {
       // Step 9 create methods that'll query the database
    findAll: (req, res, table)=> {
        //.query(sql query, callback func)
        //don't forget .execute 
        con.execute(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table) // <= Step 22 use query action helper
                // if(!error) {
                //     if(rows.length === 1) {
                //         res.json(...rows)
                //     } else {
                //         res.json(rows)
                //     }
                // } else {
                //    console.log(`Dao Error: ${error}`) 
                //    res.json({
                //     "message": 'error',
                //     'table' : `${table}`,
                //     'error': error
                //    })
                // }
            }
        )
    },
}

module.exports = daoCommon // <= the rest of step 8
