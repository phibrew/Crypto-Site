// Api key of coingekko: CG-QPxUEFZjgWiRsSxY9Dpvv4pT

import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Coin from './components/Coin'
import Home from './components/Home'

const App = () => {
  return (
    <div className='flex flex-col absolute w-full min-h-screen bg-gradient-to-b from-indigo-500 via-purple-600 to-pink-600'>
    <Navbar/>
    <div className='flex-grow'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coin/>}/>
      </Routes>
    </div>
    <footer className='text-center text-white border-t border-white py-2'>Copyright © 2024, CryptoCheck - All Right Reserved,</footer>
    </div>
  )
}

export default App
