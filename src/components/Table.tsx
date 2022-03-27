import Person from "../core/Person"
import { DeleteIcon, EditIcon } from "./Icons"


interface TableProps {
    persons: Person[]
    selectedPerson?: (person: Person) => void
    deletedPerson?: (person: Person) => void
}

export default function Table(props: TableProps){

    const showActions = props.deletedPerson || props.selectedPerson

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                <th className="text-left p-4">Descrição</th>
                {showActions ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    function renderData() {
        return props.persons?.map((person, i) => {
                return (
                    <tr key={person.id}
                        className={`${i % 2 === 0 ? 'bg-blue-200' : 'bg-blue-100' }`}>
                        <td className="text-left p-4">{person.id}</td>
                        <td className="text-left p-4">{person.name}</td>
                        <td className="text-left p-4">{person.age}</td>
                        <td className="text-left p-4">{person.description}</td>
                        {showActions ? renderAction(person) : false}
                    </tr>
                )    
        })

        function renderAction(person: Person) {
            return (
                <td className="flex justify-center">
                    {props.selectedPerson? (
                        <button onClick={() => props.selectedPerson?.(person)} className={`
                        flex justify-center items-center
                        text-green-600 rounded-full p-2 m-1
                        hover:bg-purple-50
                        `}>
                            {EditIcon}
                        </button>           
                    ) : false}
                    {props.deletedPerson? (
                        <button onClick={() => props.deletedPerson?.(person)} className={`
                        flex justify-center items-center
                        text-red-500 rounded-full p-2 m-1
                        hover:bg-purple-50`}>
                        {DeleteIcon}</button>             
                    ) : false}
                </td>
            )
        }


    }

    return(
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )    
}