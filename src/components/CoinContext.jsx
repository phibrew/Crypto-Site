import { createContext, useEffect, useState } from "react"
import axios from "axios";

export const CoinContext = createContext();

const CoinContextProvider = (props)=>{
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });
    const fetchAllCoin = ()=>{
        const options = {
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params: {vs_currency: currency.name},
            headers: {accept: 'application/json' }
          };
          
          axios
            .request(options)
            .then((response) => {
              setAllCoin(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
    }
    useEffect(()=>{
        fetchAllCoin();
    },[currency])
    const contextValue = {
        allCoin, 
        setCurrency, 
        currency
    }
    return (
    <CoinContext.Provider value={contextValue}>
        {props.children}
    </CoinContext.Provider>
    )
}
export default CoinContextProvider;