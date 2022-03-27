import Person from "./Person";

export default interface PersonRepository {
    save(person : Person): Promise<Person>
    delete(person : Person): Promise<void>
    getAll() : Promise<Person[]>
}