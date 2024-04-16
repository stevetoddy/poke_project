import axios from "axios";
import { useState, useEffect } from "react";
import pokeHeading from '../public/International_Pokémon_logo.svg.png'
import pokeBall from '../public/pokeball.svg'
import ReactAudioPlayer from 'react-audio-player';


const baseURL = "https://pokeapi.co/api/v2/pokemon/?limit=151";

function App() {
  const [allPokemon, setAllPokemon] = useState<any>(null);
  const [pokemonOne, setPokemonOne] = useState<string>('')
  const [pokemonTwo, setPokemonTwo] = useState<string>('')
  const [typesOne, setTypesOne] = useState<any>([])
  const [typesTwo, setTypesTwo] = useState<any>([])
  const [nameOne, setNameOne] = useState<string>('')
  const [nameTwo, setNameTwo] = useState<string>('')
  const [cry, setCry] = useState<string>('')
  const [rerollsOne, setRerollsOne] = useState<number>(0)
  const [rerollsTwo, setRerollsTwo] = useState<number>(0)
  const [winner, setWinner] = useState<string>('')
  const [pokemonOneScore, setPokemonOneScore] = useState<number>(0)
  const [pokemonTwoScore, setPokemonTwoScore] = useState<number>(0)

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
    if (rerollsOne < 3) {
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

    if (rerollsTwo < 3) {
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


  ////////////// Tie breaker /////////////
  const tieBreaker = () => {  
    const tieBreaker = Math.floor(Math.random() * 100)
    if (tieBreaker >= 50) {
      //Pokemon One Wins
      setWinner('Pokemon One')
    } else {
      // Pokemon Two Wins
      setWinner('Pokemon Two')
    }
  }

  ////////////// Half Advantage ////////////
  const halfAdvantage = () => {  
    const tieBreaker = Math.floor(Math.random() * 100)
    if (tieBreaker >= 75) {
      //Pokemon One Wins
      setWinner('Pokemon One')
    } else {
      // Pokemon Two Wins
      setWinner('Pokemon Two')
    }
  }

  ////////////// Victory /////////////
  const victory = () => {
    setWinner('Pokemon One')
  }
  
  /////////// Defeat ////////////
  const defeat = () => {
    setWinner('Pokemon Two')
  }

  const close = () => {
    if (winner === 'Pokemon One') {
      setPokemonOneScore(pokemonOneScore + 1)
    } else {
      setPokemonTwoScore(pokemonTwoScore + 1)
    }
    setWinner('')
    setPokemonTwo('')
    setPokemonOne('')
  }

  const battle = () => {
    setRerollsOne(0)
    setRerollsTwo(0)

    switch (typesOne[0].type.name) {
      case "normal":
        if (
          typesTwo[0].type.name === "normal" ||
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
          typesTwo[0].type.name === "fairy" ||
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
        if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "dark"
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "fire"
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "fairy" ||
          typesTwo[0].type.name === "steel"
        ) {
          victory()
        }
        break
      case "water":
        if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "fairy" ||
          typesTwo[0].type.name === "steel"
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "dragon" 
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "fire"
        ) {
          victory()
        }
        break
      case "electric":
        if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "fairy" ||
          typesTwo[0].type.name === "steel" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "fire"
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "grass" 
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "water" 

        ) {
          victory()
        } else if ( 
          typesTwo[0].type.name === "ground"
        ) { 
          defeat() 
        }
        break
      case "grass":
        if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "fairy" ||
          typesTwo[0].type.name === "electric" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "steel" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "flying" 
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "water" 
        ) {
          victory()
        } 
        break
      case "ice":
        if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "fairy" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "electric" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "steel" ||
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "water" 
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "ground"
        ) {
          victory()
        }
        break
      case "fighting":
        if (
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "fire"
        ) {
            tieBreaker() 
        } else if (
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "fairy" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "flying" 

        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "steel" ||
          typesTwo[0].type.name === "rock" 
        ) {
          victory()
        } else if ( 
          typesTwo[0].type.name === "ghost"
        ) { 
          defeat() 
        }
        break
      case "poison":
        if (
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "fire" || 
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "bug" ||       
          typesTwo[0].type.name === "flying" 
        ) {
            tieBreaker() 
        } else if (
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "rock" ||  
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "ghost" 
        ) {
          halfAdvantage()
        } else if (
         
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "fairy" 

        ) {
          victory()
        } else if ( 
          typesTwo[0].type.name === "steel"
        ) { 
          defeat() 
        }
        break
      case "ground":
        if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "fairy" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "steel" 
        ) {
          victory()
        } else if (          
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "bug"
        ) { 
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "flying"
        ) { 
          defeat() 
        }
        break
      case "flying":
          if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "fairy" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "steel" 
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "bug"
        ) {
          victory()
        }
        break
      case "psychic":
          if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "fairy" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "steel" 
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "poison" 
        ) {
          victory()
        } else if (
          typesTwo[0].type.name === "dark" 
        ) { 
          defeat() 
        }
        break
      case "bug":
          if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "dragon" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "steel" ||
          typesTwo[0].type.name === "fairy" 
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "dark" 
        ) {
          victory()
        }
        break
      case "rock":
          if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "fairy" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "steel"
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "bug"
        ) {
          victory()
        }
        break
      case "ghost":
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
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "steel" ||
          typesTwo[0].type.name === "fairy" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "dark"
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "ghost" 
        ) {
          victory()
        }
        break
      case "dragon":
          if (
          typesTwo[0].type.name === "normal" ||
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
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "dark" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "steel"
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "dragon"
        ) {
          victory()
        } else if (
          typesTwo[0].type.name === "fairy"
        ) { 
          defeat() 
        }
        break
      case "dark":
          if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "steel" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "dark" ||
          typesTwo[0].type.name === "fairy"
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "ghost"
        ) {
          victory()
        }
        break
      case "steel":
          if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "dark" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "steel" 
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "fairy"
        ) {
          victory()
        }
        break
      case "fairy":
          if (
          typesTwo[0].type.name === "normal" ||
          typesTwo[0].type.name === "water" ||
          typesTwo[0].type.name === "electric" ||
          typesTwo[0].type.name === "grass" ||
          typesTwo[0].type.name === "ice" ||
          typesTwo[0].type.name === "ground" ||
          typesTwo[0].type.name === "flying" ||
          typesTwo[0].type.name === "psychic" ||
          typesTwo[0].type.name === "bug" ||
          typesTwo[0].type.name === "rock" ||
          typesTwo[0].type.name === "ghost" ||
          typesTwo[0].type.name === "fairy" 
        ) {
          tieBreaker() 
        } else if (
          typesTwo[0].type.name === "fire" ||
          typesTwo[0].type.name === "poison" ||
          typesTwo[0].type.name === "steel"
        ) {
          halfAdvantage()
        } else if (
          typesTwo[0].type.name === "fighting" ||
          typesTwo[0].type.name === "dragon" ||
          typesTwo[0].type.name === "dark"
        ) {
          victory()
        }
        break
    }
  }

  return (
    <div className='flex relative items-center justify-center'>
      <div className={
          `${winner.length > 0 ? 
          "blur" : ""}`
      }>
        <div className="flex  flex-col w-full items-center">
          <img className="mt-10 max-w-[600px]" src={pokeHeading} alt="" />
          <h1 className="text-[42px] m-[-20px] font-black text-[#0075BE]">BATTLER</h1>
        </div>
        <div className="flex mt-36">
          <div className="flex flex-col items-center h-full w-full mr-16">
          <div className="text-xl text-center font-black text-[#0075BE] capitalize">Score: {pokemonOneScore}</div>
            {!pokemonOne ? 
              <>
                <div className="flex flex-col items-center w-[260px h-[260px] mt-10">
                  <img src={pokeBall} alt="pokeball" className='w-52' /> 
                </div>
              </> : 
              <div className='flex flex-col w-[260px h-[260px] mt-10'>
                <img className="w-52 h-52 mt-5" src={pokemonOne} alt="" />
                <h1 className="text-3xl text-center font-black text-[#0075BE] capitalize">{nameOne}</h1>
              </div>
              }
              <button 
                className='flex justify-center align-center w-96 bg-[#0075BE] text-2xl font-black text-[#FFCC00] p-5 rounded mt-10' 
                onClick={handleClickOne}>
                  Choose Your Pokemon
              </button>
              <div className="text-xl font-black text-[#0075BE] mt-5">Rerolls left: {3 - rerollsOne}</div>  
            
          </div>
          <div className="flex flex-col items-center h-full w-full">
          <div className="text-xl text-center font-black text-[#0075BE] capitalize">Score: {pokemonTwoScore}</div>
          {!pokemonTwo ? 
              <>
                <div className="flex flex-col items-center w-[260px h-[260px] mt-10">
                  <img src={pokeBall} alt="pokeball" className='w-52' /> 
                </div>
              </> : 
              <div className='flex flex-col w-[260px h-[260px] mt-10'>
                <img className="w-52 h-52 mt-5" src={pokemonTwo} alt="" />
                <h1 className="text-3xl text-center font-black text-[#0075BE] capitalize">{nameTwo}</h1>
              </div>
              }
              <button 
                className='flex justify-center align-center w-96 bg-[#0075BE] text-2xl font-black text-[#FFCC00] p-5 rounded mt-10' 
                onClick={handleClickTwo}>
                  Choose Your Pokemon
              </button>
              <div className="text-xl font-black text-[#0075BE] mt-5">Rerolls left: {3 - rerollsTwo}</div>  
            
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
            className='flex justify-center align-center w-72 bg-[#0075BE] text-2xl font-black text-[#FFCC00] p-5 rounded mt-20' 
            onClick={battle}>
              Battle 
          </button>
        </div>
      </div>
      {winner.length > 0 ?
        <div className="flex flex-col absolute animate-[fade-in-down_1s_ease-in-out] justify-center items-center w-[600px] h-[600px] bg-[#FFCC00] text-[40px] font-black text-[#0075BE] p-5 rounded-full border-8 border-[#0075BE]">
          <img className="w-52 h-52 mt-5" src={ winner === "Pokemon One" ? pokemonOne :pokemonTwo } alt="" />
          { winner === "Pokemon One" ? 
            <p className="capitalize">{nameOne}</p>    
            : 
            <p className="capitalize">{nameTwo}</p>
          } is the WINNER!
          <button 
              className='flex justify-center items-center bg-[#0075BE] text-sm font-black text-[#FFCC00] p-2 mt-20 rounded-full w-6 h-6' 
              onClick={close}>
                X
          </button>
        </div>
      :
        ''
      }
    </div>
  )
}

export default App
