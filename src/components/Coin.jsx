import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { CoinContext } from './CoinContext';
import LineChart from './LineChart';


const Coin = () => {
  const {currency} = useContext(CoinContext);
  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();

  const fetchCoinData = ()=>{
    const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
      headers: {accept: 'application/json'}
    };
    
    axios
      .request(options)
      .then(function (response) {
        setCoinData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const fetchHistoricalData = ()=>{
    const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      params: {vs_currency: `${currency.name}`, days: '30'},
      headers: {accept: 'application/json'}
    };
    
    axios
      .request(options)
      .then(function (response) {
        setHistoricalData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(()=>{ 
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);
  if(coinData && historicalData){
    return (
      <div className='px-2'> 
        <div className='flex gap-20 items-center justify-center'>
          <div>
            <img className='w-[200px] h-[200px]' src={coinData.image.large} alt="" />
            <p className='text-center py-2 text-xl italic text-zinc-200'> <b/>{coinData.name} ({coinData.symbol.toUpperCase()})</p>
          </div>
          <div className='w-[700px] h-[250px]'>
            <LineChart historicalData={historicalData}/>
          </div>
        </div>
        <div className='flex justify-center m-10'>
          <div className="grid grid-cols-2 text-zinc-200 text-center py-2 min-w-[30%]">
            <ul className='text-left'>
              <li>Crypto Market Rank</li>
              <li>Current Price</li>
              <li>Market Cap</li>
              <li>24 Hour High</li>
              <li>24 Hour Low</li>
            </ul>
            <ul className='text-right'>
              <li>{coinData.market_cap_rank}</li>
              <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
              <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
              <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
              <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  else{
    return (
      <div className='grid place-self-center min-h-[80vh]'>
        <div className='w-[65px] h-[65px] place-self-center rounded-full border border-t-sky-500  animate-spin'></div>
      </div>
    )
  }
}

export default Coin
