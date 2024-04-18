import pokeBall from '../../public/pokeball.svg'

const Pokemon = ({
  start, 
  handleClickOne, 
  pokemonOne,
  pokemonOneScore,
  nameOne,
  rerollsOne,
  handleClickTwo,
  pokemonTwo,
  pokemonTwoScore,
  nameTwo,
  rerollsTwo
} : any ) => {
  return (
    <>
      <div className="flex flex-col items-center h-full w-full mr-16">
        <div className="text-xl text-center font-black text-[#0075BE] capitalize">Score: {pokemonOneScore}</div>
          {!pokemonOne ? 
            <>
              <div className="flex flex-col items-center w-[260px h-[260px] mt-10">
                <img src={pokeBall} alt="pokeball" className='w-52 animate-spin' /> 
              </div>
            </> : 
            <div className='flex flex-col w-[260px h-[260px] mt-10'>
              <img className={`w-52 h-52 mt-5 ${start ? 'translate-x-full duration-700' : ''}`} src={pokemonOne} alt="" />
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
                <img src={pokeBall} alt="pokeball" className='w-52 animate-spin' /> 
              </div>
            </> : 
            <div className='flex flex-col w-[260px h-[260px] mt-10'>
              <img className={`w-52 h-52 mt-5 ${start ? '-translate-x-full duration-700' : ''}`} src={pokemonTwo} alt="" />
              <h1 className="text-3xl text-center font-black text-[#0075BE] capitalize">{nameTwo}</h1>
            </div>
            }
            <button 
              className='flex justify-center align-center w-96 bg-[#0075BE] text-2xl font-black text-[#FFCC00] p-5 rounded mt-10' 
              onClick={handleClickTwo}>
                Choose Your Pokemon
            </button>
        <div className="text-xl font-black text-[#0075BE] mt-5">Rerolls left: {3 - rerollsTwo}</div>  
      </div>
    </>
  )
}

export default Pokemon