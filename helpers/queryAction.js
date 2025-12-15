// Helper to handle query action responses
const queryAction =(obj, e, r, t)=> {

    if (!e) { // if no error
        if (r.length === 1) { // then rows length is 1
            obj.json(...r)
        } else {
            obj.json(r)
        }
    } else {
        console.log(`DAO Error: ${e}`)
        obj.json({
            "message": 'error',
            'table': `${t}`,
            'error': e
        })
    }
}

module.exports = {
    queryAction
}