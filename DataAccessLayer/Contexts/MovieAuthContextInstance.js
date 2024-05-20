const {MovieAuthContext, DbOption} = require('./MovieAuthContext')
const { v4 } = require('uuid');
const fs = require('fs')
const sqlite = require('sqlite3')
let canInjectDatas = false
let options = {
    dialect: process.env.DB_DIALECT.toLocaleLowerCase(),
    logging: process.env.DB_LOG.toLocaleLowerCase() === 'yes' && process.env.ENV.toLocaleLowerCase() === "dev"
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
        canInjectDatas = true
    }
}
const instance = new MovieAuthContext(dbName,dbUsername,dbPassword,new DbOption(options))

instance.sync()
.then(async () => {
    if(canInjectDatas){
        let idAccount = v4()
        await instance.getRoles().bulkCreate([
            {nameRole:"Admin",actif:true},
            {nameRole:"User",actif:true},
            {nameRole:"Gest",actif:true},
        ])
        await instance.getAccounts().create({idAccount:idAccount,loginAccount:'root',passwordAccount:'root',status:'open'})
        await instance.getAccountsRoles().bulkCreate([
            {idAccount:idAccount,idRole:2},
            {idAccount:idAccount,idRole:1},
        ])
    }
})
.catch(error => {
  console.error(`Une erreur s'est produite lors de la synchronisation des modèles: ${error}`);
});

module.exports = instance