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
  function clearAll(){
      localStorage.removeItem('count')
      localStorage.removeItem('pronostiques')
      window.location.reload()
      }

  return (
    <>
      <div className="h-fit w-full flex gap-4 flex-col items-center">
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
            <div className="flex gap-4 justify-start flex-wrap mt-5">
              <Pronostique data={pronostiqueData} />
            </div>
            <div className="flex justify-center gap-2 xl:gap-5 max-w-[400px] flex-wrap lg:flex-nowrap">
                <button onClick={() => setOpen(!open)} className="bg-gray-400 text-sm xl:text-normal text-white py-2 rounded-xl px-5 xl:w-52">Ajouter un pronostique</button>
                <button onClick={()=> clearAll()} className="bg-gray-400 text-sm xl:text-normal text-white py-2 rounded-xl w-20 xl:w-52">Clear</button>
            </div>
          </>
        }
      </div>
      <div className='flex justify-center items-center h-[92vh] flex-col'>
        <h1 className='text-xl xl:text-3xl mb-5 font-normal'>Count Descentes</h1>
        <div className='w-[250px] xl:w-[400px]'>
          <div className='bg-gray-400 text-white py-2 xl:py-3 rounded-xl text-center text-sm xl:text-normal'>
            Total : {count}
          </div>
          <div className='mt-2 xl:mt-3 flex justify-between w-full flex-wrap'>
            <button className='bg-gray-400 text-white px-3 xl:px-10 py-2 xl:py-3 w-[30%] rounded-xl' onClick={supprimer}>
              -
            </button>
            <button className='bg-gray-400 text-white px-3 xl:px-10 py-2 xl:py-3 w-[30%] rounded-xl text-sm xl:text-normal' onClick={reset}>
              Reset
            </button>
            <button className='bg-gray-400 text-white px-3 xl:px-10 py-2 xl:py-3 w-[30%] rounded-xl' onClick={ajouter}>
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
