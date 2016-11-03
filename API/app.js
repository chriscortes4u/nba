var http = require('http');
var express = require('express')
var app = express();
const HTTPError = require('node-http-error');
const port = process.env.PORT || 4000;
//const dal = dalNoSQL == 'nosql' ? require('../DAL/no-sql.js') : require('../DAL/no-sql.js');
const dal = require('../DAL/no-sql.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var jsonParser = bodyParser.json();

///////////////Team//////////////////

app.get('/team/:id', function(req, res, next) {
    const teamID = req.params.id
    console.log(teamID)

    dal.getTeam(teamID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));

        }
        if (data) {
            //      console.log('GET' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(200).send({data});
        }
    })
})

app.post('/team', function(req, res, next) {
    console.log(req.body);

    dal.createTeam(req.body, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('POST' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.put('/team/:id', function(req, res, next) {
    console.log(req.body);

    dal.updateTeam(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            console.log('PUT' + req.path, data)
            res.append('Content-type', 'application/json');
            res.status(201).send(data)
        }
    })
})
app.delete('/team/:id', function(req, res, next) {
    const teamID = req.params.id;
    dal.getTeam(teamID, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err);
            return next(new HTTPError(responseError.status, responseError.message, responseError));
        }
        if (data) {
            dal.deleteTeam(data, function callback(deletederr, deleteddata) {
                if (deletederr) {
                    var responseError = BuildResponseError(deletederr);
                    return next(new HTTPError(responseError.status, responseError.message, responseError));
                }
                if (deleteddata) {
                    console.log('DELETE' + req.path, deleteddata)
                    res.append('Content-type', 'application/json');
                    res.status(201).send(deleteddata);
                }
            })
        }
    })
})
app.get('/team', function(req, res, next){
  const sortByParam = req.query.sortBy || 'team';
  const sortBy = getTeamSortBy(sortByParam, 'nosql')
  const sortToken = req.query.sortToken || "";
  const limit = req.query.limit || 10;

  dal.listTeam(sortBy, sortToken, limit, function callback(err, data) {
    if(err){
      var responseError = BuildResponseError(err);
      return next(new HTTPError(responseError.status, responseError.message, responseError));
    }
    if (data) {
        console.log('GET' + req.path, "query:", req.query, data)
        res.append('Content-type', 'application/json');
        res.status(201).send(data);
    }
  })
})
//////
///////////////Sort function/////////
///////

function getTeamSortBy(type, dalModule) {
    var sortBy;
    var options = {
        'team': function() {
            sortBy = dalModule === 'nosql' ? 'teamView' : 'vPerson';
        },
        'city': function() {
            //email
            sortBy = dalModule === 'nosql' ? 'cityView' : 'vPersonEmail';
        },
      'teamdivison': function() {
          sortBy = dalModule === 'nosql' ? 'teamdivisonView' : 'vPerson';
      }
        'default': function() {
            sortBy = dalModule === 'nosql' ? 'teamView' : 'vPerson';
        }
    };
    // invoke it
    (options[type] || options['default'])();
    // return a String with chosen sort
    return sortBy;
}







//////
///////Error function//////
/////

function BuildResponseError(err) {

  const statuscheck = isNaN(err.message.substring(0, 3)) === true
        ? "400"
        : err.message.substring(0, 3)
    const status = err.status
        ? Number(err.status)
        : Number(statuscheck)
    const message = err.status
        ? err.message
        : err.message.substring(3)
    const reason = message
    const error = status === 400
        ? "Bad Request"
        : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message

    //   { error: 'Bad Request',
    // reason: 'Missing email property within data',
    // name: 'Bad Request',
    // status: 400,
    // message: 'Missing email property within data' }
    //console.log("BuildResponseError-->", errormsg)
    return errormsg
}
