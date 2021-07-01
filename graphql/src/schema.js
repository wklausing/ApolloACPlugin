const graphql = require("graphql");
const sqlite3 = require('sqlite3').verbose();

const {database} = require("./db");

//creacte graphql post object
const DailyActivitiesType = new graphql.GraphQLObjectType({
    name: "DailyActivities",
    fields: {
        id: { type: graphql.GraphQLID },
        activityDate: { type: graphql.GraphQLString },
        TotalSteps: { type: graphql.GraphQLInt },
        TotalDistance: { type: graphql.GraphQLFloat },
        TrackerDistance: { type: graphql.GraphQLFloat },
        LoggedActivitiesDistance: { type: graphql.GraphQLFloat },
        VeryActiveDistance: { type: graphql.GraphQLFloat },
        ModeratelyActiveDistance: { type: graphql.GraphQLFloat },
        LightActiveDistance: { type: graphql.GraphQLFloat },
        SedentaryActiveDistance: { type: graphql.GraphQLInt },
        VeryActiveMinutes: { type: graphql.GraphQLInt },
        FairlyActiveMinutes: { type: graphql.GraphQLInt },
        LightlyActiveMinutes: { type: graphql.GraphQLInt },
        SedentaryMinutes: { type: graphql.GraphQLInt },
        Calories: { type: graphql.GraphQLInt }
    }
});

// create a graphql query to select all and by id
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        //first query to select all
        DailyActivities: {
            type: graphql.GraphQLList(DailyActivitiesType),
            resolve: (root, args, context, info) => {
                return new Promise((resolve, reject) => {
                    // raw SQLite query to select from table
                    database.all("SELECT * FROM DailyActivities;", function(err, rows) {
                        if(err){
                            reject([]);
                        }
                        resolve(rows);
                    });
                });
            }
        },
        //second query to select by id
        DailyActivity:{
            type: graphql.GraphQLList(DailyActivitiesType),
            args:{
                id:{
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: (root, {id}, context, info) => {
                return new Promise((resolve, reject) => {

                    database.all("SELECT * FROM DailyActivities WHERE id = (?);",[id], function(err, rows) {
                        if(err){
                            reject(null);
                        }
                        resolve(rows[0]);
                    });
                });
            }
        }
    }
});

//define schema with post object, queries, and mustation
const schema = new graphql.GraphQLSchema({
    query: queryType
});

//export schema to use on index.js
module.exports = {
    schema
}
