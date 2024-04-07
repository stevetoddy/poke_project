import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "https://pokeapi.co/api/v2/pokemon/?limit=200";


function App() {
  const [post, setPost] = useState<any>(null);
  const [pokemonOne, setPokemonOne] = useState<string>()

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  const pokeList = post.results
  const pokeURLs: string[] =  []

  pokeList.map((pokemon: any) => {
    pokeURLs.push(pokemon.url)
  })

  // const PokemonImg = () => {
  //   pokeURLs.forEach((pokemonURL: string) => {
  //     axios.get(pokemonURL).then((response) => {
  //       setIndividuals(response.data) 
  //     });
  //   })
  // }  



  // const PokemonImg = () => {
  //     axios.get(pokeURLs[0]).then((response) => {
  //       setIndividuals(response.data) 
  //       console.log(response.data)
  //     });
  //   }
  
  const handleClick = () => {

    let randomNumber = Math.floor(Math.random() * 200)

    axios.get(pokeURLs[randomNumber]).then((response) => {
      console.log(response.data.sprites.front_default)
      setPokemonOne(response.data.sprites.front_default)
    });
  }
console.log('THE', pokemonOne)
  return (
    <>
      <h1 className='flex justify-center text-4xl font-bold text-[#0075BE] mt-10'>Poke Project</h1>
      <div className="flex flex-col items-center w-full">
        <button className='flex justify-center w-96 h-12 bg-[#0075BE] p-3 rounded mt-10' onClick={handleClick}>CLICK ME</button>
        {!pokemonOne ? '' : <img className="w-32 h-32" src={pokemonOne} alt="" />}
      </div>
    </>
  )
}

export default App
