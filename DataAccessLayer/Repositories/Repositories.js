const repositories = require('./index')

class Repositories {
    #userRepository;
    #roleRepository;

    constructor(context) {
        this.context = context
    }

    getUserRepository(){
        if(this.#userRepository == null || this.#userRepository == undefined){
            this.#userRepository = new repositories.Repositories.UserRepository(this.context, this.context.getUsers())
        }

        return this.#userRepository;
    }

    getRoleRepository(){
        if(this.#roleRepository == null || this.#roleRepository == undefined){
            this.#roleRepository = new repositories.Repositories.RoleRepository(this.context, this.context.getRoles())
        }

        return this.#roleRepository;
    }
}

module.exports = Repositories