const { database } = require("./db");

const resolvers = {
    Query: {
        async Persons(_, __, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM Persons;', function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async Person(_, { Id }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM Persons WHERE Id = (?);', [Id], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async DailyActivities(_, __, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM DailyActivities;', function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async DailyActivity(_, { Id }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM DailyActivities WHERE Id = (?);', [Id], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async DailyActivityDay(_, { Id, Time }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM DailyActivities WHERE Id = (?) AND ActivityDate Like (?);', [Id, Time], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async HeartratePerSeconds(_, { Id }, { ___ }) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM HeartratePerSeconds WHERE Id = (?);', [Id], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async HeartratePerSecondsDay(_, { Id, Time }, { ___ }) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM HeartratePerSeconds WHERE Id = (?) AND Time Like (?);', [Id, Time + '%'], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async HeartratePerSecondsHalfDay(_, { Id, Time }, { ___ }) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM HeartratePerSeconds WHERE Id = (?) AND Time Like (?) AND Time NOT Like "%PM";', [Id, Time + '%'], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async SleepDays(_, __, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM SleepDays;', function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async SleepDaysOf(_, { Id }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM SleepDays WHERE Id = (?);', [Id], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async SleepDay(_, { Id, Time }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM SleepDays WHERE Id = (?) AND SleepDay Like (?);', [Id, Time + "%"], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async WeightPounds(_, __, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM WeightPounds;', function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async WeightPoundsOf(_, { Id }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM WeightPounds WHERE Id = (?);', [Id], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async HourlyIntensities(_, __, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM HourlyIntensities;', function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async HourlyIntensitiesOf(_, { Id }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM HourlyIntensities WHERE Id = (?);', [Id], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async DailySteps(_, __, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM DailySteps;', function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async DailyStepsOf(_, { Id }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM DailySteps WHERE Id = (?);', [Id], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async DailyStepsDay(_, { Id, Time }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM DailySteps WHERE Id = (?) AND ActivityDay Like (?);', [Id, Time], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async DailyIntensities(_, __, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM DailyIntensities;', function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                    rows.shift();
                });
            });
        },
        async DailyIntensitiesOf(_, { Id }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM DailyIntensities WHERE Id = (?);', [Id], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
        async DailyIntensitiesDay(_, { Id, Time }, ___) {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                database.query('SELECT * FROM DailyIntensities WHERE Id = (?) AND ActivityDay Like (?);', [Id, Time], function (err, rows) {
                    if (err) {
                        reject([]);
                    }
                    resolve(rows);
                });
            });
        },
    },
    Mutation: {
        async InsertDailyActivity(_, { Id, ActivityDate, TotalSteps }, ___) {
            return new Promise((resolve, reject) => {
                //raw SQLite to insert a new post in post table
                database.query('INSERT INTO DailyActivities (Id,ActivityDate,TotalSteps) VALUES (?,STR_TO_DATE(?, "%d/%m/%Y"),?);', [Id, ActivityDate, TotalSteps], (err) => {
                    if (err) {
                        reject(null);
                        console.log('InsertDailyActivity: Insert failed')
                    }
                    database.query('SELECT * FROM DailyActivities WHERE Id = (?);', [Id], function (err, rows) {
                        if (err) {
                            reject([]);
                            console.log('InsertDailyActivity: Select failed')
                        }
                        resolve(rows);
                    });
                });
            })
        },
        async DeleteDailyActivity(_, { Id, ActivityDate }, ___) {
            return new Promise((resolve, reject) => {
                //raw SQLite to insert a new post in post table
                database.query('DELETE FROM DailyActivities WHERE Id=(?) AND ActivityDate=STR_TO_DATE(?, "%d/%m/%Y");', [Id, ActivityDate], (err) => {
                    if (err) {
                        reject(null);
                        console.log('DeleteDailyActivity: Delete failed')
                    }
                    database.query('SELECT * FROM DailyActivities WHERE Id = (?) AND ActivityDate=STR_TO_DATE(?, "%d/%m/%Y");', [Id, ActivityDate], function (err, rows) {
                        if (err) {
                            reject([]);
                            console.log('DeleteDailyActivity: Select failed')
                        }
                        resolve(rows);
                    });
                });
            })
        }
    }
};

module.exports = resolvers;
