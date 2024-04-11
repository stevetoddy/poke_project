import axios from "axios";
import { useState, useEffect } from "react";
import pokeHeading from '../public/International_Pokémon_logo.svg.png'
import ReactAudioPlayer from 'react-audio-player';


const baseURL = "https://pokeapi.co/api/v2/pokemon/?limit=160";

function App() {
  const [allPokemon, setAllPokemon] = useState<any>(null);
  const [pokemonOne, setPokemonOne] = useState<string>()
  const [pokemonTwo, setPokemonTwo] = useState<string>()
  const [typesOne, setTypesOne] = useState([])
  const [typesTwo, setTypesTwo] : any = useState([])
  const [nameOne, setNameOne] = useState<string>()
  const [cry, setCry] = useState<string>()


  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setAllPokemon(response.data);
    });
  }, []);

  if (!allPokemon) return null;

  const pokeList = allPokemon.results
  const pokeURLs: string[] =  []


  pokeList.map((pokemon: any) => {
    pokeURLs.push(pokemon.url)
  })

  const handleClickOne = () => {
    const randomNumberOne = Math.floor(Math.random() * 160)

    axios.get(pokeURLs[randomNumberOne]).then((response) => {
      setNameOne(response.data.name)
      setCry(response.data.cries.latest)
      setPokemonOne(response.data.sprites.front_default)
    });
  }

  const handleClickTwo = () => {
    const randomNumberTwo = Math.floor(Math.random() * 160)

    axios.get(pokeURLs[randomNumberTwo]).then((response) => {
      setTypesTwo([])
      setTypesTwo(response.data.types)
      setCry(response.data.cries.latest)
      // console.log(typesTwo)
      setPokemonTwo(response.data.sprites.front_default)
    });


  }

  const getTypes = () => {
    // console.log(typesTwo)
    typesTwo.forEach((type : any ) => {
      console.log(type.type.name)
    })
  }

  return (
    <>
    <div className="flex flex-col w-full items-center">
      <img className="mt-10 max-w-[600px]" src={pokeHeading} alt="" />
      <h1 className="text-2xl font-black text-[#0075BE]">BATTLER</h1>
    </div>
    <div className="flex">
      <div className="flex flex-col items-center h-full w-full">
        {!pokemonOne ? 
          <div className="flex align-center items-center h-32">
            <h1 className="text-2xl font-black text-[#0075BE]">Choose Your Pokemon</h1>
          </div> : 
          <>
            <img className="w-32 h-32 mt-5" src={pokemonOne} alt="" />
            <h1 className="text-2xl font-black text-[#0075BE] capitalize">{nameOne}</h1>
          </>
          
          }
        <button 
          className='flex justify-center w-96 h-12 bg-[#0075BE] p-3 rounded mt-10' 
          onClick={handleClickOne}>
            CLICK ME
        </button>
      </div>
      <div className="flex flex-col items-center w-full">
        {!pokemonTwo ? 
          '' : 
          <>
            <img className="w-32 h-32 mt-5" src={pokemonTwo} alt="" />

          </>}
        <button 
          className='flex justify-center w-96 h-12 bg-[#0075BE] p-3 rounded mt-10' 
          onClick={handleClickTwo}>
            CLICK ME
        </button>
        <button 
          className='flex justify-center w-96 h-12 bg-[#0075BE] p-3 rounded mt-10' 
          onClick={getTypes}>
            TYPES
        </button>
        <div className="hidden">
          <ReactAudioPlayer
            src={cry}
            autoPlay = {true}
            controls
          />
        </div>

      </div>
    </div>

    </>
  )
}

export default App
