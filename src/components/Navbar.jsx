import React, { useContext } from 'react'
import arrow_icon from '../assets/arrow_icon.png'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { CoinContext } from './CoinContext'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext);
  const handleCurrency = (event)=>{
    switch (event.target.value) {
      case "usd":{
        setCurrency({name: "usd", symbol: "$"})
        break;
      }
      case "euro":{
        setCurrency({name: "euro", symbol: "€"})
        break;
      }
      case "inr":{
        setCurrency({name: "inr", symbol: "₹"})
        break;
      }
      default : {
        setCurrency({name: "usd", symbol: "$"})
        break;
      }
    }
  }

  return (
    <div className='relative flex justify-between px-20 items-center rounded-full    
    m-3
    bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-indigo-500 to-90% ...'>
      <Link to={'/'}>
        <img className='' src={logo} alt="" />
      </Link>
      <ul className='flex gap-6 cursor-pointer font-serif text-zinc-200'>
        <Link to={'/'}> <li>Home</li> </Link>  
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className='flex gap-2'>
        <select onChange={handleCurrency}
        className='rounded-md cursor-pointer bg-transparent'>
            <option value="usd">USD</option>
            <option value="euro">EURO</option>
            <option value="inr">INR</option>
        </select>
        <span className='flex justify-center items-center cursor-pointer gap-1 rounded-full px-4 py-1 bg-zinc-100'>
            <button className='border-none outline-none'>sign up</button>
            <img className='w-[13px] h-[13px]' src={arrow_icon} alt="" />
        </span>
      </div>
    </div>
  )
}

export default Navbar
