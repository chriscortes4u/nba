const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
//const fetchConfig = require('zero-config');

//var config = fetchConfig(path.join(__dirname, '..'), {dcValue: 'test'});
const urlFormat = require('url').format;
const db = new PouchDB(urlFormat(config.get("couch")));

var dal = {
    listTeam: listTeam,
    listPlayer: listPlayer,
    updatePlayer: updatePlayer,
    updateTeam: updateTeam,
    getTeam: getTeam,
    getPlayer: getPlayer,
    createPlayer: createPlayer,
    createTeam: createTeam,
    deletePlayer: deletePlayer,
    deleteTeam: deleteTeam,
    createView: createView
};
////////////////////////////
//////Utility functions/////
///////////////////////////
function listTeams(sortBy, startkey, limit, callback) {}

var convertPlayer = function(queryRow) {
    queryRow.doc.sortToken = queryRow.key;
    return queryRow.doc;
};

function queryDB(sortBy, startkey, limit, callback) {
    if (typeof startkey == "undefined" || startkey === null) {
        return callback(new Error('Missing search parameter'));
    } else if (typeof limit == "undefined" || limit === null || limit === 0) {
        return callback(new Error('Missing limit parameter'));

    } else {
        limit = startkey === ''
            ? Number(limit)
            : Number(limit) + 1;

        console.log("sortBy:", sortBy, " startkey: ", startkey, " limit: ", limit)

        ////     CALLBACKS
        db.query(sortBy, {
            startkey: startkey,
            limit: limit,
            include_docs: true
        }, function(err, result) {
            if (err)
                return callback(err);
            if (result) {
                // Do we need to skip (remove/shift) the first item
                //  out of the array
                if (startkey !== '' && result.rows.length > 0) {
                    // remove first item
                    result.rows.shift();
                }
                return callback(null, result.rows.map(convertPlayer));
            }
        });
    }
}

function getDocByID(id, callback) {
    // Call to couch retrieving a document with the given _id value.
    if (typeof id == "undefined" || id === null) {
        return callback(new Error('400Missing id parameter'));
    } else {
        //////     CALLBACKS
        db.get(id, function(err, data) {
            if (err)
                return callback(err);
            if (data)
                return callback(null, data);
            }
        );
    }
}

function createView(designDoc, callback) {
    if (typeof designDoc == "undefined" || designDoc === null) {
        return callback(new Error('400Missing design document.'));
    } else {

        ////     CALLBACKS
        db.put(designDoc, function(err, response) {
            if (err)
                return callback(err);
            if (response)
                return callback(null, response);
            }
        );
    }
}

function updateDoc(data, callback) {
    // Call to couch retrieving a document with the given _id value.
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400Missing data for update'));
    } else if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400Missing id property from data'));
    } else if (data.hasOwnProperty('_rev') !== true) {
        return callback(new Error('400Missing rev property from data'));
    } else {

      //////     CALLBACKS
db.put(data, function(err, response) {
    if (err)
        return callback(err);
    if (response)
        return callback(null, response);
    }
);
}
}
function deleteDoc(data, callback) {
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('400Missing data for delete'));
    } else if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400Missing _id property from data'));
    } else if (data.hasOwnProperty('_rev') !== true) {
        return callback(new Error('400Missing _rev property from data'));
    } else {
      //////     CALLBACKS
  db.remove(data, function(err, response) {
      if (err)
          return callback(err);
      if (response)
          return callback(null, response);
      }
  );
}

}

//////////////////////////////////////////////////////////////////////
//                       Teams!
//////////////////////////////////////////////////////////////////////
function getTeam(id, callback) {
  getDocByID(id, callback);


  function listTeam(sortBy, startKey, limit, callback) {

      if (typeof sortBy == "undefined" || sortBy === null) {
          return callback(new Error('Missing search parameter'));
      }

      limit = startKey !== ''
          ? limit + 1
          : limit

      db.query(sortBy, {
          startkey: startKey,
          limit: limit
      }, function(err, data) {
          if (err)
              return callback(err)

          if (startKey !== '') {
              data.rows.shift()
          }

          callback(null, data)
      })
  }

  function updateTeam(data, callback) {
      updateDoc(data, callback);
  }

  function deleteTeam(data, callback) {
      deleteDoc(data, callback);
  }

  function createReliefEffort(data, callback) {
      // Call to couch retrieving a document with the given _id value.
      if (typeof data == "undefined" || data === null) {
          return callback(new Error('400Missing data for create'));
      } else if (data.hasOwnProperty('_id') === true) {
          return callback(new Error('400Unnecessary _d property within data. ' +
              'createPerson() will generate a unique _id'));
      } else if (data.hasOwnProperty('_rev') === true) {
          return callback(new Error('400Unnecessary rev property within data'));
      } else if (data.hasOwnProperty('phase') !== true) {
          return callback(new Error('400Missing phase property within data'));
      } else if (data.hasOwnProperty('name') !== true) {
          return callback(new Error('400Missing name property within data'));
      } else if (data.hasOwnProperty('teamID') !== true) {
          return callback(new Error('400Missing teamID property within data'));
      } else {
          data.active = true;
          data.type = 'team';
          data._id = 'team_' + data.teamID.replace(/ /g, "_").replace(/\./g, "") + '_' + data.name.replace(/ /g, "_");

          /////CALLBACK//////
          db.put(data, function(err, response) {
              if (err) return callback(err);
              if (response) return callback(null, response);
          });
      }
  }


  ///////////////////////////////////////////////////////////////////////////
  //                              Player
  ///////////////////////////////////////////////////////////////////////////
  function getPlayer(id, callback) {
      getDocByID(id, callback);
  }

  function listPlayer(sortBy, startKey, limit, callback) {
    queryDB(sortBy, startKey, limit, callback);

      //validate our params
      if (typeof sortBy == "undefined" || sortBy === null) {
          return callback(new Error('Missing search parameter'));
      }

      limit = startKey !== ''
          ? limit + 1
          : limit

      db.query(sortBy, {
          startkey: startKey,
          limit: limit
      }, function(err, data) {
          if (err)
              return callback(err)

          if (startKey !== '') {
              data.rows.shift()
          }

          callback(null, data)
      })
  }


  function updatePlayer(data, callback) {
      updateDoc(data, callback);
  }

  function deletePlayer(data, callback) {
      deleteDoc(data, callback);
  }

  function createPlayer(data, callback) {
    // Call to couch retrieving a document with the given _id value.
    if (typeof data === "undefined" || data === null) {
        return callback(new Error('400Missing data for create'));
    } else if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('400Unnecessary id property within data.'));
    } else if (data.hasOwnProperty('_rev') === true) {
        return callback(new Error('400Unnecessary rev property within data'));
    } else if (data.hasOwnProperty('lastName') !== true) {
        return callback(new Error('400Missing lastName property within data'));
    } else if (data.hasOwnProperty('firstName') !== true) {
        return callback(new Error('400Missing firstName property within data'));
    } else if (data.hasOwnProperty('email') !== true) {
        return callback(new Error('400Missing email property within data'));
    } else {

        data.active = true;
        data.type = 'player';
        data._id = 'player_' + data.lastName + data.firstName;

        //////     CALLBACKS
        db.put(data, function(err, response) {
            if (err)
                return callback(err);
            if (response)
                return callback(null, response);
            }
        );
    }
}



module.exports = dal;
