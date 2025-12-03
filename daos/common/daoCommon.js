// Step 8 connect to config database
const con = require('../../config/dbconfig')

const daoCommon = {
    // step 9 create methods that'll query the db
    /**findAll: (req, res, table) => {
        con.execute(`SELECT * FROM ${table};`, (error, rows) => {
            queryAction(res, error, rows, table)
            })
        })
    },*/
}

module.exports = daoCommon // <= the rest of step 8
