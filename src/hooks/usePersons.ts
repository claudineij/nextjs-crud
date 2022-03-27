import { useEffect, useState } from "react"
import PersonCollection from "../backend/db/PersonCollection"
import Person from "../core/Person"
import PersonRepository from "../core/PersonRepository"
import useVisible from "./useVisible"

export default function usePersons() {
  const repo: PersonRepository = new PersonCollection()
  //const [person, SetPerson] = useState<Person>(Person.vazio())
  const [person, setPerson] = useState<Person>(new Person('',0,'',false))
  const [persons, setPersons] = useState<Person[]>([])

  const {tableVisible, showTable, showForm} = useVisible()

  useEffect(getAll, [])

  function getAll() {
    repo.getAll().then(persons => {
      setPersons(persons)
      showTable()  
    })
  }

  function selectPerson(person : Person) {
    setPerson(person)
    showForm()
  }

  async function savePerson(person:Person) {
    await repo.save(person)
    getAll()
  }

  function newPerson() {
    setPerson(new Person('',0,'',false))
    showForm()
  }

  async function deletePerson(person:Person) {
    await repo.delete(person)
    getAll()
  }

  return {
      tableVisible,
      showTable,
      newPerson,
      savePerson,
      deletePerson,
      selectPerson,
      getAll,
      person,
      persons
  }
}