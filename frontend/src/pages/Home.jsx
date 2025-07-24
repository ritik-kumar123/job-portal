import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import PoppularVacancies from '../components/PoppularVacancies'
import HowWorks from '../components/HowWorks'
import Categories from '../components/Categories'
import Jobs from '../components/Jobs'
import Testimonial from '../components/Testimonial'
import { AppContext } from '../context/AppContext'

const Home = () => {
  const {setQuery} =useContext(AppContext)
  useEffect(() => {
    setQuery('')
  },[])
  return (
      <>
        <Hero/>
        <PoppularVacancies/>
        <HowWorks/>
        <Categories/>
        <Jobs/>
        <Testimonial/>
        </>
  )
}

export default Home