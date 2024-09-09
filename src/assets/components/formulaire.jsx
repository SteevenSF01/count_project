import {useState} from 'react'

export default function Formulaire(props){
    const [nom, setNom] = useState("")
    const [nombre, setNombre] = useState("")

    function handleSubmit(e) {
    e.preventDefault();
    if (props.formData.nom.length > 0 && props.formData.nombre.length > 0){
        props.setOpen(false)
        props.updatePronostiqueData(props.formData);
        props.setFormData({
            ...props.formData,
            nom:"",
            nombre:"",
            })
        }
    }
    return(
        <>
            <form className="p-5 flex gap-4 justify-start xl:justify-center flex-wrap bg-gray-400 rounded-xl w-[92vw]">
                <label className="text-white flex justify-between">Nom :
                    <input type='text' className="ms-2 text-black ps-2 w-40 rounded-sm" onChange={(e) => props.setFormData({...props.formData, nom: e.target.value})} value={props.formData.nom} />
                </label>
                <label className="text-white">Pronostique :
                    <input type='number' className="ms-2 text-black ps-2 rounded-sm" min={0} max={30} onChange={(e) => props.setFormData({...props.formData, nombre: e.target.value})} value={props.formData.nombre} />
                </label>
                <input type='submit' onClick={(e) => handleSubmit(e)} className="bg-white px-5 rounded-sm text-sm"/>
            </form>
        </>
        )
    }