import firebase from "../config";
import Person from "../../core/Person";
import PersonRepository from "../../core/PersonRepository";

export default class PersonCollection implements PersonRepository {

    #converter = {
        toFirestore(person: Person){
            return {
                name: person.name,
                age: person.age,
                description: person.description,
                active: person.active,
            }
        },
        fromFirestore(snapshot:firebase.firestore.QueryDocumentSnapshot, options:firebase.firestore.SnapshotOptions) : Person{
            const data = snapshot.data(options)
            return new Person(data.name, data.age, data.description, data.active, snapshot.id)
        }
    }

    async save(person: Person) : Promise<Person> {
        if(person?.id) {
            await this.collection().doc(person.id).set(person)
            return person
        } else {
            const docRef = await this.collection().add(person)
            const doc = await docRef.get()
            return doc.data()
        }
    }

    async delete(person: Person) : Promise<void> {
        return this.collection().doc(person.id).delete()
    }

    async getAll() : Promise<Person[]> {
        const query = await this.collection().get()
        return query.docs.map(doc => doc.data())
    }

    //test #collection instead of private collection
    private collection() {
        return firebase.firestore().collection('persons').withConverter(this.#converter)
    }

}