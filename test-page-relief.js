const dalNoSQL = require('./DAL/no-sql.js');

var theReliefEffortCallback = function(err, theResultFromTheQuery) {
    if (err)
        return console.log(err.message)
    console.log(JSON.stringify(theResultFromTheQuery.rows,null, 2))

}

const sortBy = 'reliefEffortsPhaseName'
const startkey = ''
const limit = 2

dalNoSQL.listReliefEfforts(sortBy, startkey, limit, theReliefEffortCallback)

//
// const sortBy = 'reliefEffortPhaseName'
// const startkey = ""
// const limit = 2
//
// dalNoSQL.listReliefEfforts(sortBy, startkey, limit, theReliefEffortCallback)
