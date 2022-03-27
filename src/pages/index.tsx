
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import usePersons from "../hooks/usePersons";

export default function Home() {
  
  const {person, persons, selectPerson, deletePerson, newPerson, savePerson, tableVisible, showTable} = usePersons()

 
  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout title="Cliente">
        {tableVisible ? (
          <>
            <div className="flex justify-end">
              <Button color='green' className="mb-4" onClick={newPerson}>Novo Cliente</Button> 
            </div>
            <Table persons={persons} selectedPerson={selectPerson} deletedPerson={deletePerson}></Table> 
          </>
        ) : (
          <Form 
            person={person} 
            personChanged={savePerson}
            canceled={showTable}
          />
        )}
      </Layout>
    </div>
  )
}
