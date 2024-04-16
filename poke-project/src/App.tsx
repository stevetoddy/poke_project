import axios from "axios";
import { useState, useEffect } from "react";
import pokeHeading from '../public/International_Pokémon_logo.svg.png'
import pokeBall from '../public/pokeball.svg'
import ReactAudioPlayer from 'react-audio-player';


const baseURL = "https://pokeapi.co/api/v2/pokemon/?limit=151";

function App() {
  const [allPokemon, setAllPokemon] = useState<any>(null);
  const [pokemonOne, setPokemonOne] = useState<string>()
  const [pokemonTwo, setPokemonTwo] = useState<string>()
  const [typesOne, setTypesOne] = useState<any>([])
  const [typesTwo, setTypesTwo] = useState<any>([])
  const [nameOne, setNameOne] = useState<string>()
  const [nameTwo, setNameTwo] = useState<string>()
  const [cry, setCry] = useState<string>()
  const [rerollsOne, setRerollsOne] = useState<number>(0)
  const [rerollsTwo, setRerollsTwo] = useState<number>(0)

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
    const randomNumberOne = Math.floor(Math.random() * 151)
    if (rerollsOne < 5553) {
      axios.get(pokeURLs[randomNumberOne]).then((response) => {
        setTypesOne([])
        setTypesOne(response.data.types)
        setNameOne(response.data.name)
        setCry(response.data.cries.latest)
        setPokemonOne(response.data.sprites.front_default)
        setRerollsOne(rerollsOne + 1)
      });
    } else {
      alert("You have no rerolls left :'(")
    }
  }

  const handleClickTwo = () => {
    const randomNumberTwo = Math.floor(Math.random() * 151)

    if (rerollsTwo < 5553) {
      axios.get(pokeURLs[randomNumberTwo]).then((response) => {
        setTypesTwo([])
        setTypesTwo(response.data.types)
        setNameTwo(response.data.name)
        setCry(response.data.cries.latest)
        setPokemonTwo(response.data.sprites.front_default)
        setRerollsTwo(rerollsTwo + 1)
      });
    } else {
      alert("You have no rerolls left :'(")
    }
  }



  const tieBreaker = () => {  
    ////////////// Tie breaker /////////////
    const tieBreaker = Math.floor(Math.random() * 100)
    console.log(tieBreaker)
    if (tieBreaker >= 50) {
      //Pokemon One Wins
      alert('Pokemon One Wins')
    } else {
      // Pokemon Two Wins
      alert('Pokemon Two Wins')
    }
  }

  const halfAdvantage = () => {  
    ////////////// Half Advantage /////////////
    const tieBreaker = Math.floor(Math.random() * 100)
    console.log(tieBreaker)
    if (tieBreaker >= 25) {
      //Pokemon One Wins
      alert('Pokemon One Wins')
    } else {
      // Pokemon Two Wins
      alert('Pokemon Two Wins')
    }
  }

  const defeat = () => {
    /////////// Defeat ////////////
    alert('Pokemon Two Wins')
  }

  const getTypes = () => {
    
    // Tie Breaker
    if (typesOne[0].type.name === typesTwo[0].type.name) {
      tieBreaker()
    }


    switch (typesOne[0].type.name) {
      case "normal":
        alert('normal')
        if (
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "dark"
        ) {
            tieBreaker() 
        } else if (
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "steel" 
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "ghost"
        ) { 
          defeat() 
        }

        break
      case "fire":
        alert('fire')
        break
      case "water":
        alert('water')
        break
      case "electric":
        alert('electric')
        break
      case "grass":
        alert('grass')
        break
      case "ice":
        alert('ice')
        break
      case "fighting":
        alert('fighting')
        break
      case "poison":
        alert('poison')
        break
      case "ground":
        alert('ground')
        break
      case "flying":
        alert('flying')
        break
      case "psychic":
        alert('psychic')
        break
      case "bug":
        alert('bug')
        break
      case "rock":
        alert('rock')
        break
      case "ghost":
        alert('ghost')
        break
      case "dragon":
        alert('dragon')
        break
      case "dark":
        alert('dark')
        break
      case "steel":
        alert('steel')
        break
      case "fairy":
        alert('fairy')
        break
    }
  }



  return (
    <>
      <div className="flex flex-col w-full items-center">
        <img className="mt-10 max-w-[600px]" src={pokeHeading} alt="" />
        <h1 className="text-[42px] m-[-20px] font-black text-[#0075BE]">BATTLER</h1>
      </div>
      <div className="flex mt-20">


        <div className="flex flex-col items-center h-full w-full">
          {!pokemonOne ? 
            <div className="flex flex-col items-center w-[260px h-[260px]">
              <img src={pokeBall} alt="pokeball" className='w-52' /> 
              <h1 className="text-2xl font-black text-[#0075BE] mt-5">Choose Your Pokemon</h1>
            </div> : 
            <div className='flex flex-col w-[260px h-[260px]'>
              <img className="w-52 h-52 mt-5" src={pokemonOne} alt="" />
              <h1 className="text-2xl text-center font-black text-[#0075BE] capitalize">{nameOne}</h1>
            </div>
            }
          <button 
            className='flex justify-center align-center w-96 bg-[#0075BE] text-2xl font-black text-[#FFCC00] p-5 rounded mt-10' 
            onClick={handleClickOne}>
              Choose Your Pokemon
          </button>
          {rerollsOne === 0 ? 
            '' : 
            <div className="text-2xl font-black text-[#0075BE] mt-5">Rerolls left: {3 - rerollsOne}</div>  
          }
        </div>
       
       
        <div className="flex flex-col items-center h-full w-full">
          {!pokemonTwo ? 
            <div className="flex flex-col items-center w-[260px h-[260px]">
              <img src={pokeBall} alt="pokeball" className='w-52' /> 
              <h1 className="text-2xl font-black text-[#0075BE] mt-5">Choose Your Pokemon</h1>
            </div> : 
            <div className='flex flex-col w-[260px h-[260px]'>
              <img className="w-52 h-52 mt-5" src={pokemonTwo} alt="" />
              <h1 className="text-2xl text-center font-black text-[#0075BE] capitalize">{nameTwo}</h1>
            </div>
          }
          <button 
            className='flex justify-center w-96 h-12 bg-[#0075BE] p-3 rounded mt-10' 
            onClick={handleClickTwo}>
              Choose Your Pokemon
          </button>
          {rerollsTwo === 0 ? 
            '' :  
            <div className="text-2xl font-black text-[#0075BE] mt-5">Rerolls left: {3 - rerollsTwo}</div> 
          }
          <div className="hidden">
            <ReactAudioPlayer
              src={cry}
              autoPlay = {true}
              controls
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button 
          className='flex justify-center w-96 h-12 bg-[#0075BE] p-3 rounded mt-20 mr-5' 
          onClick={getTypes}>
            Battle
        </button>
      </div>

    </>
  )
}

export default App
