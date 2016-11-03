const dalNoSQL = require('./DAL/no-sql.js');

var theListTeamCallback = function(err, theResultFromTheQuery) {
    if (err)
        return console.log(err.message)
    console.log(JSON.stringify(theResultFromTheQuery.rows,null, 2))

}
//
// const sortBy = 'lastNameView'
// const startKey = ''
// const limit = 2
//
// dalNoSQL.listPersons(sortBy, startKey, limit, theListPersonCallback)


const sortBy = 'teamView'
const startkey = ""
const limit = 2

dalNoSQL.listTeam(sortBy, startkey, limit, theListTeamCallback)
