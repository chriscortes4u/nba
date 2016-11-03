const dalNoSQL = require('./DAL/no-sql.js');

const teamData = [{
  {
    name:"Hawks",
    city:"Atlanta",
    div:"Southeast",
    yearFounded:"1946",
    championships: {
      number:"1",
      years: "1958"

      }
    },
    {
      name:"Celtics",
      city:"Boston",
      div:"Atlantic",
      yearFounded:"1946",
      championships: {
        number:17,
        years:"1957","1959","1960","1961","1962", "1963", "1964", "1965", "1966", "1968", "1969", "1974", "1976", "1981", "1984", "1986", "2008"
        }
      },
      {
        name:"Nets",
        city:"Brooklyn",
        div:"Atlantic",
        yearFounded:"1967",
        championships: {
          number:0
          years: null
          }
        },
        {
          name:"Hornets",
          city:"Charlotte"
          div:"Southeast",
          yearFounded:"1988",
          championships: {
            number:0
            years: null,
            }
          },
          {
          name:"Bulls",
          city:"Chicago",
          div:"Central",
          yearFounded:"1966",
          championships: {
            number:"6",
            years: "1991", "1992", "1993", "1996", "1997", "1998"
            }
          },
          {
          name:"Cavaliers",
          city:"Cleveland",
          div:"Central",
          yearFounded:"1970",
          championships: {
            number:"1"
            years: "2016"
            }
          },
          {
          name:"Mavericks"
          city:"Dallas",
          div:"Southwest",
          yearFounded:"1980",
          championships: {
            number:"1",
            years: "2011"
            }
          },
          {
          name:"Nuggets",
          city:"Denver",
          div:"Northwest",
          yearFounded:"1967",
          championships: {
            number:"0",
            years: null
            }
          },
          {
          name:"Pistons",
          city:"Detroit",
          div:"Central",
          yearFounded:"1941",
          championships: {
            number:"3",
            years: "1989", "1990", "2004"
            }
          },
          {
          name:"Warriors",
          city:"Golden State",
          div:"Pacific",
          yearFounded:"1946",
          championships: {
            number:"4"
            years: "1947", "1956", "1975", "2015"
            }
          },
          {
          name:"Rockets",
          city:"Houston",
          div:"Southwest",
          yearFounded:"1967",
          championships: {
            number:"2",
            years: "1994","1995"
            }
          },
          {
          name:"Pacers",
          city:"Indiana",
          div:"Central",
          yearFounded:"1967"
          championships: {
            number:"0",
            years: null
            }
          },
          {
          name:"Clippers"
          city:"LA",
          div:"Pacific",
          yearFounded:"1970",
          championships: {
            number:"0",
            years: null
            }
          },
          {
          name:"Lakers",
          city:"LA",
          div:"Pacific",
          yearFounded:"1947",
          championships: {
            number:"16",
            years: ["1949", "1950", "1952", "1953", "1954", "1972", "1980", "1982", "1985", "1987", "1988", "2000", "2001", "2002", "2009", "2010"
            }
          },
          {
          name:"Grizzlies",
          city:"Memphis",
          div:"Southwest"
          yearFounded:"1995"
          championships: {
            number:"0",
            years: null
            }
          },
          {
          name:"Heat",
          city:"Miami",
          div:"Southeast",
          yearFounded:"1988",
          championships: {
            number:"3",
            years: "2006","2012","2013"
            }
          },
          {
          name:"Bucks",
          city:"Milwaukee",
          div:"Central"
          yearFounded:"1968",
          championships: {
            number:"1",
            years: "1971"
            }
          },
          {
          name:"Timberwolves",
          city:"Minnesota",
          div:"Northwest",
          yearFounded:"1989"
          championships: {
            number:"0",
            years: null
            }
          },
          {
          name:"Pelicans",
          city:"New Orleans",
          div:"Southwest",
          yearFounded:"2002"
          championships: {
            number:"0",
            years: null
            }
          },
          {
          name:"Knicks",
          city:"New York",
          div:"Atlantic",
          yearFounded:"1946",
          championships: {
            number:"2",
            years: "1970", "1973"
            }
          },
          {
          name:"Thunder",
          city:"Oklahoma City",
          div:"Northwest",
          yearFounded:"1967"
          championships: {
            number:"1",
            years: "1979"
            }
          },
          {
          name:"Magic",
          city:"Orlando",
          div:"Southeast",
          yearFounded:"1989"
          championships: {
            number:"0"
            years: null
            }
          },
          {
          name:"76",
          city:"Philadelphia",
          div:"Atlantic",
          yearFounded:"1946"
          championships: {
            number:"3",
            years:  "1955", "1967", "1983"
            }
          },
          {
          name:"Suns",
          city:"Phoenix",
          div:"Pacific",
          yearFounded:"1968",
          championships: {
            number:"0",
            years: null
            }
          },
          {
          name:"Trail Blazers",
          city:"Portland",
          div:"Northwest",
          yearFounded:
          championships: {
            number:
            years: ,
            }
          },
          {
          name:"Kings",
          city:"Sacramento",
          div:"Pacific",
          yearFounded:"1970",
          championships: {
            number:"1",
            years: "1977"
            }
          },
          {
          name:"Spurs",
          city:"San Antonio",
          div:"Southwest",
          yearFounded:"1967",
          championships: {
            number:"5",
            years: "1999","2003", "2005", "2007", "2014"
            }
          },
          {
          name:"Raptors",
          city:"Toronto",
          div:"Atlantic",
          yearFounded:"1995"
          championships: {
            number:"0"
            years: null
            }
          },
          {
          name:"Jazz",
          city:"Utah",
          div:"Northwest"
          yearFounded:"1974",
          championships: {
            number:"0",
            years: null
            }
          },
    }]

    function callback (msgHeader) {
      return function (err, response) {
        if (err) return console.log('ERROR:\n', err.message)
        return console.log(msgHeader, response)
      }
    }


    teamData.forEach(function(person) {
      dalNoSQL.createTeam(team, callback('TEAM CREATED:\n'))
    })
