import React from 'react'
import HeroSection from '../components/homePageComponents/HeroSection'
import StatisticsPanel from '../components/homePageComponents/statistisPanel'
import BenefitsSection from '../components/homePageComponents/BenefitsSection'
import HowItWorks from '../components/homePageComponents/HowItWorks'
import Testimonial from '../components/homePageComponents/Testimonial'
import Navbar from '../components/homePageComponents/Navbar.js';
import Footer from '../components/homePageComponents/Footer.js'


const HomePage = () => {
  return (
    <div>
        
        <HeroSection/>
        {/* <StatisticsPanel/> */}
        <HowItWorks/>
        <BenefitsSection/>
        <Testimonial/>
        <Footer/>
        
    </div>
  )
}

export default HomePage;