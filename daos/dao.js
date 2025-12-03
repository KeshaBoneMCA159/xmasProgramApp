// Step 11 create file to connect all of the dao files
const daoCommon = require('./common/daoCommon')

const programDao = {
    ...daoCommon,
    ...require('./api/programDao') 
}



module.exports = {
    programDao
}