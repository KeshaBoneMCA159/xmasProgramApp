// Step 8 connect to config database
const con = require('../../config/dbconfig')

const daoCommon = {
    // step 9 create methods that'll query the db
    findAll: (req, res, table) => {
        con.query(`SELECT * FROM ${table}`, (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message })
            } else {
                res.json(results)
            }
        })
    }
}

module.exports = daoCommon // <= the rest of step 8
