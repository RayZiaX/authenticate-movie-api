const repositories = require('./index')

class Repositories {
    #accountRepository;
    #roleRepository;

    constructor(context) {
        this.context = context
    }

    getAccountRepository(){
        if(this.#accountRepository == null || this.#accountRepository == undefined){
            this.#accountRepository = new repositories.Repositories.AccountRepository(this.context, this.context.getAccounts())
        }

        return this.#accountRepository;
    }

    getRoleRepository(){
        if(this.#roleRepository == null || this.#roleRepository == undefined){
            this.#roleRepository = new repositories.Repositories.RoleRepository(this.context, this.context.getRoles())
        }

        return this.#roleRepository;
    }
}

module.exports = Repositories