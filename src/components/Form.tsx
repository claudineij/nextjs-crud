import { useState } from "react";
import Person from "../core/Person";
import Button from "./Button";
import CheckBox from "./Checkbox";
import Input from "./Input";
import TextArea from "./TextArea";

interface formProps {
    person: Person
    canceled?: () => void
    personChanged?: (person : Person) => void
}

export default function Form(props : formProps) {
    const id = props.person?.id ?? null
    const [name, setName] = useState(props.person?.name ?? '')
    const [age, setAge] = useState(props.person?.age ?? 0)
    const [description, setDescription] = useState(props.person?.description ?? '')
    const [active, setActive] = useState(props.person?.active ?? true)
    return (
        <div>
            {id ? (
                <Input text="Id" value={id} readOnly className="mb-5" />    
            ) : false}
            <Input text="Nome" value={name} onChange={setName} className="mb-5" />
            <Input text="Idade" type="number" value={age} onChange={setAge} className="mb-5" />
            <TextArea text="Descrição" value={description} rows={4} onChange={setDescription} />
            <CheckBox text="Ativo" value={active} onChange={setActive} name="chkActive"/>
            <div className="flex justify-end mt-7">
                <Button color='blue' className="mr-2" onClick={() => props.personChanged?.(new Person(name, +age, description, active, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Button>
                <Button color='gray' onClick={props.canceled}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}