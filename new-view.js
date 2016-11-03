const dalNoSQL = require('./DAL/no-sql.js');

var designDoc = {
    _id: '_design/Team',
    views: {
        'team': {
            map: function(doc) {
                if (doc.type === 'team') {
                    emit(doc.name);
                }
            }.toString()
        }
    }
}

var designDoc2 = {
    _id: '_design/cityView',
    views: {
        'cityView': {
            map: function(doc) {
                if (doc.type === 'team') {
                    emit([doc.city, doc._id]
                    ),{
                        "name": doc.name,
                        "div": doc.div
                    }
                }
            }.toString()
        }
    }
}

var designDoc3 = {
    _id: '_design/teamChampionship',

    views: {
        'teamChampionshipView': {
            map: function(doc) {
                if (doc.type === 'team') {
                    emit([doc.championships + doc._id],{
                      "name": doc.name,
                      "championships": doc.championships,
                      "city": doc.city
                    });
                }
            }.toString()
        }
    }
}


var designDoc4 = {
    _id: '_design/teamDivison',
    views: {
        'teamDivison': {
            map: function(doc) {
                if (doc.type === 'relief') {
                    emit([
                        doc.phase, doc.name
                    ], {
                        "teamName": doc.name,
                        "Div": doc.div,
                        "yearFounded": doc.year,
                    });
                }
            }.toString()
        }
    }
}


dalNoSQL.createView(designDoc, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})

dalNoSQL.createView(designDoc2, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})


dalNoSQL.createView(designDoc3, function callback(err, data) {
    if (err) return console.log(err);
    if (data) {
        console.log(data);
    }
})

dalNoSQL.createView(designDoc4, function callback(err, data) {
    if (err)
        return console.log(err);
    if (data) {
        console.log(data);
    }
})
