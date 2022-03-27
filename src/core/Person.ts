export default class Person {
    #id: string
    #name: string
    #age: number
    #description: string
    #active: boolean

    constructor(name: string, age: number, description: string, active: boolean, id: string = null){
        this.#name = name
        this.#age = age
        this.#description = description
        this.#active = active
        this.#id = id
    }

    get id() {
        return this.#id
    }

    get name() {
        return this.#name
    }

    get age() {
        return this.#age
    }

    get description() {
        return this.#description
    }

    get active() {
        return this.#active
    }

    static newPerson() {
        return new Person('',0,'',true)
    }

}