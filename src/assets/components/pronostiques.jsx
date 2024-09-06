import React from 'react'

export default function Pronostique(props) {

    return (
    <>
        {props.data && props.data.length > 0 ? (
            props.data.map((element, i) => {
                return(
                <div key={i}  className="bg-gray-400 text-white max-w-[150px] h-full flex p-4 flex-col justify-between items-start rounded-[10px] ">
                    <p className="text-xl font-semibold capitalize">{element.nom}</p>
                    <p>{element.nombre}</p>
                </div>
                   ) })
                ) : (
                    <p className="w-full text-center text-2xl font-serif font-semibold">Pas de pronostique</p>
                )}
            </>
        );
}
