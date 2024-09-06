import { useState, useEffect } from 'react';
import './App.css';
import Pronostique from './assets/components/pronostiques';
import Formulaire from './assets/components/formulaire';

function App() {

  const [pronostiqueData, setPronostiqueData] = useState(() => {
    const savedData = localStorage.getItem('pronostiques');
    console.log(savedData);
    try {
      return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return [];
    }
  });

  const [formData, setFormData] = useState({
    'nom': '',
    'nombre': ''
  });

  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    return savedCount !== null ? parseInt(savedCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem('count', count);
    localStorage.setItem('pronostiques', JSON.stringify(pronostiqueData));
  }, [count, pronostiqueData]);

  function supprimer() {
    setCount((prevCount) => prevCount - 1);
  }

  function ajouter() {
    setCount((prevCount) => prevCount + 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <>
      <div className="h-fit flex gap-4 flex-col">
        {open ?
          <div>
            <Formulaire
              formData={formData}
              pronostiqueData={pronostiqueData}
              setOpen={setOpen}
              setFormData={setFormData}
              updatePronostiqueData={(data) => setPronostiqueData([...pronostiqueData, data])}
            />
          </div>
          :
          <>
            <div className="flex gap-4 justify-start flex-wrap">
              <Pronostique data={pronostiqueData} />
            </div>
            <button onClick={() => setOpen(!open)} className="bg-gray-400 text-white py-2 rounded-xl">Ajouter un pronostique</button>
          </>
        }
      </div>
      <div className='flex justify-center items-center h-[92vh] flex-col'>
        <h1 className='text-3xl mb-5 font-serif font-semibold'>Count Descentes</h1>
        <div>
          <div className='bg-gray-400 text-white py-5 rounded-xl text-center'>
            Total : {count}
          </div>
          <div className='mt-5 flex gap-x-5'>
            <button className='bg-gray-400 text-white px-10 py-4 rounded-xl' onClick={supprimer}>
              -
            </button>
            <button className='bg-gray-400 text-white px-10 py-4 rounded-xl' onClick={reset}>
              Reset
            </button>
            <button className='bg-gray-400 text-white px-10 py-4 rounded-xl' onClick={ajouter}>
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
