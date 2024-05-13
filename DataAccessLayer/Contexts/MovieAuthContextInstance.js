const {MovieAuthContext, DbOption} = require('./MovieAuthContext')
const fs = require('fs')
const sqlite = require('sqlite3')

let options = {
    dialect: process.env.DB_DIALECT
}

let dbName = process.env.DB_NAME == undefined ? '' : process.env.DB_NAME
let dbUsername = process.env.DB_USERNAME == undefined ? '' : process.env.DB_USERNAME
let dbPassword = process.env.DB_PWD == undefined ? '' : process.env.DB_PWD

if(options.dialect.toLocaleLowerCase()){
    let dirSqlite = './SQL/Sqlite/'
    options.storage = dirSqlite + "MovieAPI.sqlite"
    options.mode = sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE | sqlite.OPEN_FULLMUTEX
    // création du dossier pour Sqlite
    if(!fs.existsSync(dirSqlite)){
        fs.mkdirSync(dirSqlite, {recursive: true});
    }
}

let dbOptions = new DbOption(options)

const instance = new MovieAuthContext(dbName,dbUsername,dbPassword,dbOptions)

module.exports = instance