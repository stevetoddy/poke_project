const WinnerModal = ({
  winner, 
  pokemonOne,
  pokemonTwo,
  nameOne,
  nameTwo,
  close
} : any ) => {
  return (
    <>
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
    </>
  )
}

export default WinnerModal