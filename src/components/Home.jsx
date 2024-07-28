import React, { useEffect, useState, useContext  } from 'react'
import { CiSearch } from 'react-icons/ci'
import { CoinContext } from './CoinContext'
import { Link } from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event)=>{
    setInput(event.target.value);
    if(event.target.value === ''){
      setDisplayCoin(allCoin);
    }
  };
  const searchHandler = async (event)=>{
    event.preventDefault();
    const coins = await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase());
    })
    setDisplayCoin(coins);
  }
  useEffect(()=>{
    setDisplayCoin(allCoin);
  }, [allCoin]);
  
  return (
    <div className='m-10 flex flex-col justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold'>Crypto Check</h1>
        <p className='text-center w-[40%] m-5 text-xl italic'>
          Welcome to the Crypto Check... Suit yourself with the best
          performing crypto and stay in touch with the marketplace.
          Sign up to explore more about cryptos.
        </p>
        <form onSubmit={searchHandler} className='mt-5 flex justify-center items-center bg-white rounded-full'>
          
          <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder="Search crypto..."
          className='px-4 rounded-full outline-none' required/>

          <datalist id='coinlist'>
            {allCoin.map((item, index) => (<option key={index} value={item.name} />))}
          </datalist>

          <button className='flex gap-1 justify-center items-center px-3 py-1 bg-zinc-300 m-1 rounded-full' 
          type='submit'>
          Search <CiSearch className='w-[20px] h-[20px]'/> </button>
        
        </form>
      </div>
      <div className='px-2 py-0.5 justify-center rounded-md mt-8 bg-gradient-to-b from-violet-500 to-fuchsia-500'>
        <div className='grid gap-4 text-center' style={{gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1.5fr'}}>
          <p>#</p>
          <p>Coins</p>
          <p className='text-left'>Price</p>
          <p>24H Change</p>
          <p>Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 10).map((coin, index) =>(
              <Link to={`/coin/${coin.id}`} key={index} className='grid gap-4 text-center py-2 items-center' style={{gridTemplateColumns: '0.5fr 2fr 1fr 1fr 1.5fr'}}>
                <p>{coin.market_cap_rank}</p>
                <div className='flex items-center gap-5'>
                  <img className='w-[40px] h-[40px]' src={coin.image} alt="" />
                  <p>
                    {coin.name + " - " + coin.symbol}
                  </p>
                </div>
                <p className='text-left'>{currency.symbol}{coin.current_price.toLocaleString()}</p>
                <p className={coin.price_change_percentage_24h>0 ? 'text-green-700': 'text-red-700'}>{Math.floor(coin.price_change_percentage_24h*100)/100}</p>
                <p className='text-right px-4'>{currency.symbol}{coin.market_cap.toLocaleString()}</p>
              </Link>
            )
          )
        }
      </div>
    </div>
  )
}

export default Home
